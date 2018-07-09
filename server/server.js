const path=require('path');//built in path module t
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');


const publicPath=path.join(__dirname,'../public')

const port=process.env.port || 3000
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
console.log(__dirname,'../public');
console.log(publicPath);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
   console.log('new user connected');
    socket.emit('newEmail',{
        from:'ankit',
        text:'hey what is going on',
        'createdAt':123

    });
   socket.emit('newMessage',{
       from:'Ankit',
       text:'whats up',
       createdAt:123
   }) 
   socket.on('createEmail',(newEmail)=>{
       console.log('createEmail',newEmail);
   })
   socket.on('newMessage',(message)=>{
       console.log('got new message from client',message)
   })
   socket.on('disconnect',()=>{
       console.log('user disconnected');
   })
})

server.listen(port,()=>{
    console.log(`server is running on port ${port} `);
});