const express = require("express");
var bodyParser= require('body-parser');

const app = express();

app.use(express.static(__dirname+"/public"));
const server= app.listen(1337);
const io = require('socket.io')(server)
var counter =0;

io.on('connection',function(socket){

    socket.emit('greeting',{msg:"Greetings, from server Node"});
    socket.on('thankyou',function(data){
        
        console.log(data.msg);
    });

    socket.on('clkBtn',function(data){
        console.log(data.msg)
        socket.emit('resOnBtn',{msg:"thanks for clicking From server "});

    })

    socket.on('messege',function(data){
        console.log(data)
        dic="You Omitted the following information to the server: ";
        dic+=JSON.stringify(data);
        lNum=Math.floor(Math.random() * 1000) 
        dic+="<br>Your lucky number by the server is: "+lNum;

        socket.broadcast.emit("resMsg",dic);

    })

    
    
    

});

