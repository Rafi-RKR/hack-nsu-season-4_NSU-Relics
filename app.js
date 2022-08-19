const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/login.html")
})

// const CLIENT_ID = "213809152009-7vn8fefmtfr6kb7baguf8umqoqq5o8gl.apps.googleusercontent.com";

// const clientAuth = require('google-auth-library');
// const client = new clientAuth(CLIENT_ID);
// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If request specified a G Suite domain:
//   // const domain = payload['hd'];
// }
// verify().catch(console.error);






app.listen(3000, function(){
    console.log("Server Running...");
})