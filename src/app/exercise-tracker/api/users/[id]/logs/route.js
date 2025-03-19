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
  // function to get the logs from the mongoDB
  async function getLogs(userID, filter){
    try{
        //connect to the database
        await client.connect();
        const db = client.db("exerciseTracker");
        const users = db.collection("users");
        //initialize the logs variable
        let logs = {}
        //call to the database to find a user by the userID and return the username and exercise log
        const response = await users.findOne({_id: new ObjectId(userID)}, {username: 1, log: 1});
        //determine if user exists
        if (!response){
            return {error: "User not found"}
        };
        //set the log object up properly
        logs.username = response.username;
        logs.count = response.log.length;
        logs._id = userID;
        //make sure all dates are date objects
        logs.log = response.log.map(log => ({
            ...log,
            date: new Date(log.date) // Convert all dates to Date objects
        }));
        //filter the dates based on the filter provided in the get request
        if(filter.to.exists === true){
            logs.log = logs.log.filter(log => new Date(log.date) <= new Date(filter.to.value));
        }
        if(filter.from.exists === true){
            logs.log = logs.log.filter(log => new Date(log.date) >= new Date(filter.from.value));
        }
        if(filter.limit.exists === true){
            logs.log = logs.log.slice(0, filter.limit.value);
        }
        //convert the dates to date strings for client processing
        logs.log.forEach(element => {
            element.date = new Date(element.date).toDateString();
        });
        //return the logs object
        return logs;
    }finally{
        //close the database connection
        client.close();
    }
  }
  export async function GET(req, { params }){
    //pull the id from the path params and the filters from the searchParams
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const limit = searchParams.get("limit");
    //create filter object to send to function
    const filter = {
        from: {
            exists: !!from,
            value: from
        },
        to: {
            exists: !!to,
            value: to
        },
        limit: {
            exists: !!limit,
            value: limit
        }
    };
    //get userInfo in the form of the logs object and return it in a JSON response
    const userInfo = await getLogs(id, filter);
    return Response.json(userInfo);
  };