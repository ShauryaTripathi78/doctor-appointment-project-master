import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const uri = process.env.MONGODB_URI;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve the client across HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// For Mongoose (optional but recommended)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(uri!);
  console.log("MongoDB connected");
};

export default connectDB;
export { clientPromise };
