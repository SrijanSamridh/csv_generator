//? IMPORTS FROM PACKAGES  : Step 1
const express = require("express");
const dotenv = require("dotenv");

//? INITIALIZING THE SERVER : Step 2
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.MONGO_URI;

//? MIDDLEWARES & routes : Step 3
const userRouter = require("./router/getUser");
const getCsvRouter = require("./router/getCsv");

app
  .set("x-powered-by", false)
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(userRouter)
  .use(getCsvRouter);

//? STARTING THE SERVER : Step 4
app.listen(PORT, "0.0.0.0", () => {
  console.log(`
      ******************************************
  
          Server  Connected at port ${PORT}
          Visit - http://localhost:${PORT}
  
      ******************************************`);
});
