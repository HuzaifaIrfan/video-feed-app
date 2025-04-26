"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Page from "../../models/Page";

import { checkPassword } from "./checkPassword";
import { Types } from "mongoose";



interface Page {
  title: string;
  url: string;
  created_at: Date;
}

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


  try {

    await connectToDatabase();

    // Create a new page object using the provided data
    const jsonData = {
      title: title,
      url: url,
      created_at: new Date(), // Set the current date as created_at
    };

    // Create a new instance of the Page model with the data
    const newPage = new Page(jsonData);

    // Save the new page to the database
    const result = await newPage.save();

    // Return success with the inserted page's ID
    return { success: true, id: result._id.toString() };
  } catch (error) {
    console.error("Error adding page:", error);
    return { success: false, error: "Database error" }; // Return failure if an error occurs
  }


}



export async function getPages() {



  try {
    await connectToDatabase();
    // Retrieve pages from the Page collection, sorted by created_at in descending order
    const pages = await Page.find({}) // No filtering, get all pages
      .sort({ created_at: -1 }); // Sort by created_at in descending order (most recent first)

    // Map the pages to return the desired structure
    const results = pages.map((page) => ({
      _id: page._id.toString(), // Convert ObjectId to string
      title: page.title,
      url: page.url,
    }));

    return {
      success: true,
      pages: results, // Return the mapped results
    };
  } catch (error) {
    console.error("Error fetching pages:", error);
    return { success: false,pages:[]}; // Return failure if an error occurs
  }
}


export async function deletePage({ id, password }: { id: string; password: string }) {
  if (! await checkPassword(password)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectToDatabase();
    // Convert the string ID to an ObjectId (Mongoose expects ObjectId for _id field)
    const objectId = new Types.ObjectId(id);

    // Delete the page from the database
    const result = await Page.deleteOne({ _id: objectId });

    // Check if a page was deleted
    if (result.deletedCount === 0) {
      return { success: false, error: "Page not found" }; // No page was deleted
    }

    return { success: true }; // Successfully deleted
  } catch (error) {
    console.error("Error deleting page:", error);
    return { success: false, error: "Database error" }; // Error handling
  }
}