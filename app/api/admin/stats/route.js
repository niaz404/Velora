import { verifyRole } from "@/lib/admin-auth";
import { Order } from "@/model/order-model";
import { Product } from "@/model/product-model";
import { User } from "@/model/user-model";
import { Category } from "@/model/category-model";
import { connectDB } from "@/service/mongo";
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_CATEGORIES, MOCK_USERS } from "@/data/mock-store";

export async function GET() {
  const authCheck = await verifyRole(["admin", "seller", "support", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();

    const [
      dbProductsCount,
      dbOrdersCount,
      dbCategoriesCount,
      dbUsersCount,
      dbOrders,
      dbRecentOrders,
      dbLowStock,
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Category.countDocuments(),
      User.countDocuments(),
      Order.find().lean(),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      Product.find({ stock: { $lte: 10 } }).limit(5).lean(),
    ]);

    // If DB is empty, use rich mock store data
    if (dbProductsCount === 0 && dbOrdersCount === 0) {
      const totalRevenue = MOCK_ORDERS.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
      const lowStockProducts = MOCK_PRODUCTS.filter(p => p.stock <= 10);

      return Response.json({
        overview: {
          totalRevenue,
          totalOrders: MOCK_ORDERS.length,
          totalProducts: MOCK_PRODUCTS.length,
          totalCustomers: MOCK_USERS.length,
          lowStockCount: lowStockProducts.length,
        },
        recentOrders: MOCK_ORDERS.slice(0, 5),
        lowStockProducts,
        userRole: authCheck.user?.role || "admin",
      });
    }

    const totalRevenue = dbOrders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (o.totalPrice || o.totalAmount || 0), 0);

    return Response.json({
      overview: {
        totalRevenue,
        totalOrders: dbOrdersCount,
        totalProducts: dbProductsCount,
        totalCustomers: dbUsersCount,
        lowStockCount: dbLowStock.length,
      },
      recentOrders: dbRecentOrders.map((o) => ({
        ...o,
        _id: o._id.toString(),
      })),
      lowStockProducts: dbLowStock.map((p) => ({
        ...p,
        _id: p._id.toString(),
      })),
      userRole: authCheck.user?.role || "admin",
    });
  } catch (error) {
    console.error("Dashboard stats error, falling back to mock:", error);
    const totalRevenue = MOCK_ORDERS.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
    const lowStockProducts = MOCK_PRODUCTS.filter(p => p.stock <= 10);

    return Response.json({
      overview: {
        totalRevenue,
        totalOrders: MOCK_ORDERS.length,
        totalProducts: MOCK_PRODUCTS.length,
        totalCustomers: MOCK_USERS.length,
        lowStockCount: lowStockProducts.length,
      },
      recentOrders: MOCK_ORDERS.slice(0, 5),
      lowStockProducts,
      userRole: authCheck.user?.role || "admin",
    });
  }
}
