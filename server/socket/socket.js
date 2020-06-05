const { io } = require('../server')
const { Users } = require('../classes/Users')

const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (user, call) => {
        if (!user.name || !user.room) {
            return call({ message: 'Tha name/room is necessary', ok: false })
        }
        client.join(user.room);
        users.addPerson(client.id, user.name, user.room);
        client.broadcast.to(user.room).emit('in', {
            user: 'ADMIN', 
            message: `${user.name} has joined the chat.`,
            data: users.getPeoplebyRoom(user.room)
        })
        call(users.getPeoplebyRoom(user.room))
    })

    client.on('send', (data) => {
        let person = users.getPerson(client.id);
        client.broadcast.to(person.room).emit('send', {
            user: person.name,
            message: data.message,
            date: new Date().getTime()
        })
    })

    client.on('sendPrivate', (data) => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('sendPrivate', {
            user: person.name,
            message: data.message,
            date: new Date().getTime()
        })
    })

    client.on('disconnect', () => {
        let userLeft = users.removePerson(client.id);
        client.broadcast.to(userLeft.room).emit('out', {
            user: 'ADMIN',
            message: `${userLeft.name} has left the chat.`,
            data: users.getPeoplebyRoom(userLeft.room)
        })
    })


})

