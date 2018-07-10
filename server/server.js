const path=require('path');//built in path module t
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public')
const port=process.env.port || 3000
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var {generateMessage}=require('./Utils/message');
var {generateLocationMessage}=require('./Utils/message');

console.log(__dirname,'../public');
console.log(publicPath);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
   console.log('new user connected');
   socket.emit('newMessage',generateMessage( "Admin","Welcome to chat app"));
   socket.broadcast.emit('newMessage',generateMessage( "Admin","new user joined"));
 
   socket.on('createMessage',(message,callback)=>{
       console.log('got new message from client',message)
       //for broadcasting
       io.emit('newMessage',generateMessage( message.from,message.text))
       callback('this is from the server.'); 
   
   })
   socket.on('createLocationMessage',(coords)=>{
       io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude ,coords.longitude))
   })
   socket.on('disconnect',()=>{
       console.log('user disconnected');
   })
})

server.listen(port,()=>{
    console.log(`server is running on port ${port} `);
});