"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Share2,
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
} from "lucide-react";

export default function ProductDetailsClient({ product }) {
  const router = useRouter();
  const images = product.images?.length > 0
    ? product.images
    : ["https://picsum.photos/seed/velora-crochet/600/600"];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.length > 0 ? product.colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const isStock = product.type === "stock";
  const stock = product.stock ?? 0;
  const isLowStock = isStock && stock <= 5;

  const handleAddToCart = () => {
    // Add to cart local storage state
    try {
      const existingCart = JSON.parse(localStorage.getItem("velora_cart") || "[]");
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
      // Dispatch storage event so header badges update
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
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      {/* LEFT: IMAGE GALLERY */}
      <div className="space-y-4">
        {/* MAIN IMAGE */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#E8DFD1] bg-[#F5EFE4] shadow-sm">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* BADGES */}
          <div className="absolute left-4 top-4 flex flex-col gap-1.5">
            {product.isFeatured && (
              <span className="rounded-full bg-pink-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
                Featured
              </span>
            )}
            {isStock && (
              <span className="rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
                In Stock
              </span>
            )}
            {product.type === "made-to-order" && (
              <span className="rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
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
                onClick={() => setSelectedImage(img)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                  selectedImage === img
                    ? "border-[#7A6A53] ring-2 ring-[#7A6A53]/20"
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
      <div className="flex flex-col space-y-6">
        {/* CATEGORY & TITLE */}
        <div>
          {product.categoryId?.name && (
            <Link
              href={`/shop?category=${product.categoryId.slug}`}
              className="text-xs font-semibold uppercase tracking-wider text-[#7A6A53] hover:underline"
            >
              {product.categoryId.name}
            </Link>
          )}

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#2B2B2B] sm:text-4xl">
            {product.name}
          </h1>

          {/* RATING & SALES */}
          <div className="mt-3 flex items-center gap-4 text-sm text-[#6F6A63]">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-[#2B2B2B]">
                {product.rating || "5.0"}
              </span>
              <span className="text-[#6F6A63]">({product.ratingCount || 12} reviews)</span>
            </div>

            <span>•</span>
            <span>{product.totalSold || 0} items sold</span>

            {isLowStock && (
              <>
                <span>•</span>
                <span className="font-medium text-red-600">
                  Only {stock} left in stock!
                </span>
              </>
            )}
          </div>
        </div>

        {/* PRICE */}
        <div className="flex items-baseline gap-3 border-y border-[#E8DFD1] py-4">
          <span className="text-3xl font-black text-[#7A6A53]">
            ৳{product.price}
          </span>
          <span className="text-xs text-[#6F6A63]">VAT included • Free delivery above ৳1500</span>
        </div>

        {/* DESCRIPTION SUMMARY */}
        <p className="text-sm leading-relaxed text-[#554F47]">
          {product.description}
        </p>

        {/* COLOR SELECTION */}
        {product.colors?.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#2B2B2B]">
                Color: <span className="font-normal text-[#6F6A63] capitalize">{selectedColor}</span>
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected
                        ? "border-[#7A6A53] scale-110 shadow-sm"
                        : "border-black/10 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {isSelected && (
                      <Check
                        size={14}
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
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-2xl border border-[#E8DFD1] bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-10 text-center font-semibold text-[#2B2B2B]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition shadow-md ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-[#2B2B2B] text-white hover:bg-black"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check size={18} /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add to Cart
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-[#7A6A53] bg-[#FCF7EE] py-3 text-sm font-semibold text-[#7A6A53] transition hover:bg-[#7A6A53] hover:text-white shadow-sm"
          >
            Buy Now <ArrowRight size={16} />
          </button>
        </div>

        {/* VALUE PROPS */}
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#E8DFD1] bg-[#FFFDF8] p-4 text-xs text-[#6F6A63]">
          <div className="flex items-center gap-2.5">
            <Sparkles size={18} className="text-[#7A6A53]" />
            <span>100% Handcrafted with premium yarn</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck size={18} className="text-[#7A6A53]" />
            <span>Fast delivery nationwide</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-[#7A6A53]" />
            <span>Safe & secure payments</span>
          </div>
          <div className="flex items-center gap-2.5">
            <RefreshCw size={18} className="text-[#7A6A53]" />
            <span>Easy 7-day exchange</span>
          </div>
        </div>

        {/* TABS FOR DETAILS */}
        <div className="pt-4">
          <div className="flex border-b border-[#E8DFD1]">
            <button
              onClick={() => setActiveTab("description")}
              className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === "description"
                  ? "border-[#7A6A53] text-[#2B2B2B]"
                  : "border-transparent text-[#6F6A63] hover:text-[#2B2B2B]"
              }`}
            >
              Description & Care
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === "shipping"
                  ? "border-[#7A6A53] text-[#2B2B2B]"
                  : "border-transparent text-[#6F6A63] hover:text-[#2B2B2B]"
              }`}
            >
              Shipping & Delivery
            </button>
          </div>

          <div className="py-4 text-sm text-[#6F6A63]">
            {activeTab === "description" ? (
              <div className="space-y-2 leading-relaxed">
                <p>{product.description}</p>
                <p className="pt-2 font-medium text-[#2B2B2B]">Care Instructions:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Gentle hand wash in cold water using mild liquid detergent.</li>
                  <li>Do not wring or tumble dry; lay flat on a clean towel to dry.</li>
                  <li>Store in a clean, dry place away from direct sunlight.</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-2 leading-relaxed">
                <p>
                  <strong>Delivery inside Dhaka / Major cities:</strong> 2 - 3 business days.
                </p>
                <p>
                  <strong>Delivery outside Dhaka:</strong> 3 - 5 business days via reliable courier.
                </p>
                <p>
                  <strong>Custom Orders:</strong> Handcrafted from scratch; please allow 5-7 days production time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
