"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center rounded-full border border-[#E8DFD1] bg-white px-3.5 py-1.5 focus-within:border-[#7A6A53] focus-within:ring-2 focus-within:ring-[#7A6A53]/20 transition shadow-xs"
    >
      <Search size={16} className="text-[#6F6A63]" />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search crochet..."
        className="ml-2 w-full md:w-36 lg:w-48 bg-transparent text-xs sm:text-sm outline-none text-[#2B2B2B] placeholder:text-[#A39B8F]"
      />
    </form>
  );
};

export default SearchBox;
