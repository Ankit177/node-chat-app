var socket= io();
socket.on('connect',function(){
    console.log('connected to server');
    socket.emit('createEmail',{
        to:'sagjain@xxx.com',
        text:'hi this is ankit'
    })
    socket.emit('newMessage',{
        from:"sagar",
        text:"please fill jira"
    })
});
socket.on('disconnect',function(){
    console.log('disconnected from server')
});

socket.on('newEmail',function(email){
    console.log('new Email',email)
});
socket.on('newMessage',function(message){
    console.log('got new message',message)
})