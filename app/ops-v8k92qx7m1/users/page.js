"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  X,
  Crown,
  Headphones,
  ShoppingBag,
  User as UserIcon
} from "lucide-react";

export default function DashboardUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      setUsers(data.users || []);
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingUserId(userId);
    setFeedback({ message: "", type: "" });

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update user role");

      setUsers(prev =>
        prev.map(u => (u._id === userId ? { ...u, role: newRole } : u))
      );

      setFeedback({
        message: `User clearance updated to "${newRole}".`,
        type: "success"
      });
    } catch (err) {
      setFeedback({ message: err.message, type: "error" });
    } finally {
      setUpdatingUserId(null);
    }
  };

  const roleBadgeStyle = (role) => {
    switch (role) {
      case "super_admin":
        return "bg-amber-950/70 border-amber-600/50 text-amber-300";
      case "admin":
        return "bg-purple-950/70 border-purple-600/50 text-purple-300";
      case "seller":
        return "bg-emerald-950/70 border-emerald-600/50 text-emerald-300";
      case "support":
        return "bg-blue-950/70 border-blue-600/50 text-blue-300";
      default:
        return "bg-stone-900 border-stone-700 text-stone-300";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "super_admin":
        return <Crown size={12} className="text-amber-400" />;
      case "admin":
        return <ShieldCheck size={12} className="text-purple-400" />;
      case "seller":
        return <ShoppingBag size={12} className="text-emerald-400" />;
      case "support":
        return <Headphones size={12} className="text-blue-400" />;
      default:
        return <UserIcon size={12} className="text-stone-400" />;
    }
  };

  const roles = ["customer", "support", "seller", "admin", "super_admin"];

  const filteredUsers = users.filter(u => {
    const q = search.toLowerCase();
    const matchesQuery = 
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Users className="text-[#D4A373]" /> Identity & Role Governance
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#E8DFD1]/60">
            Control employee workspace clearance, assign administrative access, and manage customer base.
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="self-start sm:self-auto rounded-2xl border border-[#3D3630] bg-[#1A1714] hover:bg-[#2A241F] px-4 py-2.5 text-xs font-semibold text-[#E8DFD1] transition"
        >
          Refresh Directory
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

      {/* Role Descriptions Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="rounded-2xl bg-[#141210] border border-[#2C2723] p-3 text-[11px]">
          <span className="font-bold text-stone-300 uppercase block mb-0.5">1. Customer</span>
          <p className="text-white/50">Storefront shopping, cart & personal orders only.</p>
        </div>
        <div className="rounded-2xl bg-[#141210] border border-[#2C2723] p-3 text-[11px]">
          <span className="font-bold text-blue-400 uppercase block mb-0.5">2. Support</span>
          <p className="text-white/50">Order fulfillment, delivery tracking & inquiry triage.</p>
        </div>
        <div className="rounded-2xl bg-[#141210] border border-[#2C2723] p-3 text-[11px]">
          <span className="font-bold text-emerald-400 uppercase block mb-0.5">3. Seller</span>
          <p className="text-white/50">Product catalog, inventory quantities & pricing.</p>
        </div>
        <div className="rounded-2xl bg-[#141210] border border-[#2C2723] p-3 text-[11px]">
          <span className="font-bold text-purple-400 uppercase block mb-0.5">4. Admin</span>
          <p className="text-white/50">Catalog, orders, categories & customer directory.</p>
        </div>
        <div className="rounded-2xl bg-[#141210] border border-[#2C2723] p-3 text-[11px]">
          <span className="font-bold text-amber-400 uppercase block mb-0.5">5. Super Admin</span>
          <p className="text-white/50">Total governance, user role assignments & system settings.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            placeholder="Search by user name or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#2C2723] bg-[#1A1714] py-3 pl-11 pr-4 text-xs text-white placeholder-white/40 focus:border-[#7A6A53] focus:outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-2xl border border-[#2C2723] bg-[#1A1714] px-4 py-3 text-xs text-white focus:border-[#7A6A53] focus:outline-none capitalize"
        >
          <option value="all">All Roles ({users.length})</option>
          {roles.map((r) => (
            <option key={r} value={r}>Role: {r.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl border border-[#2C2723] bg-[#1A1714]/80 backdrop-blur-md overflow-hidden shadow-2xl">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4A373] border-t-transparent" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#E8DFD1]/50">
            No registered users found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#2C2723] bg-[#141210]/60 text-[#E8DFD1]/50 uppercase tracking-wider font-semibold">
                  <th className="p-4">User</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Current Role</th>
                  <th className="p-4">Change Clearance</th>
                  <th className="p-4 text-right">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C2723]/60">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-[#221E1A]/40 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#2C2723] border border-[#3D3630] flex items-center justify-center font-bold text-white uppercase text-xs">
                          {user.name ? user.name.slice(0, 2) : user.email?.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{user.name || "Velora Client"}</div>
                          <div className="text-[10px] text-[#E8DFD1]/40 font-mono">ID: {user._id.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[#E8DFD1]/90">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${roleBadgeStyle(user.role)}`}>
                        {getRoleIcon(user.role)} {user.role?.replace("_", " ") || "customer"}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        disabled={updatingUserId === user._id}
                        value={user.role || "customer"}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="rounded-xl border border-[#3D3630] bg-[#141210] px-3 py-1.5 text-xs font-semibold text-white focus:border-[#7A6A53] focus:outline-none cursor-pointer capitalize disabled:opacity-50"
                      >
                        {roles.map(r => (
                          <option key={r} value={r}>
                            {r.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-right text-[#E8DFD1]/50 font-mono text-[11px]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
