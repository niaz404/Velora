"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Users, 
  ArrowUpRight, 
  AlertTriangle, 
  CheckCircle2, 
  Plus,
  ShieldCheck
} from "lucide-react";
import { DASHBOARD_URL } from "@/lib/constants";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load dashboard metrics");
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#D4A373] border-t-transparent" />
          <p className="text-xs uppercase tracking-widest text-[#E8DFD1]/60 font-semibold">
            Loading Operations Studio...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-center text-red-300">
        <AlertTriangle className="mx-auto mb-2 text-red-400" size={32} />
        <h3 className="font-bold">Failed to load operations data</h3>
        <p className="mt-1 text-xs opacity-80">{error}</p>
        <button
          onClick={fetchStats}
          className="mt-4 rounded-xl bg-red-600/30 border border-red-500/40 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600/50 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const { overview, recentOrders, lowStockProducts, userRole } = stats || {
    overview: { totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalCustomers: 0, lowStockCount: 0 },
    recentOrders: [],
    lowStockProducts: [],
    userRole: "staff"
  };

  const statusBadge = (status) => {
    const s = (status || "pending").toLowerCase();
    switch (s) {
      case "delivered":
        return "bg-emerald-950/70 border-emerald-700/50 text-emerald-300";
      case "shipped":
        return "bg-blue-950/70 border-blue-700/50 text-blue-300";
      case "processing":
      case "confirmed":
        return "bg-amber-950/70 border-amber-700/50 text-amber-300";
      case "cancelled":
        return "bg-red-950/70 border-red-700/50 text-red-300";
      default:
        return "bg-stone-900 border-stone-700 text-stone-300";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[#2C2723] bg-gradient-to-r from-[#1E1A16] via-[#1A1714] to-[#141210] p-6 sm:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-[#7A6A53]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#7A6A53]/20 border border-[#7A6A53]/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#D4A373]">
              <ShieldCheck size={13} /> {userRole?.replace("_", " ")} Workspace
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Velora Executive Control
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#E8DFD1]/60">
              Live enterprise terminal: track orders, manage luxury inventory, and monitor store health.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {(userRole === "admin" || userRole === "super_admin" || userRole === "seller") && (
              <Link
                href={`${DASHBOARD_URL}/products`}
                className="flex items-center gap-2 rounded-2xl bg-[#7A6A53] hover:bg-[#655743] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition shadow-lg shadow-black/40"
              >
                <Plus size={16} /> Add Product
              </Link>
            )}
            {(userRole === "admin" || userRole === "super_admin" || userRole === "support") && (
              <Link
                href={`${DASHBOARD_URL}/orders`}
                className="flex items-center gap-2 rounded-2xl border border-[#3D3630] bg-[#1A1714] hover:bg-[#2A241F] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#E8DFD1] transition"
              >
                <ShoppingBag size={16} /> Manage Orders
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Revenue */}
        <div className="rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md p-6 shadow-xl relative overflow-hidden group hover:border-[#7A6A53]/50 transition duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8DFD1]/60">
              Gross Revenue
            </span>
            <div className="rounded-2xl bg-emerald-950/60 border border-emerald-700/40 p-2.5 text-emerald-400">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              ${(overview?.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ArrowUpRight size={13} /> Completed & Shipped Orders
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md p-6 shadow-xl relative overflow-hidden group hover:border-[#7A6A53]/50 transition duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8DFD1]/60">
              Total Orders
            </span>
            <div className="rounded-2xl bg-blue-950/60 border border-blue-700/40 p-2.5 text-blue-400">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {overview?.totalOrders || 0}
            </div>
            <p className="mt-1 text-[11px] text-[#E8DFD1]/60">
              Across all customer accounts
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div className="rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md p-6 shadow-xl relative overflow-hidden group hover:border-[#7A6A53]/50 transition duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8DFD1]/60">
              Catalog Items
            </span>
            <div className="rounded-2xl bg-[#7A6A53]/30 border border-[#7A6A53]/50 p-2.5 text-[#D4A373]">
              <Package size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {overview?.totalProducts || 0}
            </div>
            <p className="mt-1 text-[11px] text-[#E8DFD1]/60">
              Active luxury products
            </p>
          </div>
        </div>

        {/* Customers / Users */}
        <div className="rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md p-6 shadow-xl relative overflow-hidden group hover:border-[#7A6A53]/50 transition duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8DFD1]/60">
              Registered Users
            </span>
            <div className="rounded-2xl bg-amber-950/60 border border-amber-700/40 p-2.5 text-amber-400">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {overview?.totalCustomers || 0}
            </div>
            <p className="mt-1 text-[11px] text-[#E8DFD1]/60">
              Customers & staff members
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Sections: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List (Takes 2 Columns) */}
        <div className="lg:col-span-2 rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2C2723]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Recent Orders</h2>
              <p className="text-xs text-[#E8DFD1]/60">Latest transactions requiring fulfillment</p>
            </div>
            <Link
              href={`${DASHBOARD_URL}/orders`}
              className="text-xs font-bold text-[#D4A373] hover:text-[#e4be93] flex items-center gap-1 transition"
            >
              View All <ArrowUpRight size={14} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#E8DFD1]/50">
              No orders found yet. New store orders will appear here automatically.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#2C2723] text-[#E8DFD1]/50 uppercase tracking-wider font-semibold">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C2723]/60">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-[#221E1A]/40 transition">
                      <td className="py-3 font-mono font-bold text-white">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="py-3 text-[#E8DFD1]/90">
                        {order.shippingAddress?.fullName || order.user?.name || "Velora Client"}
                      </td>
                      <td className="py-3 font-bold text-white">
                        ${order.totalPrice?.toFixed(2) || "0.00"}
                      </td>
                      <td className="py-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusBadge(order.status)}`}>
                          {order.status || "pending"}
                        </span>
                      </td>
                      <td className="py-3 text-[#E8DFD1]/50 font-mono">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock & Quick Actions (Takes 1 Column) */}
        <div className="space-y-6">
          {/* Low Stock Watch */}
          <div className="rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#2C2723]">
              <AlertTriangle className="text-amber-400" size={18} />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Inventory Alerts ({lowStockProducts.length})
              </h2>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-emerald-400 flex items-center gap-2 py-4">
                <CheckCircle2 size={16} /> All product inventory levels are healthy!
              </p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((prod) => (
                  <div key={prod._id} className="flex items-center justify-between rounded-2xl bg-[#141210] p-3 border border-[#2C2723]">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs font-bold text-white truncate">{prod.name}</p>
                      <p className="text-[10px] text-[#E8DFD1]/50">Category: {prod.category || "General"}</p>
                    </div>
                    <span className="rounded-xl bg-red-950/70 border border-red-700/50 px-2.5 py-1 text-[11px] font-bold text-red-300">
                      {prod.stock} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Role Access Matrix */}
          <div className="rounded-3xl border border-[#2C2723] bg-[#141210] p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4A373] mb-3">
              Role Capabilities
            </h3>
            <ul className="space-y-2 text-[11px] text-[#E8DFD1]/70">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <strong className="text-white">Seller:</strong> Catalog & inventory management
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <strong className="text-white">Support:</strong> Order fulfillment & tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <strong className="text-white">Admin:</strong> Products, categories & orders
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <strong className="text-white">Super Admin:</strong> Total governance & user roles
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
