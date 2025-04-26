"use server";


import {videosCollection , getDb , client} from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getVideos(lastCreatedAt?: string) {

  await getDb()

  // console.log(lastCreatedAt)

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