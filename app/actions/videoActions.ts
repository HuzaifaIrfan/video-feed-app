"use server";

import clientPromise from "@/lib/mongodb";


export async function getVideos() {
    const client = await clientPromise;
    const db = client.db("video_feed_crawler");
    const videosCollection = db.collection("videos");
  
    const videos = await videosCollection.find({}).toArray();
    return videos;
  }
  