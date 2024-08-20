var express = require("express");
var mongoClient = require("mongodb").MongoClient;

var conStr = "mongodb://127.0.0.1:27017";

var app = express();

app.get("/", (req, res) => {
  res.send(`
       <h2>Home</h2>  
       <a href='/users'>Users</a> |
       <a href='/admin'>Admin</a> |
       <a href='/videos'>Videos</a>
    `);
});

app.get("/users", (req, res) => {
  res.send("<h2>Users Home</h2><p>Users Module - Can watch Videos</p>");
});

app.get("/admin", (req, res) => {
  res.send(
    "<h2>Admin Home </h2><p>Admin Module - Can add, edit, remove videos..</p>"
  );
});

app.get("/videos", (req, res) => {
  res.send([
    { id: 1, title: "React JS" },
    { id: 2, title: "Angular 16" },
  ]);
});

app.get("/details/:id/:title", (req, res) => {
  res.send(`
        <h2>Video Details</h2>
        Video Id : ${req.params.id} <br>
        Title    : ${req.params.title}
    `);
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

app.get("/category/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoClient.connect(conStr).then((clientObj) => {
    var database = clientObj.db("reactdb");
    database
      .collection("tblcategories")
      .find({ Category_Id: id })
      .toArray()
      .then((docs) => {
        res.send(docs);
        res.end();
      });
  });
});

app.get("*", (req, res) => {
  res.send("<h2>Not Found</h2><code>404 : Requested path not found</code>");
});

app.listen(4000);
console.log(`Server Started : http://127.0.0.1:4000`);
