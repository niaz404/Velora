"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Star } from "lucide-react";

const HomeBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A1612] text-[#FAF7F2]">
      {/* Visual Balanced Background Banner */}
      <div className="absolute inset-0">
        <Image
          src="/pouchBanner.jpg"
          alt="Handcrafted crochet pouch and accessories"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center opacity-85 transition-transform duration-700 hover:scale-102"
        />
        {/* Soft balanced gradient overlay: keeps text legible on the left while showcasing the image clearly on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1612]/95 via-[#1A1612]/70 to-[#1A1612]/25 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/80 via-transparent to-black/20" />
      </div>

      {/* Subtle Warm Ambient Glow */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#D4A373]/20 blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* LEFT: TEXT & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-1.5 text-xs font-semibold backdrop-blur-md text-[#E8DFD1] shadow-sm">
              <Sparkles size={14} className="text-[#D4A373]" />
              <span>Boutique Handcrafted Studio</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15] drop-shadow-md">
              Every Stitch Tells <br />
              <span className="bg-gradient-to-r from-[#FAF7F2] via-[#E8DFD1] to-[#D4A373] bg-clip-text text-transparent">
                A Beautiful Story.
              </span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-white/90 drop-shadow-sm font-normal">
              Discover exquisitely handcrafted crochet bags, charming plushies,
              and bespoke wearables crafted with premium milk cotton yarn and meticulous care.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shop"
                className="group flex items-center gap-2 rounded-2xl bg-[#FAF7F2] px-7 py-3.5 text-sm sm:text-base font-bold text-[#1C1917] transition hover:bg-white hover:scale-105 shadow-xl"
              >
                <span>Explore Collection</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/custom"
                className="flex items-center gap-2 rounded-2xl border border-white/40 bg-black/30 px-7 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/60 shadow-md"
              >
                <span>Build Custom Order ✨</span>
              </Link>
            </div>

            {/* SOCIAL PROOF */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400" />
                ))}
                <span className="ml-2 font-bold text-sm text-white">4.9/5</span>
              </div>
              <span className="text-white/40">|</span>
              <p className="text-xs sm:text-sm text-white/90 font-medium">
                Loved by <strong>500+</strong> crochet enthusiasts across Bangladesh
              </p>
            </div>
          </div>

          {/* RIGHT: FLOATING ARTISAN HIGHLIGHT CARD */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative rounded-3xl border border-white/30 bg-black/40 p-6 backdrop-blur-xl shadow-2xl space-y-5 animate-subtle-float">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#D4A373]/40 px-3.5 py-1 text-xs font-bold text-[#FAF7F2] border border-[#D4A373]/60 shadow-xs">
                  ✨ Artisan Standard
                </span>
                <span className="text-xs font-mono text-white/80">Velora Studio</span>
              </div>

              <div className="space-y-3 text-sm text-white/95">
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3.5 border border-white/15 backdrop-blur-md">
                  <div className="rounded-xl bg-[#D4A373]/30 p-2 text-[#D4A373] text-lg">
                    🧶
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Premium Milk Cotton Yarn</h4>
                    <p className="text-xs text-white/80 mt-0.5">Ultra-soft, colorfast, and hypoallergenic materials.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3.5 border border-white/15 backdrop-blur-md">
                  <div className="rounded-xl bg-[#D4A373]/30 p-2 text-[#D4A373] text-lg">
                    🎨
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Custom Color Palettes</h4>
                    <p className="text-xs text-white/80 mt-0.5">Tailor any piece to your personal aesthetic.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3.5 border border-white/15 backdrop-blur-md">
                  <div className="rounded-xl bg-[#D4A373]/30 p-2 text-[#D4A373]">
                    <ShieldCheck size={20} className="text-[#D4A373]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Carefully Packaged</h4>
                    <p className="text-xs text-white/80 mt-0.5">Delivered safely with gift-ready wrapping.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/shop"
                  className="text-xs font-bold text-[#D4A373] hover:text-white underline underline-offset-4 transition"
                >
                  View current available stock →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
