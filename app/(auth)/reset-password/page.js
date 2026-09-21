"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  ShieldCheck
} from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Better Auth provides token in URL search param `token` or `error`
  const token = searchParams.get("token") || "";
  const tokenError = searchParams.get("error") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(tokenError ? decodeURIComponent(tokenError) : "");

  useEffect(() => {
    if (!token && !tokenError) {
      setError("Reset token is missing or expired. Please request a new password reset link.");
    }
  }, [token, tokenError]);

  async function handleReset(e) {
    if (e) e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (!token) {
      setError("Invalid or expired reset token. Please request a new link.");
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (res?.error) {
        setError(res.error.message || "Failed to reset password. The link may have expired.");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError(err?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-[#E8DFD1] bg-white p-8 shadow-sm sm:p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mb-4">
          <CheckCircle2 size={32} />
        </div>

        <span className="inline-block rounded-full bg-[#F5EFE4] px-3 py-1 text-xs font-semibold text-[#7A6A53]">
          Security Updated
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-[#2B2B2B]">
          Password Reset Complete
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#6F6A63] leading-relaxed">
          Your Velora account password has been successfully updated. You can now sign in with your new credentials.
        </p>

        <div className="mt-8">
          <Link
            href="/signin"
            className="block w-full rounded-2xl bg-[#2B2B2B] py-3.5 text-sm font-semibold text-white hover:bg-black transition text-center shadow-md"
          >
            Sign In with New Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#E8DFD1] bg-white p-8 shadow-sm sm:p-10">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5EFE4] text-[#7A6A53] mb-4">
          <ShieldCheck size={26} />
        </div>
        <span className="inline-block rounded-full bg-[#F5EFE4] px-3 py-1 text-xs font-semibold text-[#7A6A53]">
          Create New Password
        </span>
        <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#2B2B2B]">
          Set New Password
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-[#6F6A63]">
          Choose a strong password with at least 6 characters.
        </p>
      </div>

      {error && (
        <div className="mt-5 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 leading-relaxed flex items-start gap-2">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleReset} className="mt-6 space-y-4">
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-[#2B2B2B]">
            New Password
          </label>
          <div className="relative">
            <input
              placeholder="Minimum 6 characters"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              minLength={6}
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

        <div>
          <label className="block mb-1.5 text-xs font-semibold text-[#2B2B2B]">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              placeholder="Re-enter new password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              required
              minLength={6}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#E8DFD1] bg-[#FFFDF8] px-4 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-[#7A6A53] focus:ring-2 focus:ring-[#7A6A53]/20"
            />
            <Lock size={16} className="absolute left-3.5 top-3.5 text-[#A39B8F]" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#2B2B2B] py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50 cursor-pointer shadow-md mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Updating Password...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-[#6F6A63]">
        <Link
          href="/signin"
          className="font-bold text-[#7A6A53] underline underline-offset-2 hover:text-black transition"
        >
          Return to Sign In
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
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

      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4A373] border-t-transparent" />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
