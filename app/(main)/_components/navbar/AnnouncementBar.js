"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#2B2621] text-[#FAF7F2] py-2 px-4 text-xs font-medium relative overflow-hidden z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-[#D4A373]">
          <Sparkles size={13} />
          <span className="tracking-wide">100% Handcrafted Artisan Crochet</span>
        </div>

        <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0 text-center">
          <span className="text-white/90">
            Enjoy <strong className="text-[#E8DFD1]">FREE delivery</strong> on all orders over ৳1500!
          </span>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-1 text-[#D4A373] hover:text-white underline underline-offset-2 transition ml-1"
          >
            Shop Now <ArrowRight size={11} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-white/80">
          <Link href="/custom" className="hover:text-white transition">
            ✨ Custom Orders
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition">
            Help Center
          </Link>
        </div>
      </div>
    </div>
  );
}
