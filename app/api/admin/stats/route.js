import { verifyRole } from "@/lib/admin-auth";
import { Order } from "@/model/order-model";
import { Product } from "@/model/product-model";
import { User } from "@/model/user-model";
import { Category } from "@/model/category-model";
import { connectDB } from "@/service/mongo";

export async function GET() {
  const authCheck = await verifyRole(["admin", "seller", "support", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();

    const [
      totalProducts,
      lowStockProducts,
      totalOrders,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      totalCustomers,
      totalCategories,
      orders,
      recentOrders,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ type: "stock", stock: { $lte: 5 } }),
      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: { $in: ["processing", "confirmed"] } }),
      Order.countDocuments({ status: "delivered" }),
      User.countDocuments({ role: "customer" }),
      Category.countDocuments(),
      Order.find().select("totalAmount status").lean(),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return Response.json({
      stats: {
        totalRevenue,
        totalOrders,
        pendingOrders,
        processingOrders,
        deliveredOrders,
        totalProducts,
        lowStockProducts,
        totalCustomers,
        totalCategories,
      },
      recentOrders: recentOrders.map((o) => ({
        ...o,
        _id: o._id.toString(),
      })),
      userRole: authCheck.user.role,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return Response.json({ error: "Failed to load dashboard stats" }, { status: 500 });
  }
}
