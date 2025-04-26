"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getVideos(lastCreatedAt?: string) {

  // console.log(lastCreatedAt)

  const client = await clientPromise;
  const db = client.db("video_feed_crawler");
  const videosCollection = db.collection("videos");

  let query = {};
  if (lastCreatedAt) {
    query = { created_at: { $lt: new Date(lastCreatedAt) } };
  }

  const videos = await videosCollection
    .find(query)
    .sort({ created_at: -1 }) // latest first
    .limit(10)
    .toArray();

  return videos;
}