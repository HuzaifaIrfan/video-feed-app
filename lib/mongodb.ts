import { Collection, Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Add MONGODB_URI to .env.local");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

let db: Db;
let videosCollection: Collection<Document>
let pagesCollection: Collection<Document>


const initDb = async () => {
  client = await clientPromise;
  db = client.db('video_feed_crawler');  // Database name
  videosCollection = db.collection('videos'); // Videos collection
  pagesCollection = db.collection('pages');  // Pages collection
};

// Ensure the DB is initialized before accessing
const getDb = async () => {
  if (!db) {
    await initDb();  // Initialize DB if not done already
  }
  return db;
};


export { videosCollection, pagesCollection, getDb, client};