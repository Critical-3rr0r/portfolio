const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  //function to call to DB and add an exercise to a given userID
  async function addExercise(userId, description, duration, date){
    try{
        //connect to DB
        await client.connect();
        const db = client.db("exerciseTracker");
        const users = db.collection("users");
        //find and update based on userID
        const result = await users.findOneAndUpdate(
            {_id: new ObjectId(userId)},
            { $push: { log: {description: description, duration: duration, date: date}}},
            { returnDocument: "after" }
        );
        //get username of user and return it for JSON output
        const username = await users.findOne({_id: new ObjectId(userId)}, {_id: 0, username: 1, log: 0})
        return username;
    }finally{
        //close connection to DB
        await client.close();
    }
  }
  function addCorsHeaders(response) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }
export async function POST(req, { params }){
    //pull the id from the path params
    const { id } = await params;
    //grab the form data from the request
    const formData = await req.formData();
    //parse the form data to get variables needed to be posted
    const description = formData.get("description");
    const duration = Number(formData.get("duration"));
    const date = formData.get("date") ? formData.get("date") : new Date();
    //post the variables and get the username from the return
    const username = await addExercise(id, description, duration, date);
    //return a JSON response including all data gathered
    let response = Response.json({
      username: username.username,
      description: description,
      duration: duration,
      date: new Date(date)?.toDateString(),
      _id: id
    });
    return addCorsHeaders(response);
}
export async function OPTIONS() {
  return addCorsHeaders(new Response(null, { status: 204 }));
}