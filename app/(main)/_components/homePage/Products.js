import ProductCard from "@/components/ProductCard";
import { avgSelling } from "@/lib/avgSelling";
import {
  getMostSoldProduct,
  getProducts,
  getProductsByDate,
} from "@/queries/product";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const Products = async () => {
  const [products, productsPopular, productsNew] = await Promise.all([
    getProducts(),
    getMostSoldProduct(3),
    getProductsByDate("new", 3),
  ]);

  const avarageSell = avgSelling(products);

  // Fallback demo items if database is freshly initialized and empty
  const hasDbProducts = productsPopular.length > 0 || productsNew.length > 0;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* HEADING */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5EFE4] px-3.5 py-1 text-xs font-semibold text-[#7A6A53]">
            <Sparkles size={13} /> Handcrafted Collection
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#2B2B2B] md:text-4xl">
            You’ll love these…
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#6F6A63] md:text-base">
            Carefully designed crochet essentials made to combine timeless aesthetics
            with everyday practicality.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productsPopular.map((product) => (
            <ProductCard
              key={`pop-${product._id}`}
              product={product}
              avarageSell={avarageSell}
            />
          ))}

          {productsNew.map((product) => (
            <ProductCard
              key={`new-${product._id}`}
              product={product}
              avarageSell={avarageSell}
            />
          ))}

          {/* CUSTOM PRODUCT CARD */}
          <Link
            href="/custom"
            className="group flex min-h-[360px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#CBB89D] bg-[#FFFDF8] p-8 text-center transition hover:border-[#7A6A53] hover:shadow-md"
          >
            <div className="rounded-full bg-[#F5EFE4] p-5 text-3xl transition group-hover:scale-110">
              ✨
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#2B2B2B]">
              Build Your Own
            </h3>

            <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#6F6A63]">
              Customize your perfect crochet product with unique colors, sizing,
              and personalized details.
            </p>

            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#7A6A53] px-6 py-2.5 text-xs font-semibold text-white transition group-hover:bg-[#665744]">
              Custom Order <ArrowRight size={14} />
            </span>
          </Link>

          {/* ALL PRODUCTS CARD */}
          <Link
            href="/shop"
            className="group flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-[#E8DFD1] bg-white p-8 text-center transition hover:border-[#7A6A53] hover:shadow-md"
          >
            <div className="rounded-full bg-[#F5EFE4] p-5 text-3xl transition group-hover:scale-110">
              🧶
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#2B2B2B]">
              Explore Full Shop
            </h3>

            <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#6F6A63]">
              Discover our complete range of keychains, plush toys, wearables, and pouches.
            </p>

            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#2B2B2B] px-6 py-2.5 text-xs font-semibold text-white transition group-hover:bg-black">
              View All Products <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
