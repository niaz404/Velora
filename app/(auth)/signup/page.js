"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowLeft, Lock, Mail, User, Phone } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignUp(e) {
    if (e) e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in your name, email, and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error.message || "Failed to create account. Please check your details.");
        setLoading(false);
        return;
      }

      const user = res?.data?.user;

      if (user) {
        try {
          await fetch("/api/profile/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
              name: user.name || name,
              email: user.email || email,
              phone: phone || "",
            }),
          });
        } catch (syncErr) {
          console.error("User profile sync error:", syncErr);
        }

        router.push("/");
        router.refresh();
      } else {
        router.push("/signin");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong during sign up.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FCF7EE] px-4 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6F6A63] hover:text-[#2B2B2B] transition"
        >
          <ArrowLeft size={14} /> Back to Velora
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-[#E8DFD1] bg-white p-8 shadow-sm sm:p-10">
        {/* TITLE */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#F5EFE4] px-3 py-1 text-xs font-semibold text-[#7A6A53]">
            New to Velora?
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#2B2B2B]">
            Create Account
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#6F6A63]">
            Join our crochet lovers community ✨
          </p>
        </div>

        {/* ERROR NOTIFICATION */}
        {error && (
          <div className="mt-5 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 leading-relaxed">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-[#2B2B2B]">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-[#E8DFD1] bg-[#FFFDF8] px-4 py-3 pl-10 text-sm outline-none transition focus:border-[#7A6A53] focus:ring-2 focus:ring-[#7A6A53]/20"
              />
              <User size={16} className="absolute left-3.5 top-3.5 text-[#A39B8F]" />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-[#2B2B2B]">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#E8DFD1] bg-[#FFFDF8] px-4 py-3 pl-10 text-sm outline-none transition focus:border-[#7A6A53] focus:ring-2 focus:ring-[#7A6A53]/20"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-[#A39B8F]" />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-[#2B2B2B]">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+880 1XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl border border-[#E8DFD1] bg-[#FFFDF8] px-4 py-3 pl-10 text-sm outline-none transition focus:border-[#7A6A53] focus:ring-2 focus:ring-[#7A6A53]/20"
              />
              <Phone size={16} className="absolute left-3.5 top-3.5 text-[#A39B8F]" />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-[#2B2B2B]">
              Password
            </label>
            <div className="relative">
              <input
                placeholder="At least 6 characters"
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-[#E8DFD1] bg-[#FFFDF8] px-4 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-[#7A6A53] focus:ring-2 focus:ring-[#7A6A53]/20"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-[#A39B8F]" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-[#A39B8F] hover:text-[#2B2B2B]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#2B2B2B] py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-70 cursor-pointer shadow-md mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-8 text-center text-xs text-[#6F6A63]">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-bold text-[#7A6A53] underline underline-offset-2 hover:text-black transition"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
