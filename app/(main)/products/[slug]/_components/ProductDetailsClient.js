"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Check,
  ArrowRight,
  RefreshCw,
  Heart,
  CheckCircle2,
} from "lucide-react";

export default function ProductDetailsClient({ product }) {
  const router = useRouter();
  const images =
    product.images?.length > 0
      ? product.images
      : ["https://picsum.photos/seed/velora-crochet/600/600"];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.length > 0 ? product.colors[0] : "Classic Natural"
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const isStock = product.type === "stock";
  const stock = product.stock ?? 0;
  const isLowStock = isStock && stock <= 5;

  const handleAddToCart = () => {
    try {
      const existingCart = JSON.parse(
        localStorage.getItem("velora_cart") || "[]"
      );
      const existingIndex = existingCart.findIndex(
        (item) => item.id === product._id && item.color === selectedColor
      );

      if (existingIndex > -1) {
        existingCart[existingIndex].quantity += quantity;
      } else {
        existingCart.push({
          id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          quantity: quantity,
          color: selectedColor,
          image: selectedImage || images[0],
        });
      }

      localStorage.setItem("velora_cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cart-updated"));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
      {/* LEFT: IMAGE GALLERY */}
      <div className="lg:col-span-6 space-y-4">
        {/* MAIN DISPLAY */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#E8DFD1] bg-[#F5EFE4] shadow-sm group">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* BADGES */}
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {product.isFeatured && (
              <span className="rounded-full bg-[#7A6A53] px-3.5 py-1 text-xs font-bold text-white shadow-sm">
                Featured Piece
              </span>
            )}
            {isStock && (
              <span className="rounded-full bg-[#1C1917] px-3.5 py-1 text-xs font-bold text-white shadow-sm">
                In Stock ({stock} available)
              </span>
            )}
            {product.type === "made-to-order" && (
              <span className="rounded-full bg-amber-600 px-3.5 py-1 text-xs font-bold text-white shadow-sm">
                Made to Order
              </span>
            )}
          </div>
        </div>

        {/* THUMBNAILS */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                  selectedImage === img
                    ? "border-[#7A6A53] ring-2 ring-[#7A6A53]/30 scale-105"
                    : "border-[#E8DFD1] opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: DETAILS & ACTIONS */}
      <div className="lg:col-span-6 flex flex-col space-y-6">
        <div>
          {product.categoryId?.name && (
            <Link
              href={`/shop?category=${product.categoryId.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#7A6A53] hover:underline"
            >
              <Sparkles size={12} /> {product.categoryId.name}
            </Link>
          )}

          <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
            {product.name}
          </h1>

          {/* RATING & SALES */}
          <div className="mt-3 flex items-center gap-4 text-xs sm:text-sm text-[#6F6A63]">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-[#1C1917]">
                {product.rating || "5.0"}
              </span>
              <span>({product.ratingCount || 18} reviews)</span>
            </div>

            <span>•</span>
            <span>{product.totalSold || 14} sold</span>

            {isLowStock && (
              <>
                <span>•</span>
                <span className="font-bold text-red-600">
                  Only {stock} remaining!
                </span>
              </>
            )}
          </div>
        </div>

        {/* PRICE */}
        <div className="flex items-baseline justify-between border-y border-[#E8DFD1] py-4">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#7A6A53]">
              ৳{product.price}
            </span>
            <span className="ml-2 text-xs text-[#6F6A63]">BDT (incl. taxes)</span>
          </div>

          <span className="rounded-full bg-[#F5EFE4] px-3 py-1 text-xs font-semibold text-[#7A6A53]">
            Free delivery above ৳1500
          </span>
        </div>

        {/* DESCRIPTION SUMMARY */}
        <p className="text-sm leading-relaxed text-[#4A453E]">
          {product.description}
        </p>

        {/* COLOR SELECTION */}
        {product.colors?.length > 0 && (
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              Select Shade: <span className="font-normal text-[#6F6A63] capitalize">{selectedColor}</span>
            </label>

            <div className="flex flex-wrap items-center gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-transform duration-200 ${
                      isSelected
                        ? "border-[#7A6A53] scale-110 shadow-md ring-2 ring-[#7A6A53]/30"
                        : "border-black/15 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {isSelected && (
                      <Check
                        size={15}
                        className={
                          color.toLowerCase() === "#ffffff" || color.toLowerCase() === "white"
                            ? "text-black"
                            : "text-white drop-shadow-md"
                        }
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUANTITY & ACTIONS */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3">
            {/* STEPPER */}
            <div className="flex items-center rounded-2xl border border-[#E8DFD1] bg-[#FAF7F2] p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-[#1C1917] hover:bg-[#E8DFD1] transition cursor-pointer"
              >
                <Minus size={15} />
              </button>
              <span className="min-w-10 text-center font-bold text-[#1C1917]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-[#1C1917] hover:bg-[#E8DFD1] transition cursor-pointer"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* ADD TO CART */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold transition shadow-md cursor-pointer ${
                addedToCart
                  ? "bg-green-700 text-white"
                  : "bg-[#1C1917] text-white hover:bg-black"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check size={18} /> Added to Bag!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add to Bag
                </>
              )}
            </button>
          </div>

          {/* BUY NOW */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-[#7A6A53] bg-[#FAF7F2] py-3.5 text-sm font-bold text-[#7A6A53] transition hover:bg-[#7A6A53] hover:text-white shadow-xs cursor-pointer"
          >
            Instant Checkout <ArrowRight size={16} />
          </button>
        </div>

        {/* CRAFT PILL PROPS */}
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#E8DFD1] bg-[#FAF7F2] p-4 text-xs text-[#6F6A63]">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#7A6A53]" />
            <span>100% Handcrafted Artisan Yarn</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-[#7A6A53]" />
            <span>Fast Nationwide Courier Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#7A6A53]" />
            <span>Cash on Delivery Available</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw size={16} className="text-[#7A6A53]" />
            <span>Easy 7-Day Exchange</span>
          </div>
        </div>

        {/* TABS */}
        <div className="pt-2">
          <div className="flex border-b border-[#E8DFD1] text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab("description")}
              className={`border-b-2 pb-3 px-4 font-bold transition cursor-pointer ${
                activeTab === "description"
                  ? "border-[#7A6A53] text-[#1C1917]"
                  : "border-transparent text-[#6F6A63] hover:text-[#1C1917]"
              }`}
            >
              Story & Details
            </button>
            <button
              onClick={() => setActiveTab("care")}
              className={`border-b-2 pb-3 px-4 font-bold transition cursor-pointer ${
                activeTab === "care"
                  ? "border-[#7A6A53] text-[#1C1917]"
                  : "border-transparent text-[#6F6A63] hover:text-[#1C1917]"
              }`}
            >
              Care & Washing
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`border-b-2 pb-3 px-4 font-bold transition cursor-pointer ${
                activeTab === "shipping"
                  ? "border-[#7A6A53] text-[#1C1917]"
                  : "border-transparent text-[#6F6A63] hover:text-[#1C1917]"
              }`}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="py-4 text-xs sm:text-sm text-[#6F6A63] leading-relaxed">
            {activeTab === "description" && (
              <div className="space-y-2">
                <p>{product.description}</p>
                <p className="font-semibold text-[#1C1917] pt-2">Specifications:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Yarn: Premium hypoallergenic 5-ply milk cotton.</li>
                  <li>Technique: Tight double crochet stitch with reinforced structure.</li>
                  <li>Packaging: Eco-friendly protective dust bag and gift box.</li>
                </ul>
              </div>
            )}
            {activeTab === "care" && (
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Hand wash gently with mild liquid soap in cold water.</li>
                <li>Avoid bleach or rough scrubbing to maintain yarn softness.</li>
                <li>Press out excess water gently; do not wring.</li>
                <li>Lay flat on a towel in shade to dry naturally.</li>
              </ul>
            )}
            {activeTab === "shipping" && (
              <div className="space-y-2">
                <p><strong>Dhaka City:</strong> 2 - 3 business days (৳70, or FREE over ৳1500).</p>
                <p><strong>Outside Dhaka:</strong> 3 - 5 business days via Steadfast / Pathao courier.</p>
                <p><strong>Custom Orders:</strong> Handcrafted from scratch; please allow 4-7 days crafting time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
