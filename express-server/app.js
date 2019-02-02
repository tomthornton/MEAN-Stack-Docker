const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const Password = require("./models/password");

function startServer(){
  mongoose
    .connect(
      'mongodb://mongodb:27017/admin',
      { useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE
      }
    )
    .then(
      () => { console.log('Database is connected!')},
      err => { startServer();}
    );
}

startServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/passwords", (req, res, next) => {
  const post = new Password({
    website: req.body.website,
    description: req.body.description,
    URL: req.body.URL,
    username: req.body.username,
    password: req.body.password,
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Password added successfully",
      postId: createdPost._id
    });
  });
});

app.put("/api/passwords", (req, res, next) => {
  const post = ({
    website: req.body.website,
    description: req.body.description,
    URL: req.body.URL,
    username: req.body.username,
    password: req.body.password,
  });
  console.log(post)
  console.log(req.body);
  Password.findOneAndUpdate({_id: req.body.id}, post, function(err, doc){
    if (err) return res.status(500).send({ message: err , postId: req.body._id});
    return res.status(201).send({message: 'successfully saved!', postId: req.body._id});
});
});

app.get("/api/passwords", (req, res, next) => {
  Password.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      passwords: documents
    });
  });
});

app.delete("/api/passwords/:id", (req, res, next) => {
  console.log(req.params)
  Password.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Password deleted!" });
  });
});

module.exports = app;
