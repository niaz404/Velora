import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCategories } from "@/queries/categories";
import { getProducts } from "@/queries/product";
import { avgSelling } from "@/lib/avgSelling";
import DesktopFilters from "./_components/DesktopFilters";
import MobileFilters from "./_components/MobileFilters";
import Selector from "./_components/Selector";

export const metadata = {
  title: "Shop All Handcrafted Crochet Products | Velora",
  description: "Browse our entire collection of handcrafted crochet bags, keychains, plushies, and custom accessories.",
};

export default async function ShopPage({ searchParams }) {
  const [categories, params] = await Promise.all([
    getCategories(),
    searchParams,
  ]);

  const category = params?.category || "";
  const sort = params?.sort || "low";
  const search = params?.search || "";

  const products = await getProducts({
    category,
    sort,
    search,
  });

  const avarageSell = avgSelling(products);

  const activeCategoryName =
    category && category !== "all"
      ? categories.find((c) => c.slug === category)?.name || category
      : "All Products";

  return (
    <main className="min-h-screen bg-[#FCF7EE]/30">
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#E8DFD1] pb-6 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-[#2B2B2B] sm:text-4xl">
              {activeCategoryName}
            </h1>
            <p className="mt-1 text-sm text-[#6F6A63]">
              Handcrafted crochet items made with care and passion
            </p>
          </div>

          <p className="text-sm font-medium text-[#6F6A63]">
            Showing <span className="font-bold text-[#2B2B2B]">{products.length}</span> items
          </p>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
          <MobileFilters categories={categories} />
          <Selector />
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* DESKTOP FILTERS */}
          <DesktopFilters categories={categories} />

          {/* PRODUCTS LIST */}
          <div>
            {/* DESKTOP SORT TOOLBAR */}
            <div className="mb-6 hidden items-center justify-between rounded-2xl border border-[#E8DFD1] bg-white px-5 py-3 shadow-xs lg:flex">
              <p className="text-xs text-[#6F6A63]">
                Sorted by your preferred view
              </p>
              <Selector />
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    avarageSell={avarageSell}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#CBB89D] bg-white p-12 text-center shadow-xs">
                <span className="text-4xl">🧶</span>
                <h3 className="mt-4 text-xl font-bold text-[#2B2B2B]">
                  No products found
                </h3>
                <p className="mt-2 max-w-sm text-sm text-[#6F6A63]">
                  We couldn&apos;t find any products matching your selected filter criteria.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 rounded-2xl bg-[#2B2B2B] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                >
                  View All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
