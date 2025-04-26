const MONGODB_URI = process.env.MONGODB_URI || "=mongodb://localhost:27017/";

console.log("MONGODB_URI: ", MONGODB_URI);

const DATABASE = process.env.DATABASE || "video_feed_crawler";

console.log("DATABASE: ", DATABASE);

// MongoDB connection string
const MONGO_URI = MONGODB_URI + DATABASE; // Replace with your MongoDB connection string

import mongoose from "mongoose";


const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};  

export async function connectToDatabase() {  
    if (!MONGO_URI) {  
        throw new Error('Please define the MONGO_URI environment variable inside .env.local');  
    }  
    if (cached.connection) {  
        return cached.connection;  
    }  
    if (!cached.promise) {  
        const opts = {  
            bufferCommands: false,  
        };  
        cached.promise = mongoose.connect(MONGO_URI, opts);  
    }  
    try {  
        cached.connection = await cached.promise;  
    } catch (e) {  
        cached.promise = undefined;  
        throw e;  
    }  
    return cached.connection;  
}  

// Function to disconnect from the database
export async function disconnectFromDatabase() {
    if (cached.connection) {
      await mongoose.disconnect();
      cached.connection;
      console.log("MongoDB connection closed.");
    } else {
      console.log("No active MongoDB connection to close.");
    }
  }