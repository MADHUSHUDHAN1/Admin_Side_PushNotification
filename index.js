const webpush = require("web-push");
//const fetch = require("node-fetch");
const express = require("express");
const https = require('https');
const port = process.env.PORT || 5000 ;
const server = https.createServer();


const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey);
// fetch('https://pushnotificationapi.herokuapp.com/user')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => console.log(err));
https.get('https://pushnotificationapi.herokuapp.com/user', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
    //console.log(data[0].endpoint);
     //data.forEach(element=> console.log(element));
    // for(let i=0; i<data.length; i++)
    // {
    //     console.log(data[i]);
    // }
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
   const obj = JSON.parse(data);
   for(let i in obj.user)
   {
    const payload = JSON.stringify({title: 'Push Test'});

    //Pass object into sendNotification
    webpush.sendNotification(obj.user[i].endpoint,payload).catch(err => console.error(err));
   //console.log(obj.user[i].endpoint);
   }
    //console.log(Object.keys(Object.keys(obj)[0])[1]);
    
   // console.log(jsonJSONstringfy(obj[0]));
   // console.log(JSON.parse(data));
    
    //console.log(obj[endpoint]);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

server.listen(port,console.log("app is running"));