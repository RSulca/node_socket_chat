var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('name') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('The name/room is necessary')
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function () {
    console.log('Server connected');
    socket.emit('enterChat', user, function(resp){
        console.log(resp);
    })
})

socket.on('out', (data)=>{
    console.log('Server',data);
})

socket.on('in', (data)=>{
    console.log('Server',data);
})

socket.on('send', (data)=>{
    console.log(data);
})

socket.on('sendPrivate', (data)=>{
    console.log('Private message', data);
})