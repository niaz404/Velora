import Link from "next/link";
import { getCategories } from "@/queries/categories";
import { ArrowRight, Package } from "lucide-react";

export const metadata = {
  title: "Categories | Velora Handcrafted Collections",
  description: "Browse crochet products by category: bags, keychains, plushies, and accessories.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#FCF7EE]/30 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#F5EFE4] px-4 py-1.5 text-xs font-semibold text-[#7A6A53]">
            Curated Categories
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-[#2B2B2B] sm:text-4xl">
            Explore by Category
          </h1>
          <p className="mt-2 text-sm text-[#6F6A63]">
            Discover handcrafted collections tailored to your lifestyle
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-[#E8DFD1] bg-white p-8 transition hover:border-[#7A6A53] hover:shadow-md"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFE4] text-2xl group-hover:scale-110 transition">
                    🧶
                  </div>
                  <h2 className="mt-6 text-xl font-bold text-[#2B2B2B] group-hover:text-[#7A6A53] transition">
                    {cat.name}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-[#6F6A63]">
                    {cat.description || "Discover handcrafted pieces created with premium quality yarn and love."}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-bold text-[#7A6A53]">
                  <span>Explore category</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#CBB89D] bg-white p-12 text-center">
            <Package size={40} className="text-[#7A6A53]" />
            <h3 className="mt-4 text-lg font-bold text-[#2B2B2B]">
              Categories will appear here
            </h3>
            <p className="mt-1 text-xs text-[#6F6A63]">
              Check out all available products in our shop.
            </p>
            <Link
              href="/shop"
              className="mt-6 rounded-2xl bg-[#2B2B2B] px-6 py-2.5 text-xs font-semibold text-white hover:bg-black transition"
            >
              Go to Shop
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
