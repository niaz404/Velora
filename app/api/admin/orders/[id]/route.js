import { verifyRole } from "@/lib/admin-auth";
import { Order } from "@/model/order-model";
import { connectDB } from "@/service/mongo";

export async function PATCH(req, { params }) {
  const authCheck = await verifyRole(["admin", "support", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const { id } = await params;
    const { status } = await req.json();

    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return Response.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json(updated);
  } catch (error) {
    console.error("Update order status error:", error);
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }
}
