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
socket.on('newLocationMessage',function(loc){
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My current Location</a>');
    li.text(`${loc.from}: `);
    a.attr('href',loc.url);
    li.append(a);
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

var locButton=jQuery('#send_loc');
locButton.on('click',function(){
    if(!navigator.geolocation){
      return alert('geolocation not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position)
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },function(){
        alert('unable to fetch location')
    })
})