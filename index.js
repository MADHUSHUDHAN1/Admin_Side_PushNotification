const webpush = require("web-push");
//const fetch = require("node-fetch");
const express = require("express");
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000 ;
//const server = http.createServer();
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey);
  

  app.post("/",function(req,res){

    const notifiTitle = req.body.titleNotification;
    const notifiDescription = req.body.descriptionNotification;

    https.get('https://pushnotificationapi.herokuapp.com/user', (resp) => {
      let data = '';
    
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
       
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
       const obj = JSON.parse(data);
       for(let i in obj.user)
       {
        const payload = JSON.stringify({title: notifiTitle,body: notifiDescription});
        //const notification = JSON.stringify({title:notifiTitle,options:{body:notifiDescription}})
        
        //Pass object into sendNotification
        webpush.sendNotification(obj.user[i].endpoint,payload).catch(err => console.error(err));
       //console.log(obj.user[i].endpoint);
       }
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
    


  });
// fetch('https://pushnotificationapi.herokuapp.com/user')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => console.log(err));

app.listen(port,console.log("app is running"));