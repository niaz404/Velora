"use client";

import { useState } from "react";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import {
  FaFacebookF,
  FaFacebookMessenger,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqs = [
    {
      q: "How long do handcrafted and custom orders take?",
      a: "Ready-in-stock items ship within 24-48 hours. Custom bespoke orders generally take 4-7 business days to craft with care before dispatch.",
    },
    {
      q: "How should I wash and care for my crochet pieces?",
      a: "We recommend gentle hand-washing in cool water with mild liquid detergent. Lay flat on a clean dry towel away from direct harsh sunlight.",
    },
    {
      q: "What payment methods are supported?",
      a: "We accept Cash on Delivery (COD) nationwide, along with bKash, Nagad, and major debit/credit cards.",
    },
    {
      q: "Can I request custom colors not listed in the shop?",
      a: "Yes, absolutely! Use our Custom Studio or message us directly on WhatsApp with your favorite shades.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* HERO */}
        <div className="mb-14 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5EFE4] px-4 py-1.5 text-xs font-bold text-[#7A6A53]">
            <Sparkles size={13} /> Get In Touch
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C1917] tracking-tight">
            We&apos;d Love To Hear From You
          </h1>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-[#6F6A63] leading-relaxed">
            Have a question about a product, custom colorway, delivery time, or wholesale inquiries?
            Reach out through your favorite channel or send us a message below.
          </p>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* LEFT SIDEBAR: DIRECT CHANNELS & INFO */}
          <aside className="lg:col-span-5 space-y-6">
            {/* DIRECT CONNECT CARDS */}
            <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 sm:p-7 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-[#1C1917]">
                Instant Channels
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/8801234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#E8DFD1] bg-[#FAF7F2] p-3.5 transition hover:bg-[#25D366] hover:text-white hover:border-[#25D366] group"
                >
                  <FaWhatsapp size={20} className="text-[#25D366] group-hover:text-white transition" />
                  <span className="text-xs font-bold">WhatsApp</span>
                </a>

                <a
                  href="https://m.me/yourpage"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#E8DFD1] bg-[#FAF7F2] p-3.5 transition hover:bg-[#0084FF] hover:text-white hover:border-[#0084FF] group"
                >
                  <FaFacebookMessenger size={20} className="text-[#0084FF] group-hover:text-white transition" />
                  <span className="text-xs font-bold">Messenger</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#E8DFD1] bg-[#FAF7F2] p-3.5 transition hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] group"
                >
                  <FaInstagram size={20} className="text-[#E4405F] group-hover:text-white transition" />
                  <span className="text-xs font-bold">Instagram</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#E8DFD1] bg-[#FAF7F2] p-3.5 transition hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] group"
                >
                  <FaFacebookF size={18} className="text-[#1877F2] group-hover:text-white transition" />
                  <span className="text-xs font-bold">Facebook</span>
                </a>
              </div>
            </div>

            {/* STUDIO INFO */}
            <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 sm:p-7 shadow-xs space-y-5">
              <h2 className="text-lg font-bold text-[#1C1917]">
                Studio Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#6F6A63]">
                <div className="flex gap-3.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5EFE4] text-[#7A6A53]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1C1917]">Email Support</p>
                    <p className="text-xs text-[#6F6A63]">hello@velorastudio.com</p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5EFE4] text-[#7A6A53]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1C1917]">Hotline</p>
                    <p className="text-xs text-[#6F6A63]">+880 1234-567890</p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5EFE4] text-[#7A6A53]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1C1917]">Studio Workshop</p>
                    <p className="text-xs text-[#6F6A63]">Kushtia & Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5EFE4] text-[#7A6A53]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1C1917]">Support Hours</p>
                    <p className="text-xs text-[#6F6A63]">Sat - Thu: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CUSTOM ORDERS CALLOUT */}
            <div className="rounded-3xl border border-[#E8DFD1] bg-[#221D18] p-6 sm:p-7 text-[#FAF7F2] space-y-3">
              <span className="text-2xl">✨</span>
              <h3 className="text-lg font-bold">Have a Custom Idea?</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                We make personalized colors, sizes, and embroidered charms tailored to your exact inspiration.
              </p>
              <Link
                href="/custom"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#FAF7F2] px-5 py-2.5 text-xs font-bold text-[#1C1917] hover:bg-white transition"
              >
                Open Custom Studio →
              </Link>
            </div>
          </aside>

          {/* RIGHT: MESSAGE FORM & FAQ */}
          <div className="lg:col-span-7 space-y-8">
            {/* MESSAGE FORM */}
            <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 sm:p-9 shadow-xs">
              <h2 className="text-2xl font-bold text-[#1C1917]">
                Send us a Message
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#6F6A63]">
                Fill out the form below and our customer care team will respond within 24 hours.
              </p>

              {sent ? (
                <div className="mt-8 rounded-2xl bg-[#FAF7F2] p-8 text-center border border-[#E8DFD1] space-y-3">
                  <CheckCircle2 size={36} className="text-green-600 mx-auto" />
                  <h3 className="text-lg font-bold text-[#1C1917]">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-[#6F6A63]">
                    Thank you for reaching out. We will get back to your email shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-xs font-semibold text-[#7A6A53] underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block mb-1 text-xs font-semibold text-[#1C1917]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] px-4 py-3 text-sm outline-none focus:border-[#7A6A53] transition"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-xs font-semibold text-[#1C1917]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] px-4 py-3 text-sm outline-none focus:border-[#7A6A53] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-semibold text-[#1C1917]">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Question about Daisy Bag stock"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] px-4 py-3 text-sm outline-none focus:border-[#7A6A53] transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-semibold text-[#1C1917]">
                      Your Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your message or inquiry here..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full resize-none rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] p-4 text-sm outline-none focus:border-[#7A6A53] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#1C1917] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-black shadow-md cursor-pointer"
                  >
                    <Send size={15} /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center gap-2 text-lg font-bold text-[#1C1917]">
                <HelpCircle size={20} className="text-[#7A6A53]" />
                <h3>Frequently Asked Questions</h3>
              </div>

              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#E8DFD1] bg-[#FAF7F2] p-4 space-y-1.5"
                  >
                    <h4 className="text-xs sm:text-sm font-bold text-[#1C1917]">
                      {f.q}
                    </h4>
                    <p className="text-xs text-[#6F6A63] leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
