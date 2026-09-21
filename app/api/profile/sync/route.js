import { User } from "@/model/user-model";
import { connectDB } from "@/service/mongo";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, name, email, phone } = body;

    if (!id) {
      return Response.json({ error: "Missing user id" }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        _id: id,
        name: name || "User",
        email: email || "",
        phone: phone || "",
        image: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(name || "user")}`,
        role: "customer",
      },
      { upsert: true, new: true },
    );

    return Response.json(user);
  } catch (error) {
    console.error("Profile sync error:", error);
    return Response.json({ error: "Failed to sync profile" }, { status: 500 });
  }
}
