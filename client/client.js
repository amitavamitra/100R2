server = "http://localhost:3000";
const socket = require('socket.io-client')(server);
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
// const { io } = require('socket.io-client');
const io = require('socket.io-client')(server);
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine' , 'ejs');

var name;

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.on('joining msg', (username) => {
        name = username;
        io.emit('chat message', `---${name} joined the chat---`);
    });
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
      io.emit('chat message', `---${name} left the chat---`);
      
    });
    socket.on('chat message', (msg) => {
      socket.broadcast.emit('chat message', msg);         //sending message to all except the sender
    });
  });


app.get('/',function(req,res){
    res.render('client');
})

app.post('/', function(req,res){
    var matkl = req.body.MATKL;
    var matyp = req.body.MATYP;
    var mbrsh = req.body.MBRSH;
    var meins = req.body.MEINS;
    var matkx = req.body.MATKX;
    var id = socket.id;
    console.log(id);
    // io.on("connection" , function(socket){
        socket.emit("SOCKET_1", { matyp, matkl, matkx, meins, mbrsh , id});
    // });
    
  });
  

app.listen(3001 , function(){
    console.log('Client listening at port 3001');
});
