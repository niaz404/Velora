"use client";

import Link from "next/link";
import { Store, ShieldCheck, User } from "lucide-react";
import { DASHBOARD_URL } from "@/lib/constants";

export default function DashboardHeader({ user }) {
  return (
    <header className="h-16 border-b border-[#2C2723] bg-[#141210]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#E8DFD1]/60">
          Executive Operations Matrix
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 rounded-xl border border-[#3D3630] bg-[#1A1714] px-3.5 py-1.5 text-xs font-semibold text-[#E8DFD1] hover:bg-[#2A241F] transition"
        >
          <Store size={14} /> Storefront Preview
        </Link>

        <div className="flex items-center gap-2 pl-2 border-l border-[#2C2723]">
          <div className="h-8 w-8 rounded-full bg-[#2A241F] border border-[#3D3630] flex items-center justify-center text-xs font-bold text-[#D4A373]">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-white leading-none">{user?.name || "Operations User"}</p>
            <p className="text-[10px] text-[#D4A373] uppercase font-bold tracking-wider mt-0.5">{user?.role || "Staff"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
