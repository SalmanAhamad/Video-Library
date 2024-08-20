var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var conStr = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Home</h2>");
});

app.get("/categories", (req, res) => {
  mongoClient.connect(conStr).then((clientObj) => {
    var database = clientObj.db("reactdb");
    database
      .collection("tblcategories")
      .find({})
      .toArray()
      .then((docs) => {
        res.send(docs);
        res.end();
      });
  });
});

app.post("/addvideo", (req, res) => {
  res.send("Inserts a new video into Video Library");
});

app.post("/addcategory", (req, res) => {
  var category = {
    Category_Id: parseInt(req.body.Category_Id),
    CategoryName: req.body.CategoryName,
  };
  mongoClient.connect(conStr).then((clientObj) => {
    var database = clientObj.db("reactdb");
    database
      .collection("tblcategories")
      .insertOne(category)
      .then(() => {
        console.log(`Record Inserted..`);
        res.redirect("/categories");
      });
  });
});

app.put("/updatevideo/:id", (req, res) => {
  res.send(`Updating Video with Id=${req.params.id}`);
});

app.delete("/deletevideo/:id", (req, res) => {
  res.send(`Deleted Video with Id = ${req.params.id}`);
});

app.listen(5000);
console.log(`Server Started : http://127.0.0.1:5000`);
