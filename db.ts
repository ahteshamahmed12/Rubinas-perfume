import mongoose from "mongoose";

const MONGODB_URI = process.env.MongoDB_URI;

if (!MONGODB_URI) {
  throw new Error("Please provide a MongoDB URI in the environment variables.");
}

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

export default async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // usually false for better error handling
      maxPoolSize: 10        // <-- Corrected option here
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => mongooseInstance.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected");
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
  
}
