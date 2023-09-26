const express = require("express");
const { MongoClient } = require("mongodb");
const userRouter = express.Router();

//? CONNECTING TO THE DATABASE : Step 1
const client = new MongoClient(process.env.MONGO_URI);

userRouter.get("/", async (req, res) => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("test");
  const collection = db.collection("users");
  // export to csv file without using any external package
  res.json({ message: "Navigate To /export/csv for exporting CSV" , data: await collection.find({}).toArray()});
  // the following code examples can be pasted here...
  // res.send(await collection.find({}).toArray());
});

module.exports = userRouter;
