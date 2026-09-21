"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { Mail, Phone, MapPin, Sparkles, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#E8DFD1] bg-[#1C1917] text-[#FAF7F2]">
      {/* TOP CRAFT PROMISE STRIP */}
      <div className="border-b border-white/10 py-8 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="rounded-xl bg-white/10 p-2.5 text-[#D4A373]">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Artisan Made</h4>
              <p className="text-xs text-white/70">Carefully handcrafted stitch by stitch</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="rounded-xl bg-white/10 p-2.5 text-[#D4A373]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Quality Guarantee</h4>
              <p className="text-xs text-white/70">Premium soft milk cotton yarn</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="rounded-xl bg-white/10 p-2.5 text-[#D4A373]">
              <Heart size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Custom Requests Open</h4>
              <p className="text-xs text-white/70">Bespoke sizing and colorways</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* BRAND BIO */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Velora</span>
              <span className="text-xs font-normal text-[#D4A373] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                Boutique
              </span>
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-white/70 max-w-sm">
              Velora is an independent crochet studio based in Bangladesh dedicated to creating timeless, handcrafted bags, plushies, and accessories with artistic passion and sustainable materials.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#D4A373] hover:text-[#1C1917]"
              >
                <FaFacebookF size={15} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#D4A373] hover:text-[#1C1917]"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="https://wa.me/8801234567890"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#25D366]"
              >
                <FaWhatsapp size={15} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#D4A373] hover:text-[#1C1917]"
              >
                <FaPinterestP size={15} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#D4A373] hover:text-[#1C1917]"
              >
                <FaTiktok size={15} />
              </a>
            </div>
          </div>

          {/* SHOP LINKS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Collections
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition">
                  Shop by Category
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bags" className="hover:text-white transition">
                  Handcrafted Bags
                </Link>
              </li>
              <li>
                <Link href="/shop?category=plushies" className="hover:text-white transition">
                  Cute Plushies
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-white transition text-[#D4A373] font-medium">
                  Custom Studio ✨
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Customer Care
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition">
                  Account Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Studio Details
            </h3>
            <div className="mt-4 space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
                <span>Kushtia & Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#D4A373] flex-shrink-0" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-[#D4A373] flex-shrink-0" />
                <span>hello@velorastudio.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-white/60">
          <p>© {new Date().getFullYear()} Velora Studio. All rights reserved.</p>

          <div className="flex items-center gap-3 text-white/70">
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-semibold">bKash</span>
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-semibold">Nagad</span>
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-semibold">Visa / MC</span>
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-semibold">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
