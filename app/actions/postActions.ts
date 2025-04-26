"use server";

import clientPromise from "@/lib/mongodb";

export async function createPost(title: string, content: string) {
  const client = await clientPromise;
  const db = client.db("myDatabase");
  const postsCollection = db.collection("posts");

  await postsCollection.insertOne({
    title,
    content,
    createdAt: new Date(),
  });

  return { success: true };
}

export async function getPosts() {
  const client = await clientPromise;
  const db = client.db("myDatabase");
  const postsCollection = db.collection("posts");

  const posts = await postsCollection.find({}).toArray();
  return posts;
}
