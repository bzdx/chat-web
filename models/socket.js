const socket = require('socket.io')
const CONF = require('../conf/conf')
const DBModel = require('./db')
let msgDB = new DBModel(CONF.db.name, CONF.db.collection.message)

module.exports = function (server) {
    const io = socket(server, {origins:'*'});
    // console.log(io)
    io.on('connect', (sock)=>{
        sock.on('server-message', (msg)=>{
            console.log(msg)
            msgDB.insertOne(msg)
            io.emit('client-message', msg)
        })
    })
    io.on('disconnect', ()=>{
        console.log('dis!')
    })
}