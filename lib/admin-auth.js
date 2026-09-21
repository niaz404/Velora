import { auth } from "@/lib/auth";
import { User } from "@/model/user-model";
import { connectDB } from "@/service/mongo";
import { headers } from "next/headers";

export async function getAuthUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    await connectDB();
    const dbUser = await User.findById(session.user.id).lean();

    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      role: dbUser?.role || "customer",
      phone: dbUser?.phone || "",
    };
  } catch (error) {
    console.error("Error getting authenticated user:", error);
    return null;
  }
}

export async function verifyRole(allowedRoles = []) {
  const user = await getAuthUser();

  if (!user) {
    return {
      authorized: false,
      status: 401,
      error: "Authentication required. Please sign in.",
      user: null,
    };
  }

  // super_admin always has access to everything
  if (user.role === "super_admin" || allowedRoles.includes(user.role)) {
    return {
      authorized: true,
      user,
    };
  }

  return {
    authorized: false,
    status: 403,
    error: `Access denied. Your role '${user.role}' does not have permission for this resource.`,
    user,
  };
}
