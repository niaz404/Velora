import client from "@/lib/mongodb";
import { User } from "@/model/user-model";
import { connectDB } from "@/service/mongo";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { sendPasswordResetEmail } from "@/service/mail";

const db = client.db();

const baseURL = (
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  secret:
    process.env.BETTER_AUTH_SECRET ||
    "velora_development_secret_key_minimum_32_characters_long",

  baseURL,

  trustedOrigins: [
    baseURL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://velora-psi-ten.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
    resetPasswordTokenExpiresIn: 60 * 60, // 1 hour
    sendResetPassword: async ({ user, url, token }) => {
      try {
        await sendPasswordResetEmail({
          to: user.email,
          name: user.name,
          resetUrl: url,
        });
      } catch (mailErr) {
        console.error("Password reset email dispatch error:", mailErr);
      }
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            await connectDB();
            await User.updateOne(
              { _id: user.id },
              {
                $setOnInsert: {
                  _id: user.id,
                  name: user.name || "Customer",
                  email: user.email,
                  image:
                    user.image ||
                    `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(user.name || "user")}`,
                  phone: "",
                  role: "customer",
                },
              },
              { upsert: true },
            );
          } catch (err) {
            console.error("User database sync error:", err);
          }
        },
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
});
