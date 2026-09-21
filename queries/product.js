import "@/model/category-model";
import "@/model/product-model";
import { Category } from "@/model/category-model";
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

export const getProducts = async (filters = {}) => {
  try {
    const conn = await connectDB();
    if (!conn) return [];

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
    return products.map(serializeProduct);
  } catch (error) {
    console.error("Failed to get products:", error);
    return [];
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const conn = await connectDB();
    if (!conn) return null;

    const product = await Product.findOne({ slug }).populate("categoryId").lean();
    return serializeProduct(product);
  } catch (error) {
    console.error(`Failed to get product with slug ${slug}:`, error);
    return null;
  }
};

export const getRelatedProducts = async (categoryId, currentSlug, limit = 3) => {
  try {
    const conn = await connectDB();
    if (!conn) return [];

    let filter = { slug: { $ne: currentSlug } };
    if (categoryId) {
      filter.categoryId = categoryId;
    }

    const products = await Product.find(filter)
      .populate("categoryId")
      .limit(limit)
      .lean();

    return products.map(serializeProduct);
  } catch (error) {
    console.error("Failed to get related products:", error);
    return [];
  }
};

export const getMostSoldProduct = async (limit = 3) => {
  try {
    const conn = await connectDB();
    if (!conn) return [];

    let query = Product.find().lean().sort({ totalSold: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    const products = await query;
    return products.map(serializeProduct);
  } catch (error) {
    console.error("Failed to get most sold products:", error);
    return [];
  }
};

export const getProductsByDate = async (sort = "new", limit = 3) => {
  try {
    const conn = await connectDB();
    if (!conn) return [];

    const sortOption = sort === "old" ? { createdAt: 1 } : { createdAt: -1 };

    let query = Product.find().lean().sort(sortOption);

    if (limit) {
      query = query.limit(limit);
    }

    const products = await query;
    return products.map(serializeProduct);
  } catch (error) {
    console.error("Failed to get products by date:", error);
    return [];
  }
};
