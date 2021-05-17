module.exports = {
    dev: true,
    server: {
        ip: '0.0.0.0',
        port: 8040
    },
    db: {
        url: "mongodb://127.0.0.1:27017",
        name: 'chat',
        collection: {
            user: 'user',
            message: 'message',
        }
    }
}