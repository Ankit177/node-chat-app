const path=require('path');//built in path module t
const express=require('express');
const publicPath=path.join(__dirname,'../public')
const port=process.env.port || 3000
var app=express();
console.log(__dirname,'../public');
console.log(publicPath);


app.use(express.static(publicPath));

app.listen(port,()=>{
    console.log(`server is running on port ${port} `);
});