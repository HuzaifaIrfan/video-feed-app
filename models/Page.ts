// models/Pages.ts
import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the Page document
interface IPage extends Document {
  title: string;
  url: string;
  site: number;
  cat: number;
  created_at: Date;
}

// Define the schema for the Page model
const PageSchema = new Schema<IPage>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  site: { type: Number, default: 0 },
  cat: { type: Number, default: 0},
  created_at: { type: Date, default: Date.now },
});

// Create or get the model
const Page = mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);

export default Page;
