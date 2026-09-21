import { verifyRole } from "@/lib/admin-auth";
import { Product } from "@/model/product-model";
import { Category } from "@/model/category-model";
import { connectDB } from "@/service/mongo";

export async function GET(req) {
  const authCheck = await verifyRole(["admin", "seller", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      query.categoryId = category;
    }

    const products = await Product.find(query)
      .populate("categoryId")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(
      products.map((p) => ({
        ...p,
        _id: p._id.toString(),
        categoryId: p.categoryId
          ? { ...p.categoryId, _id: p.categoryId._id.toString() }
          : null,
      }))
    );
  } catch (error) {
    console.error("Fetch admin products error:", error);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  const authCheck = await verifyRole(["admin", "seller", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const body = await req.json();

    const {
      name,
      slug,
      description,
      price,
      categoryId,
      stock,
      type,
      colors,
      images,
      isFeatured,
    } = body;

    if (!name || !price || !categoryId) {
      return Response.json(
        { error: "Name, price, and category are required." },
        { status: 400 }
      );
    }

    const finalSlug = (
      slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    ) + (slug ? "" : `-${Date.now().toString().slice(-4)}`);

    const newProduct = await Product.create({
      name,
      slug: finalSlug,
      description: description || "Handcrafted crochet product.",
      price: Number(price),
      categoryId,
      stock: Number(stock) || 0,
      type: type || "stock",
      colors: Array.isArray(colors) ? colors : colors ? colors.split(",").map((c) => c.trim()) : [],
      images: Array.isArray(images) && images.length > 0 ? images : ["https://picsum.photos/seed/crochet/400/400"],
      isFeatured: Boolean(isFeatured),
      isActive: true,
      totalSold: 0,
      rating: 5,
      ratingCount: 1,
    });

    return Response.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return Response.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}
