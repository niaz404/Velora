"use client";

import Image from "next/image";
import Link from "next/link";
import { Store, Bell, Sparkles } from "lucide-react";

export default function DashboardHeader({ user }) {
  const avatarUrl =
    user?.image ||
    `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(user?.name || "admin")}`;

  return (
    <header className="h-16 bg-[#1A1714] border-b border-[#2C2723] px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373] bg-[#2C2723] px-3 py-1 rounded-full">
          {user?.role?.replace("_", " ")} Workspace
        </span>
        <span className="text-xs text-white/50 hidden sm:inline-block">
          • Real-time Operations & Catalog
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 rounded-xl border border-[#3D3630] bg-[#201D1A] px-3.5 py-1.5 text-xs font-semibold text-[#E8DFD1] hover:bg-[#2C2723] hover:text-white transition"
        >
          <Store size={14} />
          <span>Live Store</span>
        </Link>

        <div className="flex items-center gap-3 pl-2 border-l border-[#2C2723]">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#3D3630] bg-[#201D1A]">
            <Image
              src={avatarUrl}
              alt={user?.name || "User"}
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-white leading-none">{user?.name}</p>
            <p className="text-[10px] text-white/50 capitalize mt-0.5">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
