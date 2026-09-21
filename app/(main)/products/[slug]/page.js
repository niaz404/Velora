import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, PackageOpen } from "lucide-react";
import { getProductBySlug, getRelatedProducts, getProducts } from "@/queries/product";
import { avgSelling } from "@/lib/avgSelling";
import ProductCard from "@/components/ProductCard";
import ProductDetailsClient from "./_components/ProductDetailsClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Velora",
      description: "The requested crochet product could not be found.",
    };
  }

  return {
    title: `${product.name} | Velora Handmade`,
    description: product.description?.slice(0, 160) || "Handmade crochet product from Velora.",
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="rounded-full bg-[#F5EFE4] p-6 text-[#7A6A53]">
          <PackageOpen size={48} />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-[#2B2B2B]">Product Not Found</h1>
        <p className="mt-2 max-w-md text-sm text-[#6F6A63]">
          Sorry, we couldn&apos;t find the product you were looking for. It might have been removed or the link is incorrect.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#2B2B2B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
        >
          <ArrowLeft size={16} /> Back to Shop
        </Link>
      </div>
    );
  }

  const [relatedProducts, allProducts] = await Promise.all([
    getRelatedProducts(product.categoryId?._id, product.slug, 3),
    getProducts(),
  ]);

  const avarageSell = avgSelling(allProducts);

  return (
    <div className="min-h-screen bg-[#FCF7EE]/40 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        {/* BREADCRUMB */}
        <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-[#6F6A63]">
          <Link href="/" className="hover:text-[#2B2B2B]">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-[#2B2B2B]">Shop</Link>
          {product.categoryId?.name && (
            <>
              <ChevronRight size={14} />
              <Link
                href={`/shop?category=${product.categoryId.slug}`}
                className="hover:text-[#2B2B2B]"
              >
                {product.categoryId.name}
              </Link>
            </>
          )}
          <ChevronRight size={14} />
          <span className="truncate text-[#2B2B2B]">{product.name}</span>
        </nav>

        {/* MAIN PRODUCT SECTION */}
        <div className="rounded-3xl border border-[#E8DFD1] bg-white p-6 shadow-xs md:p-10">
          <ProductDetailsClient product={product} />
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#2B2B2B]">Related Creations</h2>
                <p className="mt-1 text-sm text-[#6F6A63]">
                  You might also love these matching handmade items
                </p>
              </div>

              <Link
                href="/shop"
                className="hidden text-sm font-semibold text-[#7A6A53] hover:underline sm:inline-block"
              >
                View all in shop →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} avarageSell={avarageSell} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
