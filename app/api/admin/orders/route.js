import { verifyRole } from "@/lib/admin-auth";
import { Order } from "@/model/order-model";
import { User } from "@/model/user-model";
import { connectDB } from "@/service/mongo";
import { MOCK_ORDERS } from "@/data/mock-store";

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

    if (!orders || orders.length === 0) {
      let mockList = [...MOCK_ORDERS];
      if (status && status !== "all") {
        mockList = mockList.filter(o => o.status?.toLowerCase() === status.toLowerCase());
      }
      return Response.json({ orders: mockList });
    }

    const customerIds = orders.map((o) => o.customerId).filter(Boolean);
    const users = await User.find({ _id: { $in: customerIds } }).lean();
    const userMap = users.reduce((acc, u) => {
      acc[u._id] = u;
      return acc;
    }, {});

    const enrichedOrders = orders.map((o) => ({
      ...o,
      _id: o._id.toString(),
      user: o.user || userMap[o.customerId] || { name: "Velora Client", email: "client@velora.com" },
    }));

    return Response.json({ orders: enrichedOrders });
  } catch (error) {
    console.error("Fetch admin orders error, falling back to mock:", error);
    return Response.json({ orders: MOCK_ORDERS });
  }
}
