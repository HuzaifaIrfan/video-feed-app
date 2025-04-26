"use server";

import clientPromise from "@/lib/mongodb";
import { checkPassword } from "./checkPassword";

export async function addPage({
  title,
  url,
  password,
}: {
  title: string;
  url: string;
  password: string;
}) {


  // Check password FIRST
  if (! await checkPassword(password)) {
    return { success: false, error: "Unauthorized" };
  }

  // Insert into MongoDB
  try {
    const client = await clientPromise;
    const db = client.db("video_feed_crawler"); // your DB
    const pages = db.collection("pages"); // using 'pages' collection now

    const result = await pages.insertOne({
      title,
      url,
      created_at: new Date(),
    });

    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error("Error adding page:", error);
    return { success: false, error: "Database error" };
  }
}



export async function getPages() {
  try {
    const client = await clientPromise;
    const db = client.db("video_feed_crawler");
    const pages = db.collection("pages");

    const results = await pages.find({}).sort({ created_at: -1 }).toArray();

    return {
      success: true,
      pages: results.map((page) => ({
        _id: page._id.toString(),
        title: page.title,
        url: page.url,
      })),
    };
  } catch (error) {
    console.error("Error fetching pages:", error);
    return { success: false };
  }
}


export async function deletePage({ id, password }: { id: string; password: string }) {
  if (! await checkPassword(password)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const client = await clientPromise;
    const db = client.db("video_feed_crawler");
    const pages = db.collection("pages");

    await pages.deleteOne({ _id: new (require("mongodb")).ObjectId(id) });

    return { success: true };
  } catch (error) {
    console.error("Error deleting page:", error);
    return { success: false };
  }
}