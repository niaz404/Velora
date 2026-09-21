"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowLeft, Lock, Mail, User, Phone } from "lucide-react";

function GoogleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleSignUp() {
    setError("");
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google sign up error:", err);
      setError(
        err?.message ||
          "Google Sign Up is not configured yet. Please check GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET."
      );
      setGoogleLoading(false);
    }
  }

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

        {/* SOCIAL SIGN UP */}
        <div className="mt-6">
          <button
            type="button"
            disabled={googleLoading || loading}
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-[#E8DFD1] bg-white py-3 px-4 text-sm font-semibold text-[#2B2B2B] hover:bg-[#F5EFE4] transition shadow-xs disabled:opacity-60 cursor-pointer"
          >
            {googleLoading ? (
              <Loader2 size={18} className="animate-spin text-[#7A6A53]" />
            ) : (
              <GoogleIcon className="w-5 h-5" />
            )}
            <span>Sign up with Google</span>
          </button>
        </div>

        {/* OR DIVIDER */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-[#E8DFD1]" />
          <span className="mx-3 flex-shrink text-xs uppercase font-bold text-[#A39B8F]">
            or register with email
          </span>
          <div className="flex-grow border-t border-[#E8DFD1]" />
        </div>

        {/* FORM */}
        <form onSubmit={handleSignUp} className="space-y-4">
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
            disabled={loading || googleLoading}
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
