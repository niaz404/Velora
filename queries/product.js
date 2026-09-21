import { MOCK_PRODUCTS } from "@/data/mock-store";
import "@/model/category-model";
import { Category } from "@/model/category-model";
import "@/model/product-model";
import { Product } from "@/model/product-model";
import { connectDB } from "@/service/mongo";

function serializeProduct(product) {
  if (!product) return null;
  return {
    ...product,
    _id: product._id?.toString(),
    categoryId: product.categoryId
      ? {
          ...product.categoryId,
          _id: product.categoryId._id?.toString(),
        }
      : null,
  };
}

function filterMockProducts(filters = {}) {
  const { category, sort, search } = filters;
  let list = [...MOCK_PRODUCTS];

  if (category && category !== "all") {
    list = list.filter(
      (p) =>
        p.categoryId?.slug === category ||
        p.category?.toLowerCase().includes(category.toLowerCase()),
    );
  }

  if (search) {
    const s = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name?.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s),
    );
  }

  if (sort === "low") {
    list.sort(
      (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
    );
  } else if (sort === "high") {
    list.sort(
      (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
    );
  } else if (sort === "oldest") {
    list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else {
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return list;
}

export const getProducts = async (filters = {}) => {
  try {
    const conn = await connectDB();
    if (!conn) return filterMockProducts(filters);

    const { category, sort, search } = filters;

    let queryObj = {};

    if (category && category !== "all") {
      const catDoc = await Category.findOne({ slug: category });
      if (catDoc) {
        queryObj.categoryId = catDoc._id;
      }
    }

    if (search) {
      queryObj.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let query = Product.find(queryObj).populate("categoryId");

    if (sort === "low") {
      query = query.sort({ price: 1 });
    } else if (sort === "high") {
      query = query.sort({ price: -1 });
    } else if (sort === "oldest") {
      query = query.sort({ createdAt: 1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const products = await query.lean();

    if (!products || products.length === 0) {
      return filterMockProducts(filters);
    }

    return products.map(serializeProduct);
  } catch (error) {
    console.error("Failed to get products, falling back to mock:", error);
    return filterMockProducts(filters);
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const conn = await connectDB();
    if (!conn) {
      return MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];
    }

    const product = await Product.findOne({ slug })
      .populate("categoryId")
      .lean();
    if (!product) {
      return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
    }
    return serializeProduct(product);
  } catch (error) {
    console.error(`Failed to get product with slug ${slug}:`, error);
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
};

export const getRelatedProducts = async (
  categoryId,
  currentSlug,
  limit = 3,
) => {
  try {
    const conn = await connectDB();
    if (!conn) {
      return MOCK_PRODUCTS.filter((p) => p.slug !== currentSlug).slice(
        0,
        limit,
      );
    }

    let filter = { slug: { $ne: currentSlug } };
    if (categoryId) {
      filter.categoryId = categoryId;
    }

    const products = await Product.find(filter)
      .populate("categoryId")
      .limit(limit)
      .lean();

    if (!products || products.length === 0) {
      return MOCK_PRODUCTS.filter((p) => p.slug !== currentSlug).slice(
        0,
        limit,
      );
    }

    return products.map(serializeProduct);
  } catch (error) {
    console.error("Failed to get related products:", error);
    return MOCK_PRODUCTS.filter((p) => p.slug !== currentSlug).slice(0, limit);
  }
};

export const getMostSoldProduct = async (limit = 3) => {
  try {
    const conn = await connectDB();
    if (!conn) {
      return [...MOCK_PRODUCTS]
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, limit);
    }

    let query = Product.find().lean().sort({ totalSold: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    const products = await query;
    if (!products || products.length === 0) {
      return [...MOCK_PRODUCTS]
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, limit);
    }

    return products.map(serializeProduct);
  } catch (error) {
    console.error("Failed to get most sold products:", error);
    return [...MOCK_PRODUCTS]
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, limit);
  }
};

export const getProductsByDate = async (sort = "new", limit = 3) => {
  try {
    const conn = await connectDB();
    if (!conn) {
      return [...MOCK_PRODUCTS].slice(0, limit);
    }

    const sortOption = sort === "old" ? { createdAt: 1 } : { createdAt: -1 };

    let query = Product.find().lean().sort(sortOption);

    if (limit) {
      query = query.limit(limit);
    }

    const products = await query;
    if (!products || products.length === 0) {
      return [...MOCK_PRODUCTS].slice(0, limit);
    }

    return products.map(serializeProduct);
  } catch (error) {
    console.error("Failed to get products by date:", error);
    return [...MOCK_PRODUCTS].slice(0, limit);
  }
};
