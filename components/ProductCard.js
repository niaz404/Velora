"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";

export default function ProductCard({ product, avarageSell = 0 }) {
  const [added, setAdded] = useState(false);
  if (!product) return null;

  const isStock = product.type === "stock";
  const isBestSeller =
    avarageSell > 0 && (product.totalSold || 0) >= avarageSell;

  const stock = product.stock ?? 0;
  const isLowStock = isStock && stock <= 5;
  const imageSrc =
    product.images?.[0] || "https://picsum.photos/seed/velora-pouch/400/400";

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const existingCart = JSON.parse(
        localStorage.getItem("velora_cart") || "[]"
      );
      const existingIndex = existingCart.findIndex(
        (item) => item.id === product._id
      );

      if (existingIndex > -1) {
        existingCart[existingIndex].quantity += 1;
      } else {
        existingCart.push({
          id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          quantity: 1,
          color: product.colors?.[0] || null,
          image: imageSrc,
        });
      }

      localStorage.setItem("velora_cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cart-updated"));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className="group flex h-full flex-col rounded-3xl border border-[#E8DFD1] bg-white p-3.5 sm:p-4 transition duration-300 hover:shadow-md hover:border-[#D8C7B0]">
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-2xl bg-[#F5EFE4]">
        <div className="relative aspect-square w-full">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* BADGES */}
        <div className="absolute left-2.5 right-2.5 top-2.5 flex justify-between gap-2">
          {/* LEFT */}
          <div className="flex flex-col items-start gap-1">
            {product.isFeatured && (
              <span className="rounded-full bg-pink-600 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                Featured
              </span>
            )}

            {isBestSeller && (
              <span className="rounded-full bg-[#7A6A53] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                Popular
              </span>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end gap-1">
            {isStock && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold shadow-xs ${
                  isLowStock
                    ? "bg-red-500 text-white"
                    : "bg-white/95 text-[#2B2B2B] backdrop-blur-xs"
                }`}
              >
                {isLowStock ? `${stock} Left` : "In Stock"}
              </span>
            )}

            {product.type === "made-to-order" && (
              <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                Made to Order
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-3.5 flex flex-1 flex-col justify-between space-y-2.5">
        <div>
          {/* NAME */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="line-clamp-1 text-sm sm:text-base font-bold text-[#2B2B2B] hover:text-[#7A6A53] transition">
              {product.name}
            </h3>
          </Link>

          {/* DESCRIPTION */}
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6F6A63]">
            {product.description}
          </p>
        </div>

        {/* RATING + SOLD */}
        <div className="flex items-center justify-between text-xs text-[#6F6A63]">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#2B2B2B]">
              ⭐ {product.rating || "5.0"}
            </span>
            <span className="text-[11px]">({product.ratingCount || 0})</span>
          </div>

          <span className="text-[11px]">{product.totalSold || 0} sold</span>
        </div>

        {/* PRICE & ACTIONS */}
        <div className="pt-1">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-base sm:text-lg font-black text-[#7A6A53]">
              ৳{product.price}
            </span>

            {/* COLOR DOTS PREVIEW */}
            {product.colors?.length > 0 && (
              <div className="flex items-center -space-x-1">
                {product.colors.slice(0, 4).map((c, i) => (
                  <span
                    key={i}
                    className="inline-block h-3.5 w-3.5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: c }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="pl-1.5 text-[10px] text-[#6F6A63]">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleQuickAdd}
              type="button"
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-xs font-semibold transition ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-[#2B2B2B] text-white hover:bg-black"
              }`}
            >
              {added ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={14} /> Add to Cart
                </>
              )}
            </button>

            <Link
              href={`/products/${product.slug}`}
              className="flex items-center justify-center rounded-2xl border border-[#E8DFD1] bg-[#FCF7EE] px-3 py-2.5 text-xs font-semibold text-[#2B2B2B] hover:bg-[#E8DFD1] transition"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
