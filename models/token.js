const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
// 创建 token 类
class Token {
    constructor() {
    }

    //生成token
    generateToken(data) {
        let created = Math.floor(Date.now() / 1000);
        let key = fs.readFileSync(path.join(__dirname, '../pem/private2.pem'));//私钥 可以自己生成
        let token = jwt.sign({
            data,
            exp: created + 60 * 60 * 24 * 3, // 3天登录过期
        }, key, {algorithm: 'RS256'});
        return token;
    }

    // 校验token
    verifyToken(token) {
        let key = fs.readFileSync(path.join(__dirname, '../pem/public2.pem'));//公钥 可以自己生成
        let res;
        try {
            let result = jwt.verify(token, key, {algorithms: ['RS256']}) || {};
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            console.error(e)
            res = 'err';
        }
        return res;
    }
}

module.exports = Token;