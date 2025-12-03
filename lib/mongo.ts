import connectDB, { clientPromise } from "./mongodb";

export async function getUserByEmail(email: string) {
  await connectDB();
  const db = (await clientPromise).db();
  return db.collection("users").findOne({ email });
}

export async function createUser(userData: any) {
  await connectDB();
  const db = (await clientPromise).db();
  const result = await db.collection("users").insertOne(userData);
  return { ...userData, _id: result.insertedId };
}
