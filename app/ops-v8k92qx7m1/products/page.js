"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  AlertCircle, 
  Check, 
  X, 
  Sparkles,
} from "lucide-react";

export default function DashboardProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const initialForm = {
    name: "",
    slug: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    stock: 10,
    images: "",
    colors: "",
    sizes: "XS, S, M, L, XL",
    isFeatured: false,
    inStock: true,
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch products");
      setProducts(data.products || []);
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || "",
      slug: prod.slug || "",
      description: prod.description || "",
      price: prod.price || "",
      discountPrice: prod.discountPrice || "",
      category: prod.category || "",
      stock: prod.stock || 0,
      images: Array.isArray(prod.images) ? prod.images.join(", ") : (prod.images || ""),
      colors: Array.isArray(prod.colors) ? prod.colors.join(", ") : (prod.colors || ""),
      sizes: Array.isArray(prod.sizes) ? prod.sizes.join(", ") : (prod.sizes || ""),
      isFeatured: Boolean(prod.isFeatured),
      inStock: Boolean(prod.inStock),
    });
    setModalOpen(true);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (!editingProduct) {
      const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      setFormData(prev => ({ ...prev, name: val, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, name: val }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ message: "", type: "" });

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        category: formData.category,
        stock: parseInt(formData.stock, 10) || 0,
        images: formData.images.split(",").map(s => s.trim()).filter(Boolean),
        colors: formData.colors.split(",").map(s => s.trim()).filter(Boolean),
        sizes: formData.sizes.split(",").map(s => s.trim()).filter(Boolean),
        isFeatured: formData.isFeatured,
        inStock: formData.inStock,
      };

      const url = editingProduct ? `/api/admin/products/${editingProduct._id}` : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to save product");

      setFeedback({
        message: editingProduct ? "Product updated successfully!" : "Product created successfully!",
        type: "success"
      });
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete product");
      setFeedback({ message: "Product deleted successfully", type: "success" });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    }
  };

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) || 
                          p.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Package className="text-[#D4A373]" /> Luxury Product Catalog
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#E8DFD1]/60">
            Create, update, manage prices, and control stock availability.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-2xl bg-[#7A6A53] hover:bg-[#655743] px-5 py-3 text-xs sm:text-sm font-bold text-white transition shadow-lg shadow-black/40"
        >
          <Plus size={16} /> New Product
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

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            placeholder="Search luxury products by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#2C2723] bg-[#1A1714] py-3 pl-11 pr-4 text-xs text-white placeholder-white/40 focus:border-[#7A6A53] focus:outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-2xl border border-[#2C2723] bg-[#1A1714] px-4 py-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
        >
          <option value="all">All Categories ({products.length})</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md overflow-hidden shadow-2xl">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4A373] border-t-transparent" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#E8DFD1]/50">
            No products found matching your search. Click &ldquo;New Product&rdquo; to add your first item.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#2C2723] bg-[#141210]/60 text-[#E8DFD1]/50 uppercase tracking-wider font-semibold">
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C2723]/60">
                {filteredProducts.map((prod) => {
                  const img = prod.images?.[0] || "/placeholder.jpg";
                  return (
                    <tr key={prod._id} className="hover:bg-[#221E1A]/40 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-[#3D3630] bg-[#141210]">
                            {img.startsWith("http") || img.startsWith("/") ? (
                              <Image 
                                src={img} 
                                alt={prod.name} 
                                fill 
                                className="object-cover" 
                                unoptimized
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[#D4A373]">
                                <Package size={18} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              {prod.name}
                              {prod.isFeatured && (
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-950/80 border border-amber-600/50 px-2 py-0.5 text-[9px] font-bold text-amber-300">
                                  <Sparkles size={10} /> Featured
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#E8DFD1]/40 font-mono">
                              /{prod.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="rounded-xl bg-[#2C2723] px-2.5 py-1 text-[11px] font-medium text-[#E8DFD1]">
                          {prod.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">
                          ${prod.price?.toFixed(2)}
                        </div>
                        {prod.discountPrice && (
                          <span className="text-[10px] text-emerald-400 font-medium">
                            Sale: ${prod.discountPrice?.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`font-bold ${
                          prod.stock <= 5 ? "text-red-400" : prod.stock <= 15 ? "text-amber-400" : "text-emerald-400"
                        }`}>
                          {prod.stock} in stock
                        </span>
                      </td>
                      <td className="p-4">
                        {prod.inStock ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-700/50 text-[10px] font-bold text-emerald-300">
                            Available
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-[10px] font-bold text-stone-400">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(prod)}
                            title="Edit Product"
                            className="rounded-xl border border-[#3D3630] bg-[#1F1B17] p-2 text-[#E8DFD1] hover:bg-[#2C2723] hover:text-white transition"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(prod._id, prod.name)}
                            title="Delete Product"
                            className="rounded-xl border border-red-500/30 bg-red-950/20 p-2 text-red-400 hover:bg-red-900/40 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-[#3D3630] bg-[#1A1714] p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#2C2723]">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Package className="text-[#D4A373]" />
                {editingProduct ? "Edit Luxury Product" : "Add New Luxury Product"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl p-1.5 text-white/50 hover:bg-[#2C2723] hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g. Silk Velvet Evening Coat"
                    className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                    Slug / URL Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="silk-velvet-evening-coat"
                    className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Artisanal craftsmanship description..."
                  className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                    Regular Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="249.00"
                    className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                    Discount Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    placeholder="199.00"
                    className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                    Inventory Stock *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="25"
                    className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Haute Couture, Knitwear, Leather Goods"
                    className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                    Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="XS, S, M, L, XL"
                    className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                  Image URLs (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://images.unsplash.com/..., https://..."
                  className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E8DFD1]/60 mb-1">
                  Colors (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  placeholder="Black, Champagne Gold, Navy"
                  className="w-full rounded-2xl border border-[#2C2723] bg-[#141210] p-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#E8DFD1]">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="h-4 w-4 rounded accent-[#7A6A53]"
                  />
                  Mark as Available In Stock
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#E8DFD1]">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="h-4 w-4 rounded accent-[#7A6A53]"
                  />
                  Show in Featured Showcase
                </label>
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
                  {submitting ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
