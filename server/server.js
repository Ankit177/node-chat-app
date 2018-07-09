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
   socket.on('disconnect',()=>{
       console.log('user disconnected');
   })
})

server.listen(port,()=>{
    console.log(`server is running on port ${port} `);
});