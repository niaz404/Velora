import { getAuthUser } from "@/lib/admin-auth";
import Link from "next/link";
import { ShieldAlert, LogIn, ArrowLeft, Lock } from "lucide-react";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardHeader from "./_components/DashboardHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Management Studio & Operations | Velora",
  description: "Secure role-based dashboard for Velora store management.",
};

export default async function DashboardLayout({ children }) {
  const user = await getAuthUser();

  // 1. Not Authenticated
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#141210] px-4 text-center text-[#E8DFD1]">
        <div className="rounded-full bg-[#2A241F] p-6 text-[#D4A373] shadow-md">
          <Lock size={44} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-white">
          Authentication Required
        </h1>
        <p className="mt-2 max-w-md text-xs sm:text-sm text-white/60">
          You must be logged in to access the Velora management studio.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/signin"
            className="rounded-2xl bg-[#7A6A53] px-7 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#655743] transition shadow-md"
          >
            Sign In to Velora
          </Link>
          <Link
            href="/"
            className="rounded-2xl border border-[#3D3630] bg-[#1A1714] px-6 py-3 text-xs sm:text-sm font-semibold text-white/80 hover:bg-[#2A241F] transition"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  // 2. Customer Role (Unauthorized for management operations)
  if (user.role === "customer") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#141210] px-4 text-center text-[#E8DFD1]">
        <div className="rounded-full bg-amber-950/60 p-6 text-amber-400 border border-amber-800 shadow-md">
          <ShieldAlert size={44} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-white">
          Staff Access Only
        </h1>
        <p className="mt-2 max-w-md text-xs sm:text-sm text-white/60 leading-relaxed">
          Your account is currently registered as a <strong className="text-amber-400">Customer</strong>. The management dashboard is restricted to staff roles (Seller, Support, Admin, and Super Admin).
        </p>

        <div className="mt-4 rounded-2xl bg-[#1A1714] border border-[#2C2723] p-4 text-xs text-left max-w-sm w-full space-y-1">
          <p className="text-white/40">Logged in as: <span className="text-white font-semibold">{user.email}</span></p>
          <p className="text-white/40">Assigned Role: <span className="text-amber-400 font-bold uppercase">customer</span></p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-2xl bg-[#7A6A53] px-7 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#655743] transition shadow-md"
          >
            <ArrowLeft size={16} /> Return to Store
          </Link>
          <Link
            href="/profile"
            className="rounded-2xl border border-[#3D3630] bg-[#1A1714] px-6 py-3 text-xs sm:text-sm font-semibold text-white/80 hover:bg-[#2A241F] transition"
          >
            My Profile
          </Link>
        </div>
      </div>
    );
  }

  // 3. Authorized Staff Workspace (seller, support, admin, super_admin)
  return (
    <div className="flex min-h-screen bg-[#110F0D] text-[#E8DFD1]">
      <DashboardSidebar user={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#110F0D]">
          {children}
        </main>
      </div>
    </div>
  );
}
