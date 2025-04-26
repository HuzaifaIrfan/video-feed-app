"use server";

import  {connectToDatabase,disconnectFromDatabase} from "@/lib/mongodb";
import Video from "../../models/Video";

export async function getVideos(lastCreatedAt?: string) {

  await connectToDatabase();

    // Build the query based on lastCreatedAt
    let query = {};
    if (lastCreatedAt) {
      query = { created_at: { $lt: new Date(lastCreatedAt) } };
    }
  
    try {
      // Retrieve videos from the database using the query
      const videos = await Video.find(query) // Apply the filter query
        .sort({ created_at: -1 }) // Sort by created_at in descending order (latest first)
        .limit(10); // Limit the number of results to 10
  
      return videos;
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw new Error("Failed to fetch videos");
    }

}