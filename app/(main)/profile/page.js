"use client";

import { authClient } from "@/lib/auth-client";
import {
  KeyRound,
  LogOut,
  Mail,
  Phone,
  Settings,
  Shield,
  User,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DASHBOARD_URL } from "@/lib/constants";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const session = await authClient.getSession();
        const user = session?.data?.user;

        if (!user) {
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/profile/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data || user);
        } else {
          setProfile(user);
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleLogout() {
    await authClient.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FFFDF8] px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E8DFD1] border-t-[#7A6A53]" />
        <p className="mt-4 text-xs font-medium text-[#6F6A63]">Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FFFDF8] px-4 text-center">
        <div className="rounded-full bg-[#F5EFE4] p-6 text-[#7A6A53]">
          <User size={40} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-[#2B2B2B]">
          You are not signed in
        </h1>
        <p className="mt-2 max-w-sm text-sm text-[#6F6A63]">
          Sign in or create an account to view your profile, manage your orders, and see saved preferences.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/signin"
            className="rounded-2xl bg-[#2B2B2B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-2xl border border-[#E8DFD1] bg-white px-6 py-3 text-sm font-semibold text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const avatarUrl =
    profile.image ||
    `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(profile.name || "user")}`;

  return (
    <div className="min-h-screen bg-[#FCF7EE]/30 px-4 py-8 md:py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {/* LEFT SIDEBAR */}
        <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 shadow-xs h-fit">
          {/* AVATAR */}
          <div className="flex flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#E8DFD1] shadow-xs bg-[#F5EFE4]">
              <Image
                src={avatarUrl}
                alt={profile.name || "Avatar"}
                fill
                className="object-cover"
              />
            </div>

            <h2 className="mt-4 text-lg font-bold text-[#2B2B2B]">
              {profile.name}
            </h2>

            <p className="text-xs text-[#6F6A63]">{profile.email}</p>

            <span className="mt-2 rounded-full bg-[#F5EFE4] px-3 py-0.5 text-[11px] font-semibold text-[#7A6A53] capitalize">
              {profile.role || "Customer"}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 space-y-1 border-t border-[#E8DFD1] pt-6">
            <Link
              href="/orders"
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag size={18} /> My Orders
              </span>
              <ArrowRight size={14} className="text-[#6F6A63]" />
            </Link>

            <Link
              href="/shop"
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
            >
              <span className="flex items-center gap-3">
                <Sparkles size={18} /> Browse Products
              </span>
              <ArrowRight size={14} className="text-[#6F6A63]" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="space-y-6 md:col-span-2">
          {/* HEADER CARD */}
          <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#2B2B2B]">
                Account Overview
              </h1>
              <p className="mt-1 text-sm text-[#6F6A63]">
                Personal information and membership details
              </p>
            </div>
            {profile.role && profile.role !== "customer" && (
              <Link
                href={DASHBOARD_URL}
                className="flex items-center gap-2 rounded-2xl bg-[#7A6A53] hover:bg-[#655743] px-5 py-2.5 text-xs font-bold text-white transition shadow-md self-start sm:self-auto"
              >
                <Shield size={14} /> Open {profile.role.replace("_", " ")} Studio
              </Link>
            )}
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E8DFD1] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6F6A63]">
                <User size={15} /> Name
              </div>
              <p className="mt-2 text-base font-semibold text-[#2B2B2B]">
                {profile.name}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8DFD1] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6F6A63]">
                <Mail size={15} /> Email
              </div>
              <p className="mt-2 text-base font-semibold text-[#2B2B2B] truncate">
                {profile.email}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8DFD1] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6F6A63]">
                <Phone size={15} /> Phone
              </div>
              <p className="mt-2 text-base font-semibold text-[#2B2B2B]">
                {profile.phone || "Not provided"}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8DFD1] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6F6A63]">
                <KeyRound size={15} /> Account Role
              </div>
              <p className="mt-2 text-base font-semibold capitalize text-[#7A6A53]">
                {profile.role || "customer"}
              </p>
            </div>
          </div>

          {/* UID BLOCK */}
          <div className="rounded-3xl border border-dashed border-[#CBB89D] bg-white p-5 text-xs text-[#6F6A63]">
            User ID: <span className="font-mono text-[#2B2B2B]">{profile._id || profile.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
