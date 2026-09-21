import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/velora";
const options = {
  serverSelectionTimeoutMS: 3000,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClient = client;
    global._mongoClientPromise = client.connect().catch((err) => {
      console.warn("MongoDB client connect warning:", err.message);
      return client;
    });
  }
  client = global._mongoClient;
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((err) => {
    console.warn("MongoDB client connect warning:", err.message);
    return client;
  });
}

export { clientPromise };
export default client;
