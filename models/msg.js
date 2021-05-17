const CONF = require('../conf/conf')
const DBModel = require('./db')
let msgDB = new DBModel(CONF.db.name, CONF.db.collection.message)

module.exports = {
    getAllMsgs: async userid => {
        return await msgDB.find({
            item: {
                $or: [
                    {
                        sender: userid
                    },
                    {
                        receiver: userid
                    },
                ]
            }
        })
    }
}