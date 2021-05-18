// require necessary modules
const express = require('express');
// const rfcClient = require('node-rfc').Client;
const bodyParser = require('body-parser');
const ejs   = require('ejs');
const http = require('http');
const app  = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');
// var abapConnection = require("./abapconnection.js");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' ,'ejs');

var responseFromPi = ""; // variable to store emitted response from pi
var socketID=""; // variable to store the unique socketID
var arrayOfResponse = [];
var port = process.env.PORT; // Whatever port Heroku might assign

if (port == null || port == "") { // what if it doesnt.. 
    port = "3000"; // home is the place to be @ localhost:3000
}

server.listen(port,function(){
    console.log('Server listening at port 3000 and/Heroku port');
});

// server-side 





io.on("connection" , function(socket){
    console.log(socket.id);
    socketID = socket.id;
    socket.on("SOCKET_1" , function(arg){
       console.log(arg);// arg = whatever client has emitted. 
    //   array destructuring.
    responseFromPi = arg;
        
    //    arrayOfResponse.push(arg); // needs array based on application

//Manual Control as of now using app.post
// app.post('/' , function(req,res){

                // client.close();

});
});

// Lets get the messages from PI onto the view
app.get('/' , function(req,res){

// var matkl = req.body.MATKL;
// var matyp = req.body.MATYP;
// var mbrsh = req.body.MBRSH;
// var meins = req.body.MEINS;
// var matkx = req.body.MATKX;
// var id = socket.id;

// socket.emit("SOCKET_1", { matyp, matkl, matkx, meins, mbrsh , id});
    res.render('home', {socketID:socketID , responseFromPi:responseFromPi});
});