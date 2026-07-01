"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";

export function AuthPanel({
  title = "Entre ou crie sua conta",
  description = "O cadastro permite liberar acesso por plano e acompanhar melhor a experiencia do usuario dentro do app.",
}: {
  title?: string;
  description?: string;
}) {
  const { authEnabled, loading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const result =
      mode === "signin"
        ? await signIn(email, password)
        : await signUp(email, password, fullName);

    setSubmitting(false);
    if (result.error) {
      setFeedback(result.error);
      return;
    }

    setFeedback(
      result.message ||
        (mode === "signin" ? "Login realizado com sucesso." : "Cadastro realizado."),
    );
  }

  if (!authEnabled) {
    return (
      <section className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-[#0a0a0a]">
          Supabase ainda nao configurado
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#64705f]">
          Para ativar cadastro e login, precisamos das variaveis publicas do
          Supabase no ambiente do projeto.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[30px] border border-black/6 bg-white p-6 shadow-[0_25px_80px_-55px_rgba(10,10,10,0.42)]">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "signin"
              ? "bg-[#0a0a0a] text-white"
              : "bg-[#eff4e8] text-[#4f584b]"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "signup"
              ? "bg-[#0a0a0a] text-white"
              : "bg-[#eff4e8] text-[#4f584b]"
          }`}
        >
          Criar conta
        </button>
      </div>

      <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#0a0a0a]">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64705f]">
        {description}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        {mode === "signup" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#0a0a0a]">
              Nome
            </span>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-[22px] border border-[#d8ddd3] bg-[#fbfcf8] px-4 py-3 text-sm font-medium text-[#0a0a0a] outline-none"
              placeholder="Seu nome"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#0a0a0a]">
            E-mail
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-[22px] border border-[#d8ddd3] bg-[#fbfcf8] px-4 py-3 text-sm font-medium text-[#0a0a0a] outline-none"
            placeholder="voce@exemplo.com"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#0a0a0a]">
            Senha
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-[22px] border border-[#d8ddd3] bg-[#fbfcf8] px-4 py-3 text-sm font-medium text-[#0a0a0a] outline-none"
            placeholder="Sua senha"
            required
          />
        </label>

        <button
          type="submit"
          disabled={submitting || loading}
          className="rounded-full bg-[#d9ff1f] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#c8ee16] disabled:opacity-60"
        >
          {submitting
            ? "Processando..."
            : mode === "signin"
              ? "Entrar na conta"
              : "Criar conta"}
        </button>
      </form>

      {feedback ? (
        <div className="mt-4 rounded-[22px] bg-[#eff4e8] px-4 py-3 text-sm text-[#4f584b]">
          {feedback}
        </div>
      ) : null}
    </section>
  );
}
