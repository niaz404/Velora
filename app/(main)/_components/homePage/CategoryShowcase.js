import Link from "next/link";
import { getCategories } from "@/queries/categories";
import { ArrowRight, Sparkles } from "lucide-react";

export default async function CategoryShowcase() {
  const categories = await getCategories(4);

  const categoryPresets = [
    {
      name: "Handcrafted Bags",
      slug: "bags",
      desc: "Chic tote bags, pouches, and crossbody shoulder creations.",
      icon: "👜",
      color: "from-[#F5EFE4] to-[#E8DFD1]",
    },
    {
      name: "Charming Keychains",
      slug: "keychains",
      desc: "Delightful flower, animal, and miniature charm attachments.",
      icon: "🌸",
      color: "from-[#FFF5EB] to-[#FCEADE]",
    },
    {
      name: "Plushies & Companions",
      slug: "plushies",
      desc: "Lovingly stuffed crochet animals made with hypoallergenic cotton.",
      icon: "🧸",
      color: "from-[#F0F7F4] to-[#DEEFE8]",
    },
    {
      name: "Wearables & Accents",
      slug: "wearables",
      desc: "Cozy bandanas, hair scrunchies, collars, and custom fashion.",
      icon: "✨",
      color: "from-[#FDF2F4] to-[#F9E2E6]",
    },
  ];

  const displayList = categories.length >= 2 ? categories : categoryPresets;

  return (
    <section className="px-4 py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5EFE4] px-3.5 py-1 text-xs font-semibold text-[#7A6A53]">
              <Sparkles size={13} /> Categories
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#2B2B2B] sm:text-4xl">
              Shop by Craft
            </h2>
            <p className="mt-1 text-sm text-[#6F6A63]">
              Explore our diverse collections crafted with devotion and attention to detail.
            </p>
          </div>

          <Link
            href="/categories"
            className="group flex items-center gap-1.5 text-sm font-bold text-[#7A6A53] hover:text-[#2B2B2B] transition"
          >
            <span>View all categories</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayList.map((cat, idx) => {
            const preset = categoryPresets[idx % categoryPresets.length];
            const icon = cat.icon || preset.icon;
            const desc = cat.description || preset.desc;
            const slug = cat.slug || preset.slug;

            return (
              <Link
                key={cat._id || cat.slug || idx}
                href={`/shop?category=${slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E8DFD1] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#7A6A53] hover:shadow-lg"
              >
                <div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5EFE4] text-3xl transition duration-300 group-hover:scale-110 shadow-xs">
                    {icon}
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[#2B2B2B] group-hover:text-[#7A6A53] transition">
                    {cat.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#6F6A63]">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#F5EFE4] pt-4 text-xs font-bold text-[#7A6A53]">
                  <span>Discover Pieces</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
