const http = require('http')
const koa = require('koa')
const app = new koa()
const Static = require('koa-static')
const route = require('koa-route')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')



const CONF = require('./conf/conf')
const server = http.createServer(app.callback())
require('./models/socket')(server)

app.use(Static(__dirname+'/dist'))
app.use(Static(__dirname+'/public'))
app.use(cors())
app.use(bodyParser())

const Router = require("./routers/api")
app.use(route.post('/register', Router.addUser))
app.use(route.post('/login', Router.login))
app.use(route.get('/user', Router.getUserDetail))
app.use(route.get('/user/friends', Router.getFriends))
app.use(route.post('/user/msg', Router.updateUserById))
app.use(route.post('/user/avatar', Router.uploadAvatar))
app.use(route.post('/user/img', Router.uploadImg))
app.use(route.get('/message', Router.getMsgs))

server.listen(CONF.server.port, CONF.server.ip)
console.log(`server at: ${CONF.server.ip}:${CONF.server.port}`)