const express=require("express");
const https=require("https");
const app=express();
app.get("/",function(request,response){
  response.send("<h1>huii</h1><h2>buiii</h2>");
  console.log(request);
});
app.get("/contact",function(req,res){
  res.send("<h3>ooooookkkkk</h3>");
});
app.get("/about",function(req,res){
  res.send("<h3>shrutuuuuu</h3>");
});
app.listen(3000,function(){
  console.log("server statred");
})
