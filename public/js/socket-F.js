var socket = io();
        socket.on('connect', function () {
            console.log('Server connected');
        })
        socket.on('disconnect', function () {
            console.log('Lost server connection');
        })

        socket.emit('data', {
            user: 'User1',
            message: 'GAAAAAAA'
        }, function(resp){
            console.log(resp);
        })

        socket.on('data', function (data) {
            console.log(data);
        })