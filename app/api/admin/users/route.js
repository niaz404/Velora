import { verifyRole } from "@/lib/admin-auth";
import { User } from "@/model/user-model";
import { connectDB } from "@/service/mongo";

export async function GET(req) {
  const authCheck = await verifyRole(["admin", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const role = searchParams.get("role");

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (role && role !== "all") {
      query.role = role;
    }

    const users = await User.find(query).sort({ createdAt: -1 }).lean();

    return Response.json(
      users.map((u) => ({
        ...u,
        _id: u._id.toString(),
      }))
    );
  } catch (error) {
    console.error("Fetch users error:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(req) {
  const authCheck = await verifyRole(["admin", "super_admin"]);
  if (!authCheck.authorized) {
    return Response.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    await connectDB();
    const { userId, newRole } = await req.json();

    const validRoles = ["customer", "seller", "support", "admin", "super_admin"];
    if (!validRoles.includes(newRole)) {
      return Response.json({ error: "Invalid role specified" }, { status: 400 });
    }

    // Only super_admin can create another super_admin
    if (newRole === "super_admin" && authCheck.user.role !== "super_admin") {
      return Response.json(
        { error: "Only super_admin can assign the super_admin role" },
        { status: 403 }
      );
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );

    if (!updated) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(updated);
  } catch (error) {
    console.error("Update user role error:", error);
    return Response.json({ error: "Failed to update user role" }, { status: 500 });
  }
}
