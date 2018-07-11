var socket= io();

function scrollToBottom(){
     //selectors
    var messages= jQuery('#messages');
    var newMessage=messages.children('li:last-child');
    //heights
    var clientHeight=messages.prop('clientHeight');
    var scrollTop=messages.prop('scrollTop');
    var scrollHeight=messages.prop('scrollHeight');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        //console.log('should scroll')
        messages.scrollTop(scrollHeight)
    }
}
socket.on('connect',function(){
    //console.log('connected to server');
    var params=jQuery.deparam(window.location.search);
    socket.emit('join',params,function(err){
        if(err){
            alert(err)
            window.location.href='/'
        }
        else{
           console.log('no error')
        }

    })
    
});
socket.on('disconnect',function(){
    console.log('disconnected from server')
});
socket.on('updateUserList',function(users){
   var ol=jQuery('<ol></ol>');
   users.forEach(function(user){
       ol.append(jQuery('<li></li>').text(user))
   })
   jQuery('#users').html(ol)
})

socket.on('newMessage',function(message){

    var formattedTime=moment(message.createdAt).format('h:mm a')
    var template=jQuery('#message_template').html();
    var html=Mustache.render(template,{
       text: message.text,
       from:message.from,
       createdAt:formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom();
    
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
    scrollToBottom();
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