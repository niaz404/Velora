"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MobileFilters({ categories = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const currentCategory = searchParams.get("category");

  const handleChange = (slug) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!slug || slug === "all" || slug === currentCategory) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    router.push(`/shop?${params.toString()}`);
    setOpen(false);
  };

  const clearAllFilters = () => {
    router.push("/shop");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 rounded-2xl border border-[#E8DFD1] bg-white px-4 py-2 text-sm font-medium shadow-xs hover:bg-[#F5EFE4] transition">
          <Filter size={16} />
          Filters
          {currentCategory && (
            <span className="flex h-2 w-2 rounded-full bg-[#7A6A53]" />
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[85vw] max-w-sm bg-[#FFFDF8] p-0">
        <div className="flex items-center justify-between border-b border-[#E8DFD1] px-5 py-4">
          <SheetHeader>
            <SheetTitle className="text-base font-bold text-[#2B2B2B]">
              Filters
            </SheetTitle>
          </SheetHeader>
          {currentCategory && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-medium text-[#7A6A53] hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className="px-5 py-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F6A63]">
            Categories
          </h4>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#2B2B2B]">
            <input
              type="radio"
              name="mobile_category_filter"
              checked={!currentCategory || currentCategory === "all"}
              onChange={() => handleChange("all")}
              className="accent-[#7A6A53]"
            />
            <span className={!currentCategory ? "font-semibold text-[#7A6A53]" : ""}>
              All Categories
            </span>
          </label>

          {categories.map((cat) => {
            const isChecked = currentCategory === cat.slug;
            return (
              <label
                key={cat._id}
                className="flex cursor-pointer items-center gap-3 text-sm text-[#2B2B2B]"
              >
                <input
                  type="radio"
                  name="mobile_category_filter"
                  checked={isChecked}
                  onChange={() => handleChange(cat.slug)}
                  className="accent-[#7A6A53]"
                />
                <span className={isChecked ? "font-semibold text-[#7A6A53]" : ""}>
                  {cat.name}
                </span>
              </label>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
