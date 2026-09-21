import { Category } from "@/model/category-model";
import { connectDB } from "@/service/mongo";

export const getCategories = async (limit) => {
  try {
    const conn = await connectDB();
    if (!conn) return [];

    let query = Category.find().lean();

    if (limit) query = query.limit(limit);

    const categories = await query;

    return categories.map((cat) => ({
      ...cat,
      _id: cat._id?.toString(),
    }));
  } catch (error) {
    console.error("Failed to get Categories:", error);
    return [];
  }
};
