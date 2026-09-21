"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Mail, Loader2, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleForgot(e) {
    if (e) e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);

    try {
      // Better Auth forget password endpoint
      const redirectTo = `${window.location.origin}/reset-password`;
      const res = await authClient.forgetPassword({
        email,
        redirectTo,
      });

      if (res?.error) {
        setError(res.error.message || "Unable to send password reset link. Please verify your email.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FCF7EE] px-4 py-12">
      <div className="mb-6">
        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6F6A63] hover:text-[#2B2B2B] transition"
        >
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-[#E8DFD1] bg-white p-8 shadow-sm sm:p-10">
        {submitted ? (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mb-4">
              <CheckCircle2 size={32} />
            </div>

            <span className="inline-block rounded-full bg-[#F5EFE4] px-3 py-1 text-xs font-semibold text-[#7A6A53]">
              Instructions Dispatched
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-[#2B2B2B]">
              Check Your Inbox
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#6F6A63] leading-relaxed">
              If an account exists with <strong className="text-[#2B2B2B]">{email}</strong>, we have sent a secure password reset link to your email address.
            </p>

            <div className="mt-6 rounded-2xl bg-[#FFFDF8] border border-[#E8DFD1] p-4 text-xs text-[#6F6A63] text-left space-y-1.5">
              <p className="font-semibold text-[#2B2B2B]">Next Steps:</p>
              <p>1. Open the email from Velora Atelier.</p>
              <p>2. Click the secure reset link inside (valid for 1 hour).</p>
              <p>3. Choose your new strong password.</p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="w-full rounded-2xl border border-[#E8DFD1] bg-[#FFFDF8] py-3 text-xs font-semibold text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
              >
                Send Again / Change Email
              </button>
              <Link
                href="/signin"
                className="block w-full rounded-2xl bg-[#2B2B2B] py-3 text-xs font-semibold text-white hover:bg-black transition text-center"
              >
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5EFE4] text-[#7A6A53] mb-4">
                <KeyRound size={26} />
              </div>
              <span className="inline-block rounded-full bg-[#F5EFE4] px-3 py-1 text-xs font-semibold text-[#7A6A53]">
                Account Recovery
              </span>
              <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#2B2B2B]">
                Forgot Password?
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-[#6F6A63]">
                Enter your account email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="mt-5 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 leading-relaxed flex items-start gap-2">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleForgot} className="mt-6 space-y-4">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#2B2B2B] py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-70 cursor-pointer shadow-md mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-[#6F6A63]">
              Remember your password?{" "}
              <Link
                href="/signin"
                className="font-bold text-[#7A6A53] underline underline-offset-2 hover:text-black transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
