const express = require("express");
const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");
const userCSVRouter = express.Router();

//? CONNECTING TO THE DATABASE: Step 1
const client = new MongoClient(process.env.MONGO_URI);

userCSVRouter.get("/export/csv", async (req, res) => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to the server");
  const db = client.db("test");
  const collection = db.collection("users");

  // Export data to CSV file
  try {
    const data = await collection.find({}).toArray();
    if (data.length === 0) {
      return res.status(404).send("No data to export.");
    }

    // Create a CSV string with SL/No, headers, and data
    let csv = "SL/No,Name,Email,Phone,Role,Created At,Address,City,State,Country\n";
    data.forEach((user, index) => {
      csv += `${index + 1},${user.name},${user.email},${user.mobile.phone},${user.role},${user.createdAt},${user.address},${user.city},${user.state},${user.country}\n`;
    });

    // Define the file path
    const filePath = path.join(__dirname, "users.csv");

    // Write the CSV data to a file
    fs.writeFileSync(filePath, csv);

    // Set the response headers for downloading the file
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    // Send the file for download
    res.sendFile(filePath, {}, (err) => {
      if (err) {
        console.error("Error sending file: ", err);
        res.status(500).send("Error exporting data.");
      } else {
        console.log("File sent successfully.");
        // Delete the CSV file after sending
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error("Error exporting data: ", error);
    res.status(500).send("Error exporting data.");
  }
});

module.exports = userCSVRouter;
