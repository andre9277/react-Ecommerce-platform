require("dotenv").config(); // library to handle .env files

const express = require("express");

const mongoose = require("mongoose");
//adds the routes of the items
const itemsRoutes = require("./routes/items");

//start the express server
const app = express();

//Middleware (logs the request coming in)

//allows to use body of the post request for example
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Route handler
//attach all the routes to the app. 1ºparameter with the path
app.use("/api/items", itemsRoutes);

//connect to db (assync, returns a promise)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & Listening on port 4000!!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
