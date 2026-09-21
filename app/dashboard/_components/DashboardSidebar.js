"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FolderTree,
  Users,
  Store,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DashboardSidebar({ user }) {
  const pathname = usePathname();
  const role = user?.role || "customer";

  const allNavItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["super_admin", "admin", "seller", "support"],
    },
    {
      label: "Products Catalog",
      href: "/dashboard/products",
      icon: Package,
      roles: ["super_admin", "admin", "seller"],
    },
    {
      label: "Orders & Support",
      href: "/dashboard/orders",
      icon: ShoppingBag,
      roles: ["super_admin", "admin", "support"],
    },
    {
      label: "Categories",
      href: "/dashboard/categories",
      icon: FolderTree,
      roles: ["super_admin", "admin"],
    },
    {
      label: "Users & Roles",
      href: "/dashboard/users",
      icon: Users,
      roles: ["super_admin", "admin"],
    },
  ];

  const filteredNavItems = allNavItems.filter((item) =>
    item.roles.includes(role)
  );

  async function handleSignOut() {
    await authClient.signOut();
    window.location.href = "/";
  }

  const roleColors = {
    super_admin: "bg-purple-900/60 text-purple-200 border-purple-700",
    admin: "bg-blue-900/60 text-blue-200 border-blue-700",
    seller: "bg-amber-900/60 text-amber-200 border-amber-700",
    support: "bg-emerald-900/60 text-emerald-200 border-emerald-700",
    customer: "bg-gray-800 text-gray-300 border-gray-700",
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-[#141210] text-[#E8DFD1] border-r border-[#2C2723] flex flex-col justify-between min-h-screen">
      <div>
        {/* BRAND LOGO */}
        <div className="p-6 border-b border-[#2C2723] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white">Velora</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#7A6A53] text-white">
              Studio
            </span>
          </Link>
        </div>

        {/* USER PROFILE SUMMARY */}
        <div className="p-5 border-b border-[#2C2723] bg-[#1A1714]">
          <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">
            Logged In As
          </p>
          <p className="text-sm font-bold text-white truncate mt-0.5">
            {user?.name || "Staff Member"}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                roleColors[role] || roleColors.customer
              }`}
            >
              {role.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="p-4 space-y-1.5">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-white/40">
            Workspace Navigation
          </p>

          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#7A6A53] text-white shadow-sm"
                    : "text-[#CBB89D] hover:bg-[#201D1A] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-white/70" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-4 border-t border-[#2C2723] space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#CBB89D] hover:bg-[#201D1A] hover:text-white transition"
        >
          <Store size={16} />
          <span>View Public Store</span>
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-950/40 transition cursor-pointer"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
