import mongoose from "mongoose";

const MONGODB_URI = process.env.MongoDB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MongoDB_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;

  return cached.conn;
}
