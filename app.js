const express = require("express");
/*https module for get request to external server*/ 
const https = require("https");                          /*No need to install https through npm as https is native node module, which is already bundled with Node project*/
const { url } = require("inspector");
const { response } = require("express");
const app = express();


app.get("/",function(req,res){

    /*res.send("yuhu");*/

    /*external server*/ const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=95a306308382136de82813f289e152f1&units=metric"

    https.get(url,function(response){
          /*console.log(response);*/                                  /*to log entire reponse*/

          /*console.log(response.statusCode);  */                         /*to log only the statuscodefrom the reponse*/
          
          /*parsing the response*/
          response.on("data",function(data){

              /*console.log(data);    /*will give response in hexadecimal format*/

               /*To convert hexadecimal to javascript object*/

               const weatherData = JSON.parse(data);                /*weatherData is Javascript object*/
               /*console.log(weatherData);                    /*will give data as javascript object*/

               /*to convert javascript object to string*/

             /*  const object = {
                   name :"Srishti",
                   favouriteColour: "green"
               }

                 const details = JSON.stringify(object);          will convert javascript object to string*/

                 /*console.log(details); */

                 /*To get specific data from JSON like temp*/

                 const temp = weatherData.main.temp;      /*digging in javascript object to get the temp*/
                 console.log(temp);

                 const weatherDescription = weatherData.weather[0].description;         /*digging in javascript object to get the description*/
                 console.log(weatherDescription);

                 const icon = weatherData.weather[0].icon;                               /*to get icon details*/

                 const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";     /*using the icon value in url to get corresponding image*/

                 /*Rendering result on website*/
                 res.write("<p>The description is as follows "+ weatherDescription +"<p>");       /*using write instead of send as in one app method can have only one send and multiple writ*/
                 res.write("<h1>The temperature in London is "+temp +"degree celsius</h1>");
                 /*rendering image as per the weather condition*/
                 res.write("<img src = "+imageUrl+">");          
                 res.send();
                 
          })

    });

})


app.listen(3000,function(){
    console.log("Server started on port 3000");
})