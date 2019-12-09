//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const app=express();



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.listen(3000,function(){
  console.log("Listening in port 3000");
});
