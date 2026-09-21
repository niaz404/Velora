"use client";

import { useState } from "react";
import { Sparkles, Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="px-4 py-16 bg-[#221D18] text-[#FAF7F2] relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#D4A373]/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#7A6A53]/20 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl relative text-center space-y-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md text-[#E8DFD1]">
          <Sparkles size={13} className="text-[#D4A373]" /> The Velora VIP Club
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Join the Handcrafted Circle & Get 10% Off
        </h2>

        <p className="mx-auto max-w-lg text-sm sm:text-base text-white/80 leading-relaxed">
          Be the first to explore limited edition drops, custom colorway releases,
          and subscriber-only discounts.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/15 border border-white/30 px-6 py-4 text-sm font-semibold backdrop-blur-md">
            <CheckCircle2 size={20} className="text-green-400" />
            <span>Welcome to the circle! Use code <strong className="text-[#D4A373] underline">VELORA10</strong> at checkout for 10% off.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 pl-10 text-sm text-white placeholder-white/50 outline-none backdrop-blur-md focus:border-[#D4A373] focus:ring-2 focus:ring-[#D4A373]/30 transition"
              />
              <Mail size={16} className="absolute left-3.5 top-4 text-white/50" />
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-[#FAF7F2] px-6 py-3.5 text-sm font-bold text-[#1C1917] transition hover:bg-white hover:scale-105 shadow-md cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
