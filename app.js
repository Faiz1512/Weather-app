const { constants } = require("buffer");
const { log } = require("console");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

const https = require("https");//this is a native module inside node just like fs

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ec58669f6ac57073e8decc0a42882e59&units=metric";
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);//parse is used to convert json file to objects and .stringify is used to convert objects into jason file
            const icon = weatherData.weather[0].icon;
            res.write("<p>The weather is currently "+weatherData.weather[0].description +" </p>");
            res.write("<h1>The temperatue in "+city+" is "+weatherData.main.temp+"degree celcius<h1>");
            res.write("<img src='https://openweathermap.org/img/wn/"+icon+"@2x.png'>")
            res.send();
        })
    })
})


app.listen(3000,()=>{
   console.log("Server is running on port 3000");
})

/*
Here we are first loading our server on localhost 3000 using listen then we are using get to upload our response when client
tries to visit our server, then we use https to get our data from weather api 
then we convert the data into an oject and print whatever we want
https.get() → Native Node.js HTTP Request (Client Side)
Used to make an HTTP GET request to an external API (like OpenWeather).
Works as an HTTP client inside your Node.js app.
Retrieves data from an external server.
app.get() → Express Route Handler (Server Side)
Used in Express.js to define a route for handling HTTP GET requests.
It listens for client requests (e.g., when someone visits / in the browser).
Runs a callback function when a request is received.
 */