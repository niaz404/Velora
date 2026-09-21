import { verifyRole } from "@/lib/admin-auth";
import { Category } from "@/model/category-model";
import { Product } from "@/model/product-model";
import { connectDB } from "@/service/mongo";
import { MOCK_CATEGORIES } from "@/data/mock-store";

export async function GET() {
  const authCheck = await verifyRole(["admin", "seller", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 }).lean();

    if (!categories || categories.length === 0) {
      return Response.json({ categories: MOCK_CATEGORIES });
    }

    const categoriesWithCount = await Promise.all(
      categories.map(async (c) => {
        const count = await Product.countDocuments({ categoryId: c._id });
        return {
          ...c,
          _id: c._id.toString(),
          productCount: count,
        };
      })
    );

    return Response.json({ categories: categoriesWithCount });
  } catch (error) {
    console.error("Fetch categories error, falling back to mock:", error);
    return Response.json({ categories: MOCK_CATEGORIES });
  }
}

export async function POST(req) {
  const authCheck = await verifyRole(["admin", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const { name, slug, description, image } = await req.json();

    if (!name) {
      return Response.json({ error: "Category name is required" }, { status: 400 });
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newCategory = await Category.create({
      name,
      slug: finalSlug,
      description: description || "",
      image: image || "",
    });

    return Response.json({ success: true, category: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Create category error:", error);
    return Response.json({ error: "Failed to create category" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const authCheck = await verifyRole(["admin", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Missing category ID" }, { status: 400 });
    }

    await Category.findByIdAndDelete(id);
    return Response.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Delete category error:", error);
    return Response.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
