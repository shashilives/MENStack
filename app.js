const express = require("express");

const app = express();
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

//connect to mongodb
let uri = "mongodb://localhost/vidjot-dev";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch(err =>
    console.log(err)
  );

//Handlebar template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const title = "Welcome to VidJot";
  res.render("index", {
    title: title
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

const port = 3000;

app.listen(port, () => {
  console.log("Server started on port ", port);
});
