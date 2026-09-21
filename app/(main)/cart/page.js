"use client";

import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const defaultSampleCart = [
  {
    id: "sample-1",
    name: "Lavender Handcrafted Keychain",
    slug: "lavender-keychain",
    price: 180,
    quantity: 2,
    color: "Lavender",
    image: "https://picsum.photos/seed/lavender/200/200",
  },
  {
    id: "sample-2",
    name: "Crochet Bunny Plush Mini",
    slug: "crochet-bunny-plush",
    price: 450,
    quantity: 1,
    color: "Cream",
    image: "https://picsum.photos/seed/bunny/200/200",
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
    // initialize on first client load
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

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 1500 || subtotal === 0 ? 0 : 70;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    updateCart([]);
  };

  if (checkoutSuccess) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FFFDF8] px-4 text-center">
        <div className="rounded-full bg-green-100 p-6 text-green-700">
          <CheckCircle size={48} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-[#2B2B2B]">
          Thank you for your order! 🎉
        </h1>
        <p className="mt-2 max-w-md text-sm text-[#6F6A63]">
          Your order has been received and will be handcrafted with care. You can track its status in your Orders tab.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/orders"
            className="rounded-2xl bg-[#2B2B2B] px-6 py-3 text-sm font-semibold text-white hover:bg-black transition"
          >
            View Orders
          </Link>
          <Link
            href="/shop"
            className="rounded-2xl border border-[#E8DFD1] bg-white px-6 py-3 text-sm font-semibold text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF7EE]/30 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#2B2B2B]">
              Shopping Bag
            </h1>
            <p className="mt-1 text-sm text-[#6F6A63]">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT - CART ITEMS */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.color || index}`}
                className="flex items-center gap-4 rounded-3xl border border-[#E8DFD1] bg-white p-4 shadow-xs sm:p-5"
              >
                {/* IMAGE */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-[#F0E6D8] bg-[#F5EFE4] sm:h-24 sm:w-24">
                  <Image
                    src={item.image || "https://picsum.photos/seed/velora-cart/200/200"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="flex flex-1 flex-col justify-between self-stretch">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-[#2B2B2B]">
                      {item.name}
                    </h2>
                    {item.color && (
                      <p className="text-xs text-[#7A6A53] font-medium mt-0.5">
                        Color: {item.color}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-black text-[#7A6A53]">
                      ৳{item.price}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-between pt-2">
                    {/* QTY COUNTER */}
                    <div className="flex items-center rounded-xl border border-[#E8DFD1] bg-[#FFFDF8] p-1">
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        className="rounded-lg p-1 text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
                        title="Decrease"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-8 text-center text-xs font-bold text-[#2B2B2B]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        className="rounded-lg p-1 text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
                        title="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* DELETE */}
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="rounded-xl p-2 text-red-500 hover:bg-red-50 transition cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* EMPTY STATE */}
            {cartItems.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#CBB89D] bg-white p-12 text-center shadow-xs">
                <div className="rounded-full bg-[#F5EFE4] p-5 text-[#7A6A53]">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#2B2B2B]">
                  Your cart is empty
                </h3>
                <p className="mt-1.5 max-w-sm text-sm text-[#6F6A63]">
                  Looks like you haven&apos;t added any handmade crochet pieces yet.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#2B2B2B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Explore Collection <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT - SUMMARY */}
          <div>
            <div className="sticky top-24 rounded-3xl border border-[#E8DFD1] bg-white p-6 shadow-xs">
              <h2 className="text-lg font-bold text-[#2B2B2B]">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-[#6F6A63]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2B2B2B]">৳{subtotal}</span>
                </div>

                <div className="flex justify-between text-[#6F6A63]">
                  <span>Shipping Estimate</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="font-semibold text-green-600">FREE</span>
                    ) : (
                      `৳${shipping}`
                    )}
                  </span>
                </div>

                {subtotal < 1500 && subtotal > 0 && (
                  <p className="text-[11px] text-[#7A6A53] bg-[#F5EFE4] p-2 rounded-xl">
                    Add ৳{1500 - subtotal} more to qualify for <strong>FREE shipping</strong>!
                  </p>
                )}

                <div className="border-t border-[#E8DFD1] pt-3 flex justify-between text-base font-bold text-[#2B2B2B]">
                  <span>Total Amount</span>
                  <span className="text-lg font-black text-[#7A6A53]">৳{total}</span>
                </div>
              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-[#2B2B2B] py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <Link
                href="/shop"
                className="mt-4 block text-center text-xs font-semibold text-[#7A6A53] hover:underline"
              >
                ← Continue Shopping
              </Link>

              {/* REASSURANCE */}
              <div className="mt-6 space-y-2 border-t border-[#E8DFD1] pt-4 text-xs text-[#6F6A63]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#7A6A53]" />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#7A6A53]" />
                  <span>Handmade with love & care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
