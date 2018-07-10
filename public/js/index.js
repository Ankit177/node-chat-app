var socket= io();
socket.on('connect',function(){
    console.log('connected to server');
    
});
socket.on('disconnect',function(){
    console.log('disconnected from server')
});

socket.on('newMessage',function(message){

    var formattedTime=moment(message.createdAt).format('h:mm a')
    var template=jQuery('#message_template').html();
    var html=Mustache.render(template,{
       text: message.text,
       from:message.from,
       createdAt:formattedTime
    })
    jQuery('#messages').append(html)
    
})
socket.on('newLocationMessage',function(loc){
    console.log(loc.from)
    var formattedTime=moment(loc.createdAt).format('h:mm a')
    var template=jQuery('#location_message_template').html();
    var html=Mustache.render(template,{
        from:loc.from,
        url:loc.url,
        createdAt:formattedTime
    })
    jQuery('#messages').append(html)
})
jQuery('#message_form').on('submit',function(e){
    e.preventDefault();
    var messageTextBox=jQuery('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    },function(){
       messageTextBox.val('')
    })
})

var locButton=jQuery('#send_loc');
locButton.on('click',function(){
    if(!navigator.geolocation){
      return alert('geolocation not supported by your browser')
    }
    locButton.attr('disabled','disabled').text('Sending Location...')
    navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position)
        locButton.removeAttr('disabled').text('Send Location')
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },function(){
        locButton.removeAttr('disabled')
        alert('unable to fetch location')
    })
})