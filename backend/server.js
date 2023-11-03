require("dotenv").config(); // library to handle .env files

const express = require("express");

//start the express server
const app = express();

//Middleware (logs the request coming in)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Route handler
app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

//listen for requests
app.listen(process.env.PORT, () => {
  console.log("Listening on port 4000!!");
});
