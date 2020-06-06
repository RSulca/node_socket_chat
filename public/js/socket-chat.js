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
        renderUsers(resp);
        // console.log(resp);
    })
})

socket.on('out', (data)=>{
    renderUsers(data.data);
    renderMessage(data, false, false);
    // console.log('Server',data);
})

socket.on('in', (data)=>{
    renderUsers(data.data);
    renderMessage(data, false,true);
    // console.log('Server',data);
})

socket.on('send', (data)=>{
    console.log(data);
    renderMessage(data, false);
    scrollBottom();
    var audio = new Audio('../assets/audio/tono.mp3');
    audio.play();
})

socket.on('sendPrivate', (data)=>{
    console.log('Private message', data);
})