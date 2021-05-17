const Token = require('../models/token')
const Crypto = require('../models/crypto')

const jwt = new Token()
const userModel = require('../models/user')
const fileModel = require('../models/file-upload')
const msgModel = require('../models/msg')

function isLogin(ctx) {
    const token = ctx.request.header.token;
    let loginedUser = jwt.verifyToken(token)
    if (loginedUser === 'err') {
        ctx.status = 401
        ctx.body = {
            status: 401,
            msg: '未登录或者已到期',
            expire: true
        }
        return false
    } else {
        // 验证通过
        return loginedUser
    }
}

module.exports = {
    getUserDetail: async ctx => {
        const {
            id,
        } = ctx.query;
        let user = await userModel.getUser({id})
        if (user) {
            ctx.body = {
                status: 200,
                msg: '获取用户成功！',
                user
            }
        } else {
            ctx.body = {
                status: 401,
                msg: '用户不存在！',
                user
            }
        }
    },
    getUsers: async ctx => {
        isLogin(ctx)

        const {
            group,
        } = ctx.query;
        let opt = {};
        if (group && group !== '' && group !== 'admin') {
            opt = {group}
        }
        // console.log(opt)
        let users = await userModel.getUsers(opt)
        ctx.body = {
            status: 200,
            msg: '获取用户成功！',
            users
        }
    },
    getFriends: async ctx => {
        isLogin(ctx)

        const {
            id,
        } = ctx.query;
        let users = await userModel.getUsers({
            id: {
                $not: {
                    $eq: id
                }
            }
        })
        ctx.body = {
            status: 200,
            msg: '获取用户成功！',
            users
        }
    },
    getMsgs: async ctx => {
        const {id} = ctx.query
        let msgList = await msgModel.getAllMsgs(id)
        ctx.body = {
            status: 200,
            msg: '获取消息成功！',
            msgList,
        }
    },
    addUser: async ctx => {
        const {
            username,
            password,
        } = ctx.request.body;
        if (!username.trim() || !password.trim()) {
            ctx.status = 403
            ctx.body = {
                status: 403,
                msg: '缺少必填项'
            }
        } else {
            let name = await userModel.getUser({username})
            if (name) {
                ctx.status = 402
                ctx.body = {
                    status: 402,
                    msg: '用户名已经存在'
                }
            } else {
                await userModel.addUser({
                    username,
                    password: Crypto.encrypt(password),
                })
                ctx.body = {
                    status: 200,
                    msg: '注册成功！',
                    username
                }
            }
        }
    },
    updateUserById: async ctx => {
        const res = await userModel.updateUser(ctx.request.body)
        ctx.body = {
            res,
            status: 200,
            msg: '修改成功！'
        }
    },
    login: async ctx => {
        const { username, password } = ctx.request.body;
        let cryptUser = {
            username,
            password: Crypto.encrypt(password)
        }
        let user = await userModel.getUser(cryptUser)
        if (user) {
            let token = jwt.generateToken(cryptUser)
            ctx.body = {
                status: 200,
                msg: '登录成功！',
                token,
                user: {
                    username: user.username,
                    id: user.id,
                }
            }
        } else {
            ctx.status = 402
            ctx.body = {
                status: 402,
                msg: '用户不存在或密码错误！'
            }//'用户不存在或密码错误'
        }
    },
    uploadAvatar: ctx => {
        return new Promise(((resolve) => {
            fileModel.uploadFiles(ctx.req, 'avatar').then(paths => {
                resolve()
                ctx.body = {
                    status: 200,
                    msg: '头像上传成功！请点击确定之后完成修改！',
                    avatar: paths
                }
            })
        }))
    },
    uploadImg: ctx => {
        return new Promise(((resolve) => {
            fileModel.uploadFiles(ctx.req, 'img').then(paths => {
                resolve()
                ctx.body = {
                    status: 200,
                    msg: '图片上传成功！',
                    src: paths[0]
                }
            })
        }))
    },
}