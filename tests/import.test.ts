import {pagesCollection, videosCollection , getDb , client} from "../lib/mongodb";
import { Collection, Db, Document, MongoClient, ObjectId } from 'mongodb';



import pages from './data/video_feed_crawler.pages.json'; // Local JSON import
import videos from './data/video_feed_crawler.videos.json'; // Local JSON import






export interface PageEntry {
  _id: ObjectId,
  title: string;
  url: string;
  site: number;
  cat: number;
  created_at: Date;
}

export function convertJsonToPageEntry(raw: any): PageEntry {
  return {
    _id: new ObjectId(raw._id.$oid),
    title: raw.title,
    url: raw.url,
    site: raw.site,
    cat: raw.cat,
    created_at: new Date(raw.created_at.$date),
  };
}




export interface VideoEntry {
  _id: string; // or you can use ObjectId if needed, but seems it's just a string
  title: string;
  img: string;
  site: number;
  cat: number;
  created_at: Date;
}

export function convertJsonToVideoEntry(raw: any): VideoEntry {
  return {
    _id: raw._id,
    title: raw.title,
    img: raw.img,
    site: raw.site,
    cat: raw.cat,
    created_at: new Date(raw.created_at.$date),
  };
}


beforeAll(async () => {
await getDb();
});

afterAll(async () => {
  await client.close();
});

describe('MongoDB Import Test', () => {
  it('should import videos JSON data into MongoDB', async () => {
    await videosCollection.deleteMany({});
    const jsonData = videos.map(convertJsonToVideoEntry);
    const result = await videosCollection.insertMany(jsonData);
    expect(result.insertedCount).toBe(jsonData.length);
  });

  it('should import pages JSON data into MongoDB', async () => {
    await pagesCollection.deleteMany({});
    const jsonData = pages.map(convertJsonToPageEntry);
    const result = await pagesCollection.insertMany(jsonData);
    expect(result.insertedCount).toBe(jsonData.length);
  });
});
