const http = require('http')
const koa = require('koa')
const app = new koa()
const Static = require('koa-static')
const route = require('koa-route')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')


const CONF = require('./conf/conf')
const server = http.createServer(app.callback())
app.use(Static(__dirname+'/dist'))
app.use(cors())
app.use(bodyParser())

app.use(async ctx => {
    ctx.redirect('/index.html')
})

server.listen(CONF.server.port, CONF.server.ip)
console.log(`server at: ${CONF.server.ip}:${CONF.server.port}`)