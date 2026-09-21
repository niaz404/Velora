"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Palette,
  CheckCircle2,
  Send,
  ShoppingBag,
  MessageCircle,
  HelpCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function CustomOrderPage() {
  const [itemType, setItemType] = useState("bag");
  const [selectedColor, setSelectedColor] = useState("Pastel Lavender & Cream");
  const [size, setSize] = useState("Medium (Everyday)");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const itemTypes = [
    {
      id: "bag",
      title: "Crochet Bag / Pouch",
      icon: "👜",
      desc: "Tote, daisy bag, drawstring pouch, or crossbody.",
    },
    {
      id: "keychain",
      title: "Charm Keychain",
      icon: "🌸",
      desc: "Flower bouquet, animal charm, fruit, or initial letter.",
    },
    {
      id: "plushie",
      title: "Cute Plushie Toy",
      icon: "🧸",
      desc: "Bunny, teddy bear, duck, or custom character.",
    },
    {
      id: "wearable",
      title: "Wearable & Accent",
      icon: "✨",
      desc: "Hair bandana, scrunchies, collar, or vest.",
    },
    {
      id: "other",
      title: "Special Custom Idea",
      icon: "🎨",
      desc: "Unique creation based on your own photo or reference.",
    },
  ];

  const colorPalettes = [
    "Pastel Lavender & Cream",
    "Matcha Green & Ivory",
    "Warm Caramel & Mocha",
    "Blush Pink & Rose",
    "Ocean Blue & Soft Sky",
    "Monochrome Black & White",
    "Custom Mixed Palette (specified in notes)",
  ];

  const sizes = [
    "Small / Mini",
    "Medium (Everyday)",
    "Large / Oversized",
    "Custom Dimensions",
  ];

  const whatsappMessage = encodeURIComponent(
    `Hello Velora! 🌸 I would like to request a custom crochet order:\n` +
      `• Item: ${itemTypes.find((i) => i.id === itemType)?.title || itemType}\n` +
      `• Color Palette: ${selectedColor}\n` +
      `• Size: ${size}\n` +
      `• Name: ${name || "Customer"}\n` +
      `• Details: ${notes || "None"}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="text-center space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5EFE4] px-4 py-1.5 text-xs font-bold text-[#7A6A53]">
            <Sparkles size={14} /> Bespoke Handcrafted Service
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C1917] tracking-tight">
            Custom Order Studio
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#6F6A63] leading-relaxed">
            Have a dream color palette, custom sizing, or unique gift idea?
            Let our master artisans craft a one-of-a-kind crochet piece tailored specifically for you.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-[#E8DFD1] bg-white p-10 text-center shadow-lg max-w-2xl mx-auto space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700 text-3xl">
              ✨
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Custom Order Request Received!
            </h2>

            <p className="text-sm text-[#6F6A63] leading-relaxed">
              Thank you, <strong>{name || "Customer"}</strong>! Our artisan team has received your custom order specifications and will reach out to you within 24 hours to confirm yarn availability and timeline.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a
                href={`https://wa.me/8801234567890?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#20bd5a] transition shadow-md"
              >
                <FaWhatsapp size={18} /> Chat on WhatsApp Now
              </a>

              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-[#E8DFD1] bg-[#FAF7F2] px-6 py-3.5 text-sm font-semibold text-[#1C1917] hover:bg-[#F5EFE4] transition"
              >
                Explore Shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* LEFT: INTERACTIVE BUILDER FORM */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
              {/* STEP 1: ITEM TYPE */}
              <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7A6A53] text-xs text-white">
                    1
                  </span>
                  <span>Choose Item Category</span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {itemTypes.map((item) => {
                    const isSelected = itemType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setItemType(item.id)}
                        className={`flex items-start gap-3 rounded-2xl p-4 text-left border-2 transition ${
                          isSelected
                            ? "border-[#7A6A53] bg-[#FAF7F2] shadow-xs"
                            : "border-[#E8DFD1] bg-white hover:border-[#D4A373]/60"
                        }`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h4 className="text-sm font-bold text-[#1C1917]">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#6F6A63] mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: COLOR PALETTE */}
              <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7A6A53] text-xs text-white">
                    2
                  </span>
                  <span>Select Color Palette</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {colorPalettes.map((c) => {
                    const isSelected = selectedColor === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs sm:text-sm font-medium border transition ${
                          isSelected
                            ? "border-[#7A6A53] bg-[#F5EFE4] text-[#7A6A53] font-bold"
                            : "border-[#E8DFD1] text-[#4A453E] hover:bg-[#FAF7F2]"
                        }`}
                      >
                        <span>{c}</span>
                        {isSelected && <CheckCircle2 size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: SIZE & DETAILS */}
              <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7A6A53] text-xs text-white">
                    3
                  </span>
                  <span>Size & Custom Specifications</span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`rounded-xl py-2.5 px-3 text-xs font-semibold border transition text-center ${
                        size === s
                          ? "border-[#7A6A53] bg-[#2B2B2B] text-white"
                          : "border-[#E8DFD1] bg-white text-[#4A453E] hover:bg-[#FAF7F2]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block mb-2 text-xs font-semibold text-[#1C1917]">
                    Describe your vision (strap length, charms, photo links, etc.)
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g., I'd love a pastel purple daisy bag with a 45cm strap and an embroidered 'M' charm..."
                    className="w-full rounded-2xl border border-[#E8DFD1] bg-[#FAF7F2] p-4 text-xs sm:text-sm outline-none focus:border-[#7A6A53] transition"
                  />
                </div>
              </div>

              {/* STEP 4: CONTACT & SUBMIT */}
              <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1C1917]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7A6A53] text-xs text-white">
                    4
                  </span>
                  <span>Your Contact Information</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-xs font-semibold text-[#1C1917]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] px-4 py-3 text-sm outline-none focus:border-[#7A6A53]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-semibold text-[#1C1917]">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1XXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] px-4 py-3 text-sm outline-none focus:border-[#7A6A53]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#1C1917] py-4 text-sm font-bold text-white hover:bg-black transition shadow-md cursor-pointer"
                  >
                    <Send size={16} /> Submit Custom Order
                  </button>

                  <a
                    href={`https://wa.me/8801234567890?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white hover:bg-[#20bd5a] transition shadow-md"
                  >
                    <FaWhatsapp size={18} /> Quick WhatsApp Order
                  </a>
                </div>
              </div>
            </form>

            {/* RIGHT: LIVE PREVIEW & FAQ SIDEBAR */}
            <div className="lg:col-span-4 space-y-6">
              {/* LIVE SUMMARY CARD */}
              <div className="sticky top-24 rounded-3xl border border-[#E8DFD1] bg-white p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-4">
                  <h3 className="font-bold text-[#1C1917]">Order Preview</h3>
                  <span className="text-xs text-[#7A6A53] font-semibold bg-[#F5EFE4] px-2.5 py-1 rounded-full">
                    Bespoke
                  </span>
                </div>

                <div className="space-y-3 text-xs text-[#6F6A63]">
                  <div>
                    <span className="font-semibold text-[#1C1917]">Category:</span>
                    <p className="mt-0.5 text-sm text-[#4A453E] font-medium">
                      {itemTypes.find((i) => i.id === itemType)?.title}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-[#1C1917]">Color:</span>
                    <p className="mt-0.5 text-sm text-[#4A453E] font-medium">
                      {selectedColor}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-[#1C1917]">Sizing:</span>
                    <p className="mt-0.5 text-sm text-[#4A453E] font-medium">
                      {size}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FAF7F2] p-4 text-xs text-[#6F6A63] space-y-2 border border-[#E8DFD1]">
                  <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                    <Clock size={15} className="text-[#7A6A53]" />
                    <span>Production Timeline</span>
                  </div>
                  <p>Handmade creations usually take 4 - 7 business days to craft with perfection.</p>
                </div>

                <div className="rounded-2xl bg-[#FAF7F2] p-4 text-xs text-[#6F6A63] space-y-2 border border-[#E8DFD1]">
                  <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                    <ShieldCheck size={15} className="text-[#7A6A53]" />
                    <span>Approval Guarantee</span>
                  </div>
                  <p>We send you high-resolution photos of your finished piece before shipping!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
