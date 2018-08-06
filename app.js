const express = require("express");

const app = express();
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
//connect to mongodb
let uri = "mongodb://localhost/vidjot-dev";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch(err =>
    console.log(err)
  );

//Load Idea Model
require('./models/Idea');

const idea = mongoose.model('ideas');

//Handlebar template engine middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser middleware - to parse incoming request bodies 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  const title = "Welcome to VidJot";
  res.render("index", {
    title: title
  });
});

//Add idea form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add')
})

//Process form
app.post('/ideas/', (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: 'please add a title' })
  }
  if (!req.body.details) {
    errors.push({ text: 'please add a details' })
  }

  if (errors.length > 0) {
    console.log("Errpr", errors);

    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    res.send("Passed")
  }
})

app.get("/about", (req, res) => {
  res.render("about");
});

const port = 3000;

app.listen(port, () => {
  console.log("Server started on port ", port);
});
