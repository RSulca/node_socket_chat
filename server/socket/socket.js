const {io} = require('../server')

io.on('connection', (client) => {
    console.log('User connected')
    client.emit('data', {
        user: 'ADMIN',
        message: 'Welcome to NextJS'
    })
    client.on('disconnect', () => {
        console.log('User disconnected')
    })
    client.on('data', (data, call) => {
        console.log(data);   
        client.broadcast.emit('data', data);
        // if (data.user) {
        //     call({
        //         resp: 'Todo ok'
        //     })
        // } else {
        //     call({
        //         resp: 'Todo mal'
        //     })
        // }
    })
})

