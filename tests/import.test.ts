import {connectToDatabase,disconnectFromDatabase} from "../lib/mongodb";
import { Collection, Db, Document, MongoClient, ObjectId } from 'mongodb';



import pages from './data/video_feed_crawler.pages.json'; // Local JSON import
import videos from './data/video_feed_crawler.videos.json'; // Local JSON import

import Video from "../models/Video";

import Page from "../models/Page";


beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

describe('MongoDB Import Test', () => {
  it('should import videos JSON data into MongoDB', async () => {

    await Video.deleteMany({});
    console.log(videos)

    // Loop through the videos array and create a new video document for each item
    for (let video of videos) {
      const { _id, title, img, created_at } = video;

      // Create a new video document
      const newVideo = new Video({
        _id:_id,
        title:title,
        img:img,
        created_at: new Date(created_at["$date"])
      });

      // Save the new video to the database
      await newVideo.save();
      console.log('Video inserted:', _id, title);
    }
    
    console.log('All videos have been inserted!');

    // Retrieve all videos from the database
    const videos_inserted = await Video.find(); // Finds all documents in the Video collection

    expect(videos_inserted.length).toBe(videos.length);
  });

  it('should import pages JSON data into MongoDB', async () => {
// Clear the Page collection
await Page.deleteMany({});
console.log(pages);

// Loop through the pages array and create a new page document for each item
for (let page of pages) {
  const { _id, title, url, created_at } = page;

  // Create a new page document
  const newPage = new Page({
    title:title,
    url:url,
    created_at: new Date(created_at["$date"]),
  });

  // Save the new page to the database
  await newPage.save();
  console.log("Page inserted:", _id, title);
}

console.log("All pages have been inserted!");

// Retrieve all pages from the database
const pagesInserted = await Page.find(); // Finds all documents in the Page collection
expect(pagesInserted.length).toBe(pages.length);
  });
});
