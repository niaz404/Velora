import { User } from "@/model/user-model";
import { connectDB } from "@/service/mongo";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return Response.json({ error: "Missing user ID" }, { status: 400 });
    }

    const user = await User.findById(id).lean();

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    console.error("Fetch profile error:", error);
    return Response.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
