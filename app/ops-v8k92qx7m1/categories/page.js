"use client";

import { useEffect, useState } from "react";
import { 
  Layers, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle, 
  X, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function DashboardCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load categories");
      setCategories(data.categories || []);
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNameChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    setFormData(prev => ({ ...prev, name: val, slug: generatedSlug }));
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ message: "", type: "" });

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create category");

      setFeedback({ message: "Category created successfully!", type: "success" });
      setModalOpen(false);
      setFormData({ name: "", slug: "", description: "", image: "" });
      fetchCategories();
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete category");

      setFeedback({ message: `Category "${name}" deleted.`, type: "success" });
      setCategories(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Layers className="text-[#D4A373]" /> Collection & Category Architecture
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#E8DFD1]/60">
            Structure your boutique catalogs, departments, and seasonal luxury lines.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-[#7A6A53] hover:bg-[#655743] px-5 py-3 text-xs sm:text-sm font-bold text-white transition shadow-lg shadow-black/40"
        >
          <Plus size={16} /> New Collection
        </button>
      </div>

      {/* Feedback Banner */}
      {feedback.message && (
        <div className={`flex items-center justify-between rounded-2xl p-4 text-xs font-semibold border ${
          feedback.type === "success" 
            ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
            : "bg-red-950/40 border-red-500/40 text-red-300"
        }`}>
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
            {feedback.message}
          </div>
          <button onClick={() => setFeedback({ message: "", type: "" })}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4A373] border-t-transparent" />
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 p-12 text-center text-xs text-[#E8DFD1]/50">
          No categories registered yet. Click &ldquo;New Collection&rdquo; to structure your store.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="group rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md p-6 shadow-xl hover:border-[#7A6A53]/50 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-xl bg-[#2C2723] px-3 py-1 text-[10px] font-mono uppercase text-[#D4A373]">
                    /{cat.slug || cat.name.toLowerCase()}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-stone-900 border border-stone-700 px-2.5 py-0.5 text-[10px] font-bold text-white/70">
                      {cat.productCount} {cat.productCount === 1 ? "Item" : "Items"}
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(cat._id, cat.name)}
                      className="text-white/40 hover:text-red-400 transition p-1"
                      title="Delete Category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-[#D4A373] transition">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-[#E8DFD1]/60 line-clamp-2">
                  {cat.description || "Luxury department collection for Velora clientele."}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2C2723] flex items-center justify-between text-xs">
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.slug || cat.name)}`}
                  className="flex items-center gap-1 font-bold text-[#D4A373] hover:text-[#e4be93] transition"
                  target="_blank"
                >
                  View on Storefront <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#3D3630] bg-[#1A1714] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#2C2723]">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="text-[#D4A373]" /> Add New Category
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl p-1.5 text-white/50 hover:bg-[#2C2723] hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="mt-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Haute Couture, Outerwear, Fine Watches"
                  className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                  Slug / URL Path *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="haute-couture"
                  className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Boutique curated selection..."
                  className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                  Banner / Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#2C2723]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-2xl border border-[#3D3630] bg-[#1A1714] px-5 py-2.5 text-xs font-semibold text-white/70 hover:bg-[#2A241F] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-2xl bg-[#7A6A53] hover:bg-[#655743] px-6 py-2.5 text-xs font-bold text-white transition disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
