"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase/client";
import { normalizeSubscriptionRole, type UserProfile } from "@/lib/auth";
import { type SubscriptionRole } from "@/config/subscription.config";

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  authEnabled: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error?: string; message?: string }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string,
  ) => Promise<{ error?: string; message?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  effectiveRole: SubscriptionRole;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchProfile(user: User) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    email: data.email,
    full_name: data.full_name,
    role: normalizeSubscriptionRole(data.role),
  } satisfies UserProfile;
}

async function ensureProfile(user: User) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const existing = await fetchProfile(user);
  if (existing) return existing;

  const payload = {
    id: user.id,
    email: user.email || "",
    full_name:
      typeof user.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : null,
    role: "FREE" as const,
  };

  const { error } = await supabase.from("profiles").insert(payload);
  if (error) return null;

  return {
    ...payload,
    role: normalizeSubscriptionRole(payload.role),
  } satisfies UserProfile;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseClient();
  const authEnabled = Boolean(supabase);

  const refreshProfile = useCallback(async () => {
    if (!supabase) {
      setProfile(null);
      return;
    }

    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser) {
      setUser(null);
      setProfile(null);
      return;
    }

    setUser(currentUser);
    const currentProfile = await ensureProfile(currentUser);
    setProfile(currentProfile);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getUser().then(async ({ data }) => {
      if (!active) return;

      setUser(data.user);
      if (data.user) {
        const currentProfile = await ensureProfile(data.user);
        if (active) setProfile(currentProfile);
      }

      if (active) setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);

      if (session?.user) {
        const currentProfile = await ensureProfile(session.user);
        if (active) setProfile(currentProfile);
      } else {
        setProfile(null);
      }

      if (active) setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        return { error: "Supabase nao configurado para login." };
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      await refreshProfile();
      return {};
    },
    [refreshProfile, supabase],
  );

  const signUp = useCallback(
    async (email: string, password: string, fullName?: string) => {
      if (!supabase) {
        return { error: "Supabase nao configurado para cadastro." };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || null,
          },
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/perfil`
              : undefined,
        },
      });

      if (error) return { error: error.message };

      if (data.user) {
        await ensureProfile(data.user);
      }

      return {
        message:
          "Cadastro realizado. Se o Supabase exigir confirmacao de email, confirme sua conta antes de entrar.",
      };
    },
    [supabase],
  );

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, [supabase]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      authEnabled,
      signIn,
      signUp,
      signOut,
      refreshProfile,
      effectiveRole: profile?.role || "FREE",
    }),
    [authEnabled, loading, profile, refreshProfile, signIn, signOut, signUp, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa estar dentro de AuthProvider");
  }
  return context;
}
