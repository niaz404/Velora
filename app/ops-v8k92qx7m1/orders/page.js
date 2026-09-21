"use client";

import { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle, 
  X, 
  Eye, 
  Phone, 
  Calendar,
  Check,
  MapPin,
  CreditCard
} from "lucide-react";

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch orders");
      setOrders(data.orders || []);
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    setFeedback({ message: "", type: "" });

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update order status");

      setOrders(prev =>
        prev.map(o => (o._id === orderId ? { ...o, status: newStatus } : o))
      );

      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }

      setFeedback({
        message: `Order #${orderId.slice(-6).toUpperCase()} status updated to ${newStatus}`,
        type: "success"
      });
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    } finally {
      setUpdatingId(null);
    }
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

  const statuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

  const filteredOrders = orders.filter(o => {
    const q = search.toLowerCase();
    const matchesQuery = 
      o._id.toLowerCase().includes(q) ||
      o.shippingAddress?.fullName?.toLowerCase().includes(q) ||
      o.user?.email?.toLowerCase().includes(q) ||
      o.user?.name?.toLowerCase().includes(q) ||
      o.shippingAddress?.phone?.includes(q);

    const matchesStatus = statusFilter === "all" || (o.status || "pending").toLowerCase() === statusFilter.toLowerCase();
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <ShoppingBag className="text-[#D4A373]" /> Order Fulfillment & Tracking
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#E8DFD1]/60">
            Track customer deliveries, update fulfillment lifecycle, and inspect transaction details.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="self-start sm:self-auto rounded-2xl border border-[#3D3630] bg-[#1A1714] hover:bg-[#2A241F] px-4 py-2.5 text-xs font-semibold text-[#E8DFD1] transition"
        >
          Refresh Orders
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

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition capitalize ${
            statusFilter === "all"
              ? "bg-[#7A6A53] text-white shadow-md"
              : "bg-[#1A1714] text-white/60 hover:text-white border border-[#2C2723]"
          }`}
        >
          All ({orders.length})
        </button>
        {statuses.map(s => {
          const count = orders.filter(o => (o.status || "pending").toLowerCase() === s).length;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition capitalize ${
                statusFilter === s
                  ? "bg-[#7A6A53] text-white shadow-md"
                  : "bg-[#1A1714] text-white/60 hover:text-white border border-[#2C2723]"
              }`}
            >
              {s} ({count})
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
        <input
          type="text"
          placeholder="Search by order ID, customer name, email or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-[#2C2723] bg-[#1A1714] py-3 pl-11 pr-4 text-xs text-white placeholder-white/40 focus:border-[#7A6A53] focus:outline-none"
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md overflow-hidden shadow-2xl">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4A373] border-t-transparent" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#E8DFD1]/50">
            No orders found matching your search and filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#2C2723] bg-[#141210]/60 text-[#E8DFD1]/50 uppercase tracking-wider font-semibold">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status & Action</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C2723]/60">
                {filteredOrders.map((order) => {
                  const itemsCount = order.items?.reduce((acc, it) => acc + (it.quantity || 1), 0) || 0;
                  return (
                    <tr key={order._id} className="hover:bg-[#221E1A]/40 transition">
                      <td className="p-4">
                        <span className="font-mono font-bold text-white">
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                        <div className="text-[10px] text-[#E8DFD1]/40 font-mono">
                          {itemsCount} {itemsCount === 1 ? "item" : "items"}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">
                          {order.shippingAddress?.fullName || order.user?.name || "Velora Client"}
                        </div>
                        <div className="text-[10px] text-[#E8DFD1]/50">
                          {order.shippingAddress?.city || order.user?.email || "Direct Order"}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-white">
                          ${order.totalPrice?.toFixed(2) || "0.00"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="rounded-xl bg-[#2C2723] px-2.5 py-1 text-[10px] font-semibold text-[#E8DFD1] uppercase">
                          {order.paymentMethod || "COD"}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          disabled={updatingId === order._id}
                          value={order.status || "pending"}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`rounded-xl border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider focus:outline-none cursor-pointer ${statusBadge(order.status)}`}
                        >
                          {statuses.map(s => (
                            <option key={s} value={s} className="bg-[#1A1714] text-white">
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-[#E8DFD1]/50 font-mono text-[11px]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-xl border border-[#3D3630] bg-[#1F1B17] p-2 text-[#E8DFD1] hover:bg-[#2C2723] hover:text-white transition"
                          title="View Order Breakdown"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-[#3D3630] bg-[#1A1714] p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#2C2723]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A373]">
                  Order Details
                </span>
                <h2 className="text-xl font-bold text-white">
                  #{selectedOrder._id.slice(-6).toUpperCase()}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl p-1.5 text-white/50 hover:bg-[#2C2723] hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-6 text-xs">
              {/* Status Selector in Modal */}
              <div className="flex items-center justify-between rounded-2xl bg-[#141210] p-4 border border-[#2C2723]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/50">Current Lifecycle</span>
                  <div className="text-white font-bold capitalize">{selectedOrder.status || "pending"}</div>
                </div>
                <select
                  value={selectedOrder.status || "pending"}
                  onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold uppercase ${statusBadge(selectedOrder.status)}`}
                >
                  {statuses.map(s => (
                    <option key={s} value={s} className="bg-[#1A1714] text-white">{s}</option>
                  ))}
                </select>
              </div>

              {/* Customer & Shipping Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#141210] p-4 border border-[#2C2723] space-y-2">
                  <h3 className="font-bold text-white uppercase text-[10px] tracking-wider text-[#D4A373] flex items-center gap-1.5">
                    <MapPin size={13} /> Shipping Destination
                  </h3>
                  <p className="font-semibold text-white">{selectedOrder.shippingAddress?.fullName || "Recipient Name"}</p>
                  <p className="text-white/70">{selectedOrder.shippingAddress?.address || "Address"}</p>
                  <p className="text-white/70">
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode || ""}
                  </p>
                  {selectedOrder.shippingAddress?.phone && (
                    <p className="text-white/70 flex items-center gap-1">
                      <Phone size={11} /> {selectedOrder.shippingAddress.phone}
                    </p>
                  )}
                </div>

                <div className="rounded-2xl bg-[#141210] p-4 border border-[#2C2723] space-y-2">
                  <h3 className="font-bold text-white uppercase text-[10px] tracking-wider text-[#D4A373] flex items-center gap-1.5">
                    <CreditCard size={13} /> Billing & Payment
                  </h3>
                  <p className="text-white/70">
                    Payment Method: <span className="font-bold text-white uppercase">{selectedOrder.paymentMethod || "COD"}</span>
                  </p>
                  <p className="text-white/70">
                    Payment Status: <span className="font-bold text-emerald-400">{selectedOrder.isPaid ? "Paid" : "Pending on Delivery"}</span>
                  </p>
                  <p className="text-white/70 flex items-center gap-1">
                    <Calendar size={11} /> {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Order Items Table */}
              <div className="rounded-2xl bg-[#141210] p-4 border border-[#2C2723]">
                <h3 className="font-bold text-white uppercase text-[10px] tracking-wider text-[#D4A373] mb-3">
                  Purchased Items ({selectedOrder.items?.length || 0})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-[#2C2723] pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="font-bold text-white">{item.product?.name || item.name || "Product Item"}</p>
                        <p className="text-[10px] text-white/50">
                          Qty: {item.quantity || 1} &times; ${item.price?.toFixed(2) || "0.00"}
                          {item.size && ` | Size: ${item.size}`}
                          {item.color && ` | Color: ${item.color}`}
                        </p>
                      </div>
                      <span className="font-bold text-white">
                        ${((item.quantity || 1) * (item.price || 0)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[#2C2723] flex justify-between items-center text-sm font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-base text-emerald-400">${selectedOrder.totalPrice?.toFixed(2) || "0.00"}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-2xl bg-[#7A6A53] hover:bg-[#655743] px-6 py-2.5 text-xs font-bold text-white transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
