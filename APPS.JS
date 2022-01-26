const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
var prompt = require('prompt');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('static'))
//prompt.start();
//prompt.get(['p', 'r']);
//
// Log the results.
//
//const prompts = require('prompts');
//
// const questions = [
//   {
//     type: 'text',
//     name: 'p',
//     message: 'enter state name?'
//   },
//
// {
//   type: 'text',
//   name: 'r',
//   message: 'enter country code'
// }
//
// ]
// (async () => {
//   const response = await prompts(questions);
// })();
//var p=prompt('enter the state first');
//var r=prompt("enter the country code like ind for india , uk for united kingdom");
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});


app.post("/", function(req, res) {
      const p = req.body.cityName;
      const r = req.body.stateCode;
      console.log("post recieved");
      console.log(req.body.cityName);
      https.get("https://api.openweathermap.org/data/2.5/weather?q="+p+","+r+"&units=metric&appid=b2f934be5d3e4e564e5c407abfdefb21", function(response) {
        //  console.log(response);
        //  res.send("server is up and running");
        console.log(response.statusCode);
        response.on("data", function(data) {
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.feels_like;
          // const object={
          //   name:shruti,
          //   love:ayuu
          // }
          console.log(`temperature in ${p} , ${r}` + temp);
          //res.send(temp);
          const weatherDescription = weatherData.weather[0].description;
          //const icon = weatherData.weather[0].icon;
          var icon = "<img src='http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png'>";
          const imageURL = "https://openweathermap.org/img/wn/" + icon + "@6x.png";
          console.log(weatherDescription);
        //  res.write("<h1>The temperature in " + cityName + " is " + temp + " degrees Celcius</h1>");

       res.send(`<h1>weather conditions :</h1><br>temperature is : ` + temp + `<br>`+`weather is :` + weatherDescription + "<br>"+icon);
        })
      })
    })
      app.listen(3000, function() {
        console.log("server is running at port 3000")
      })
