"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Map, MapPinned, Radar, Search, Store } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/mapa", label: "Mapa", icon: MapPinned },
  { href: "/explorar", label: "Explorar", icon: Map },
  { href: "/guias", label: "Guias", icon: Radar },
  { href: "/source", label: "Source", icon: Store },
  { href: "/buscar", label: "Buscar", icon: Search },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#09110c]/90 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur xl:hidden">
      <div className="mx-auto grid max-w-md grid-cols-6 gap-2 rounded-3xl border border-white/10 bg-white/5 p-2 shadow-[0_20px_80px_-30px_rgba(39,215,108,0.4)]">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition ${
                active
                  ? "bg-[#d9ff1f] text-[#0a0a0a]"
                  : "text-white/68 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
