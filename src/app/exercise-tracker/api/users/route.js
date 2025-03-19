const { MongoClient, ServerApiVersion } = require("mongodb");
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// function to create a user in the database if one does not exist
async function createUser(username) {
  try {
    //connect to DB
    await client.connect();
    const db = client.db("exerciseTracker");
    const users = db.collection("users");
    // check if user exists and return the _id if so
    const existingUser = await users.findOne({ username: username });
    if(existingUser){
     return existingUser._id;
    }
  //if user doesnt exists script continues, inserting the user and a blank log, ID is generated in the DB
  const result = await users.insertOne({
    username: username,
    log: [],
  });
  console.log("User created with _id:", result.insertedId);
  //return the userID
  return result.insertedId;
  } finally {
    await client.close();
  }
}
//function to get all users in the DB
async function getUsers() {
  try {
    //connect to DB
    await client.connect();
    const db = client.db("exerciseTracker");
    const users = db.collection("users");
    //find all users and print their _id and username
    const result = await users.find({}, { _id: 1, username: 1, log: 0 }).toArray();
    //return the result of the query
    return result;
  } finally {
    await client.close();
  }
}
export async function GET(req) {
  //call getUsers and return the users found
  const users = await getUsers();
  return Response.json(users);
}

export async function POST(req) {
  //get form data from POST request and parse the username from it
  const formData = await req.formData();
  const username = formData.get("username");
  //get the userID requested by calling the createUser() script on the parsed username
  const user = await createUser(username);
  //return the user _id and username in JSON format for client side use
  return Response.json({ _id: user, username: username });
}
