import { verifyRole } from "@/lib/admin-auth";
import { Product } from "@/model/product-model";
import { connectDB } from "@/service/mongo";
import { MOCK_PRODUCTS } from "@/data/mock-store";

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
    if (category && category !== "all") {
      query.category = category;
    }

    const products = await Product.find(query)
      .populate("categoryId")
      .sort({ createdAt: -1 })
      .lean();

    if (!products || products.length === 0) {
      let mockList = [...MOCK_PRODUCTS];
      if (search) {
        mockList = mockList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      }
      if (category && category !== "all") {
        mockList = mockList.filter(p => p.category === category);
      }
      return Response.json({ products: mockList });
    }

    return Response.json({
      products: products.map((p) => ({
        ...p,
        _id: p._id.toString(),
        categoryId: p.categoryId
          ? { ...p.categoryId, _id: p.categoryId._id.toString() }
          : null,
      })),
    });
  } catch (error) {
    console.error("Fetch admin products error, falling back to mock:", error);
    return Response.json({ products: MOCK_PRODUCTS });
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
      discountPrice,
      category,
      stock,
      sizes,
      colors,
      images,
      isFeatured,
      inStock,
    } = body;

    if (!name || !price) {
      return Response.json(
        { error: "Product title and price are required." },
        { status: 400 }
      );
    }

    const finalSlug = (
      slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    ) + `-${Date.now().toString().slice(-4)}`;

    const newProduct = await Product.create({
      name,
      slug: finalSlug,
      description: description || "Artisanal luxury piece.",
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      category: category || "Haute Couture",
      stock: Number(stock) || 0,
      inStock: inStock !== undefined ? inStock : true,
      colors: Array.isArray(colors) ? colors : colors ? colors.split(",").map((c) => c.trim()) : [],
      sizes: Array.isArray(sizes) ? sizes : sizes ? sizes.split(",").map((s) => s.trim()) : [],
      images: Array.isArray(images) && images.length > 0 ? images : ["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"],
      isFeatured: Boolean(isFeatured),
      isActive: true,
      totalSold: 0,
      rating: 5,
    });

    return Response.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return Response.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}
