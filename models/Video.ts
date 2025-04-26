// models/Video.ts
import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the Video document
interface IVideo extends Document {
  _id:  string;
  title: string;
  img: string;
  site: number;
  cat: number;
  created_at: Date;
}

// Define the schema for the Video model
const VideoSchema = new Schema<IVideo>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
  site: { type: Number, default: 0 },
  cat: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

// Create or get the model
const Video = mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
