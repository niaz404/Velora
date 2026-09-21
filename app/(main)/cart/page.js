"use client";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  Tag,
  Truck,
  Gift,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const defaultSampleCart = [
  {
    id: "sample-1",
    name: "Lavender Handcrafted Daisy Bag",
    slug: "lavender-daisy-bag",
    price: 850,
    quantity: 1,
    color: "Pastel Lavender",
    image: "https://picsum.photos/seed/lavender/300/300",
  },
  {
    id: "sample-2",
    name: "Crochet Bunny Plush Mini",
    slug: "crochet-bunny-plush",
    price: 450,
    quantity: 1,
    color: "Cream Ivory",
    image: "https://picsum.photos/seed/bunny/300/300",
  },
];

function subscribeCart(callback) {
  window.addEventListener("cart-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("cart-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function getCartSnapshot() {
  const stored = localStorage.getItem("velora_cart");
  if (stored === null) {
    localStorage.setItem("velora_cart", JSON.stringify(defaultSampleCart));
    return JSON.stringify(defaultSampleCart);
  }
  return stored;
}

function getCartServerSnapshot() {
  return JSON.stringify(defaultSampleCart);
}

export default function CartPage() {
  const cartRaw = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot
  );

  let cartItems = [];
  try {
    cartItems = JSON.parse(cartRaw);
  } catch {
    cartItems = [];
  }

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const updateCart = (newItems) => {
    try {
      localStorage.setItem("velora_cart", JSON.stringify(newItems));
      window.dispatchEvent(new Event("cart-updated"));
    } catch (e) {
      console.error("Failed to sync cart to localStorage", e);
    }
  };

  const handleQuantityChange = (index, delta) => {
    const updated = [...cartItems];
    const newQty = updated[index].quantity + delta;
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      updated[index].quantity = newQty;
      updateCart(updated);
    }
  };

  const handleRemoveItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const handleClearCart = () => {
    updateCart([]);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (couponCode.trim().toUpperCase() === "VELORA10") {
      setDiscountPercent(10);
      setCouponSuccess("10% VIP Discount Applied!");
    } else {
      setCouponError("Invalid promo code. Try 'VELORA10'");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const freeShippingThreshold = 1500;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shipping = isFreeShipping ? 0 : 70;
  const total = discountedSubtotal + shipping;

  const progressPercentage = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    updateCart([]);
  };

  if (checkoutSuccess) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center bg-[#FAF7F2] px-4 py-16 text-center">
        <div className="rounded-full bg-green-100 p-6 text-green-700 shadow-sm animate-subtle-float">
          <CheckCircle size={52} />
        </div>
        <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-[#1C1917]">
          Thank you for supporting handmade craft! 🌸
        </h1>
        <p className="mt-2.5 max-w-md text-sm text-[#6F6A63] leading-relaxed">
          Your order has been received and scheduled for artisan packaging.
          You can track your order history anytime in your profile.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/orders"
            className="rounded-2xl bg-[#1C1917] px-7 py-3.5 text-sm font-bold text-white hover:bg-black transition shadow-md"
          >
            Track My Order
          </Link>
          <Link
            href="/shop"
            className="rounded-2xl border border-[#E8DFD1] bg-white px-7 py-3.5 text-sm font-semibold text-[#1C1917] hover:bg-[#F5EFE4] transition shadow-xs"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-10 md:py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#E8DFD1] pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
              Your Shopping Bag
            </h1>
            <p className="mt-1 text-sm text-[#6F6A63]">
              {cartItems.length} handcrafted {cartItems.length === 1 ? "creation" : "creations"} in your bag
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
            >
              Remove all items
            </button>
          )}
        </div>

        {/* FREE SHIPPING PROGRESS METER */}
        {cartItems.length > 0 && (
          <div className="rounded-2xl border border-[#E8DFD1] bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#1C1917]">
              <span className="flex items-center gap-1.5">
                <Truck size={16} className="text-[#7A6A53]" />
                {isFreeShipping ? (
                  <strong className="text-green-700">
                    🎉 You unlocked FREE Nationwide Shipping!
                  </strong>
                ) : (
                  <span>
                    Add <strong className="text-[#7A6A53]">৳{freeShippingThreshold - subtotal}</strong> more to unlock <strong>FREE Shipping</strong>
                  </span>
                )}
              </span>
              <span>{progressPercentage}%</span>
            </div>

            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#F5EFE4]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFreeShipping ? "bg-green-600" : "bg-[#7A6A53]"
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* LEFT - CART ITEMS */}
          <div className="space-y-4 lg:col-span-8">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.color || index}`}
                className="flex items-center gap-4 sm:gap-6 rounded-3xl border border-[#E8DFD1] bg-white p-4 sm:p-6 shadow-xs transition duration-300 hover:border-[#D4A373]/60"
              >
                {/* IMAGE */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-[#F0E6D8] bg-[#F5EFE4] sm:h-28 sm:w-28 shadow-xs">
                  <Image
                    src={item.image || "https://picsum.photos/seed/velora-cart/300/300"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* INFO & CONTROLS */}
                <div className="flex flex-1 flex-col justify-between self-stretch">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-[#1C1917]">
                      {item.name}
                    </h2>
                    {item.color && (
                      <p className="text-xs text-[#7A6A53] font-semibold mt-0.5">
                        Color: {item.color}
                      </p>
                    )}
                    <p className="mt-1 text-base font-extrabold text-[#7A6A53]">
                      ৳{item.price}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    {/* QUANTITY STEPPER */}
                    <div className="flex items-center rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] p-1">
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        className="rounded-lg p-1 text-[#1C1917] hover:bg-[#E8DFD1] transition cursor-pointer"
                        title="Decrease"
                      >
                        <Minus size={13} />
                      </button>

                      <span className="min-w-8 text-center text-xs font-bold text-[#1C1917]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        className="rounded-lg p-1 text-[#1C1917] hover:bg-[#E8DFD1] transition cursor-pointer"
                        title="Increase"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* DELETE */}
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="rounded-xl p-2 text-red-500 hover:bg-red-50 transition cursor-pointer"
                      title="Remove from bag"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* EMPTY STATE */}
            {cartItems.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#CBB89D] bg-white p-14 text-center shadow-xs space-y-4">
                <div className="rounded-full bg-[#F5EFE4] p-5 text-[#7A6A53]">
                  <ShoppingBag size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1917]">
                  Your bag is currently empty
                </h3>
                <p className="max-w-sm text-xs sm:text-sm text-[#6F6A63]">
                  Explore our handcrafted collections to discover unique crochet bags, plushies, and accessories.
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[#1C1917] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-black shadow-md"
                >
                  Explore Collection <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-5 rounded-3xl border border-[#E8DFD1] bg-white p-6 sm:p-7 shadow-xs">
              <h2 className="text-lg font-bold text-[#1C1917]">
                Order Summary
              </h2>

              {/* PROMO CODE INPUT */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. VELORA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] py-2.5 pl-8 pr-3 text-xs outline-none focus:border-[#7A6A53] uppercase"
                    />
                    <Tag size={13} className="absolute left-2.5 top-3.5 text-[#A39B8F]" />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#2B2B2B] px-4 py-2.5 text-xs font-bold text-white hover:bg-black transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {couponSuccess && (
                  <p className="text-[11px] font-semibold text-green-700">
                    ✓ {couponSuccess}
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] font-semibold text-red-600">
                    ✗ {couponError}
                  </p>
                )}
              </form>

              {/* COST BREAKDOWN */}
              <div className="space-y-3 border-t border-[#E8DFD1] pt-4 text-xs sm:text-sm">
                <div className="flex justify-between text-[#6F6A63]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1C1917]">৳{subtotal}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>VIP Discount ({discountPercent}%)</span>
                    <span>-৳{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#6F6A63]">
                  <span>Shipping</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="font-bold text-green-700">FREE</span>
                    ) : (
                      `৳${shipping}`
                    )}
                  </span>
                </div>

                <div className="border-t border-[#E8DFD1] pt-3 flex justify-between text-base font-extrabold text-[#1C1917]">
                  <span>Total Amount</span>
                  <span className="text-xl font-black text-[#7A6A53]">৳{total}</span>
                </div>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1C1917] py-4 text-sm font-bold text-white transition hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <Link
                href="/shop"
                className="block text-center text-xs font-semibold text-[#7A6A53] hover:underline"
              >
                ← Continue Shopping
              </Link>

              {/* TRUST BADGES */}
              <div className="space-y-2.5 border-t border-[#E8DFD1] pt-5 text-xs text-[#6F6A63]">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-[#7A6A53]" />
                  <span>256-bit Encrypted Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} className="text-[#7A6A53]" />
                  <span>100% Handcrafted with Love in BD</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Gift size={16} className="text-[#7A6A53]" />
                  <span>Complimentary Gift Packaging included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
