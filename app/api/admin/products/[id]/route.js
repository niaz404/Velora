import { verifyRole } from "@/lib/admin-auth";
import { Product } from "@/model/product-model";
import { connectDB } from "@/service/mongo";

export async function PUT(req, { params }) {
  const authCheck = await verifyRole(["admin", "seller", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        ...body,
        price: body.price !== undefined ? Number(body.price) : undefined,
        stock: body.stock !== undefined ? Number(body.stock) : undefined,
      },
      { new: true }
    );

    if (!updated) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(updated);
  } catch (error) {
    console.error("Update product error:", error);
    return Response.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const authCheck = await verifyRole(["admin", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    return Response.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
