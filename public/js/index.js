var socket= io();
socket.on('connect',function(){
    console.log('connected to server');
    
});
socket.on('disconnect',function(){
    console.log('disconnected from server')
});

socket.on('newMessage',function(message){
    console.log('got new message',message)
    var li=jQuery('<li></li>');
    li.text(`${message.from} :${message.text}`);

    jQuery('#messages').append(li)
})

jQuery('#message_form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(){

    })
})