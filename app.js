//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require("fs");
let rawdata = fs.readFileSync(path.resolve(__dirname, "./public/data.json"));

<<<<<<< HEAD
let data = JSON.parse(rawdata);
data = data["services offered"];
console.log(data);
=======


>>>>>>> b235be341c512ce5c90d38cc8680e246b0167f45

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});



<<<<<<< HEAD
app.post("/getElement", function (req, res) {
  let array = JSON.parse(req.body.flow);
  let data = JSON.parse(rawdata)["services offered"];
=======

app.post("/getElement",function(req,res){
  let array=JSON.parse(req.body.flow);
  let data=JSON.parse(rawdata)["services offered"];
>>>>>>> b235be341c512ce5c90d38cc8680e246b0167f45
  console.log(data);
  for (var i = 0; i < array.length; i++) {
    data = data["flow"][array[i]];

  }
  res.send(data);
});

app.listen(3000, function () {
  console.log("Listening in port 3000");
});