const DBModel = require('./db')
const CONF = require('../conf/conf')
const tools = require('./tools')

let db = new DBModel(CONF.db.name, CONF.db.collection.user)
// let codeDB = new DBModel(CONF.db.name, CONF.db.collection.code)

module.exports = {
    async getUser(opt) {
        // console.log(opt)
        return await db.findOne(opt)
    },
    async getUsers(filter) {
        return await db.find({item: filter})
    },
    async addUser(user) {
        user.id = Date.now()+parseInt(Math.random()*9999)+''
        user.created = tools.dateFmt(new Date())
        user.bio = ''
        user.avatar = '/img/default.jpeg'
        // console.log(user)
        return await db.insertOne(user)
    },
    async updateUser(user) {
        if (user._id) {
            delete user._id
        }
        const res = await db.updateOne({
            id: user.id
        }, {
            $set: user
        })
        return res
    },
    // async updatePassword(item) {
    //     let code = await codeDB.findOne({
    //         email: item.email,
    //         code: item.code
    //     })
    //     console.log(code)
    //     if (code && code.id) {
    //         let res = await db.updateOne({
    //             email: item.email
    //         }, {
    //             $set: {
    //                 password: item.password
    //             }
    //         })
    //         console.log(res)
    //         await codeDB.deleteOne({
    //             email: item.email
    //         })
    //
    //         return '重置密码成功！'
    //     } else {
    //         return '验证码错误！'
    //     }
    // },
}