import { verifyRole } from "@/lib/admin-auth";
import { Order } from "@/model/order-model";
import { User } from "@/model/user-model";
import { Product } from "@/model/product-model";
import { connectDB } from "@/service/mongo";

export async function GET(req) {
  const authCheck = await verifyRole(["admin", "support", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("items.productId")
      .sort({ createdAt: -1 })
      .lean();

    // Attach customer user info if available
    const customerIds = orders.map((o) => o.customerId);
    const users = await User.find({ _id: { $in: customerIds } }).lean();
    const userMap = users.reduce((acc, u) => {
      acc[u._id] = u;
      return acc;
    }, {});

    const enrichedOrders = orders.map((o) => ({
      ...o,
      _id: o._id.toString(),
      customer: userMap[o.customerId] || { name: "Guest Customer", email: "guest@velora.com" },
    }));

    return Response.json(enrichedOrders);
  } catch (error) {
    console.error("Fetch admin orders error:", error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
