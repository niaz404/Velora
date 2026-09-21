"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

export default function DesktopFilters({ categories = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");

  const handleChange = (slug) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!slug || slug === "all" || slug === currentCategory) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    router.push(`/shop?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/shop");
  };

  return (
    <aside className="hidden lg:block sticky top-24 h-fit rounded-3xl border border-[#E8DFD1] bg-white p-6 shadow-xs">
      <div className="mb-6 flex items-center justify-between border-b border-[#E8DFD1] pb-4">
        <h3 className="text-lg font-bold text-[#2B2B2B]">Filters</h3>
        {currentCategory && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#7A6A53] hover:underline"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#6F6A63]">
          Categories
        </h4>

        <div className="space-y-2.5">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#2B2B2B] hover:text-[#7A6A53] transition">
            <input
              type="radio"
              name="category_filter"
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
                className="flex cursor-pointer items-center gap-3 text-sm text-[#2B2B2B] hover:text-[#7A6A53] transition"
              >
                <input
                  type="radio"
                  name="category_filter"
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
      </div>
    </aside>
  );
}
