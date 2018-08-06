const express = require("express");

const app = express();
const exphbs = require("express-handlebars");

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
