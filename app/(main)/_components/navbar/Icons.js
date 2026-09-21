"use client";

import { authClient } from "@/lib/auth-client";
import { Bell, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function subscribeCart(callback) {
  window.addEventListener("cart-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("cart-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function getCartSnapshot() {
  return localStorage.getItem("velora_cart") || "[]";
}

function getCartServerSnapshot() {
  return "[]";
}

export default function Icons() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const cartRaw = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot
  );

  let cartCount = 0;
  try {
    const items = JSON.parse(cartRaw);
    cartCount = items.reduce((sum, i) => sum + (i.quantity || 1), 0);
  } catch {
    cartCount = 0;
  }

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const session = await authClient.getSession();
        if (isMounted) {
          setUser(session?.data?.user || null);
        }
      } catch (err) {
        console.error("Auth session load error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogout() {
    try {
      await authClient.signOut();
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return (
    <div className="hidden md:flex items-center gap-2">
      {/* CART */}
      <Link
        href="/cart"
        className="p-2.5 rounded-full hover:bg-[#F5EFE4] relative transition"
        title="Shopping Cart"
      >
        <ShoppingCart size={20} className="text-[#2B2B2B]" />

        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-[#7A6A53] text-white min-w-4 h-4 px-1 flex items-center justify-center rounded-full shadow-xs">
            {cartCount}
          </span>
        )}
      </Link>

      {/* NOTIFICATIONS */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="p-2.5 rounded-full hover:bg-[#F5EFE4] relative transition cursor-pointer"
            title="Notifications"
          >
            <Bell size={20} className="text-[#2B2B2B]" />
            <span className="absolute top-1.5 right-1.5 text-[10px] bg-amber-500 w-2 h-2 rounded-full ring-2 ring-white" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-80 p-0 rounded-2xl overflow-hidden bg-white shadow-lg border border-[#E8DFD1]"
        >
          {/* HEADER */}
          <div className="px-4 py-3 border-b border-[#E8DFD1] bg-[#FFFDF8]">
            <h3 className="font-bold text-sm text-[#2B2B2B]">Notifications</h3>
            <p className="text-xs text-[#6F6A63]">Latest updates from Velora</p>
          </div>

          {/* LIST */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#F5EFE4]">
            <DropdownMenuItem className="cursor-pointer p-3.5 flex flex-col items-start gap-1 hover:bg-[#FFFDF8]">
              <span className="font-semibold text-xs text-[#2B2B2B]">
                New Crochet Arrivals ✨
              </span>
              <span className="text-[11px] text-[#6F6A63]">
                Check out the new handcrafted collection in shop.
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer p-3.5 flex flex-col items-start gap-1 hover:bg-[#FFFDF8]">
              <span className="font-semibold text-xs text-[#2B2B2B]">
                Welcome to Velora 🧶
              </span>
              <span className="text-[11px] text-[#6F6A63]">
                Discover personalized handcrafted fashion and plushies.
              </span>
            </DropdownMenuItem>
          </div>

          {/* FOOTER */}
          <div className="p-2.5 border-t border-[#E8DFD1] bg-[#FFFDF8]">
            <Link
              href="/shop"
              className="block text-center rounded-xl bg-[#2B2B2B] py-2 text-xs font-semibold text-white hover:bg-black transition"
            >
              Explore Shop
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* PROFILE / AUTH */}
      {loading ? (
        <div className="w-9 h-9 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-[#E8DFD1] border-t-[#7A6A53] rounded-full animate-spin" />
        </div>
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none group cursor-pointer">
            <div className="relative">
              <Avatar className="w-9 h-9 ring-2 ring-[#E8DFD1] group-hover:ring-[#7A6A53] transition">
                <AvatarImage
                  src={
                    user.image ||
                    `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(user.name || "user")}`
                  }
                />
                <AvatarFallback className="bg-[#F5EFE4] text-xs font-bold text-[#7A6A53]">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 p-1.5 rounded-2xl shadow-lg border border-[#E8DFD1] bg-white"
          >
            <div className="px-3 py-2 border-b border-[#F5EFE4] mb-1">
              <p className="text-sm font-bold leading-none text-[#2B2B2B]">{user.name}</p>
              <p className="text-xs text-[#6F6A63] truncate mt-1">{user.email}</p>
            </div>

            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer rounded-xl px-3 py-2 text-xs font-medium hover:bg-[#F5EFE4]"
            >
              👤 My Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/orders")}
              className="cursor-pointer rounded-xl px-3 py-2 text-xs font-medium hover:bg-[#F5EFE4]"
            >
              📦 My Orders
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/cart")}
              className="cursor-pointer rounded-xl px-3 py-2 text-xs font-medium hover:bg-[#F5EFE4]"
            >
              🛒 My Cart
            </DropdownMenuItem>

            {user.role && user.role !== "customer" && (
              <DropdownMenuItem
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer rounded-xl px-3 py-2 text-xs font-bold text-[#7A6A53] hover:bg-[#F5EFE4]"
              >
                🎛️ Operations Studio ({user.role.replace("_", " ")})
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator className="bg-[#E8DFD1]" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
            >
              🚪 Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2 text-xs font-semibold ml-2">
          <Link
            href="/signin"
            className="px-3.5 py-1.5 rounded-xl border border-[#E8DFD1] bg-white text-[#2B2B2B] hover:bg-[#F5EFE4] transition"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="px-3.5 py-1.5 rounded-xl bg-[#2B2B2B] text-white hover:bg-black transition shadow-xs"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
