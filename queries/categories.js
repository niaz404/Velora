import { MOCK_CATEGORIES } from "@/data/mock-store";
import { Category } from "@/model/category-model";
import { connectDB } from "@/service/mongo";

export const getCategories = async (limit) => {
  try {
    const conn = await connectDB();
    if (!conn) return limit ? MOCK_CATEGORIES.slice(0, limit) : MOCK_CATEGORIES;

    let query = Category.find().lean();

    if (limit) query = query.limit(limit);

    const categories = await query;

    if (!categories || categories.length === 0) {
      return limit ? MOCK_CATEGORIES.slice(0, limit) : MOCK_CATEGORIES;
    }

    return categories.map((cat) => ({
      ...cat,
      _id: cat._id?.toString(),
    }));
  } catch (error) {
    console.error("Failed to get Categories, using mock fallback:", error);
    return limit ? MOCK_CATEGORIES.slice(0, limit) : MOCK_CATEGORIES;
  }
};
