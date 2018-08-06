const express = require("express");

const app = express();

//how middle ware works
app.use(function(req, res, next) {
  console.log(Date.now());
  req.name = "Shashi Kumar";
  next();
});

app.get("/", (req, res) => {
  console.log(req.name);

  res.send("<h1>Hi There</h1>");
});

app.get("/about", (req, res) => {
  res.send("Welcome to about");
});

const port = 3000;

app.listen(port, () => {
  console.log("Server started on port ", port);
});
