import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.warn("⚠️ MONGO_URI is not defined in environment variables. Database queries may fail.");
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 3000,
      })
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn("⚠️ MongoDB connection timed out or unavailable:", err.message);
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", error);
    return null;
  }
};
