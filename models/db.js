// const MongoClient = require('mongodb').MongoClient;
const CONF = require("../conf/conf");
const MongoConf = CONF.db
module.exports = class {
    url = MongoConf.url;
    DBName = "test";
    collectionName = "test";
    client = null;
    db = null;
    collection = null;
    constructor(DBName, collectionName) {
        let _this = this;
        _this.DBName = DBName;
        _this.collectionName = collectionName;
    }

    /**
     * 连接mongodb数据库
     * @param DBName 数据库名
     * @param collectionName 集合名
     * @returns {Promise<col>} 数据库集合
     */
    connect(DBName, collectionName) {
        let _this = this;
        const MongoClient = require('mongodb').MongoClient;
        return new Promise(((resolve, reject) => {
            MongoClient.connect(_this.url, { useUnifiedTopology: true }, (err, client) => {
                if (err) throw err;
                _this.client = client;
                _this.db = client.db(DBName);
                _this.collection = _this.db.collection(collectionName);
                resolve(_this.collection);
            });
        }))
    }

    /**
     * 关闭数据库, 释放连接
     */
    close() {
        this.client.close()
    }

    // -------------------------------------- 查询 --------------------------------------
    /**
     * 查找多条数据
     * @param filter{ item, skip, limit} 过滤条件
     * @param projection{object} 过滤字段
     * @returns {Promise<docs>}
     */
    find(filter = {}, projection={}) {
        let _this = this;
        return new Promise(resolve => {
            this.connect(this.DBName, this.collectionName).then(col => {
                col.find(filter.item || {}).limit(filter.limit || 0).skip(filter.skip || 0).project(projection).toArray((err, docs) => {
                    if (err) throw err;
                    _this.close();
                    resolve(docs);
                });
            });
        })
    }

    /**
     * 查找一条数据
     * @param filter
     * @returns {Promise<data>}
     */
    findOne(filter) {
        let _this = this;
        return new Promise(resolve => {
            this.connect(this.DBName, this.collectionName).then(col => {
                col.findOne(filter, (err, data)=>{
                    if (err) throw err;
                    _this.close();
                    resolve(data)
                })
            });
        });
    }

    // -------------------------------------- 插入 --------------------------------------
    /**
     * 插入一条数据
     * @param data 需要添加的数据
     * @returns {Promise<res>}
     */
    insertOne(data) {
        let _this = this;
        return new Promise(resolve => {
            this.connect(this.DBName, this.collectionName).then(col => {
                col.insertOne(data, res => {
                    setTimeout(()=>{
                        _this.close();
                    }, 100)
                    resolve(res);
                });
            });
        })
    }

    /**
     * 同时插入多条数据
     * @param dataArray 需要添加的数据
     * @returns {Promise<res>}
     */
    insertMany(dataArray) {
        let _this = this;
        return new Promise(resolve => {
            this.connect(this.DBName, this.collectionName).then(col => {
                col.insertMany(dataArray, res => {
                    _this.close();
                    resolve(res);
                });
            });
        });
    }

    // -------------------------------------- 更新数据 --------------------------------------
    /**
     * 更新一条数据
     * @param filter 过滤项
     * @param result 结果
     * @returns {Promise<res>}
     */
    updateOne(filter, result) {
        let _this = this;
        return new Promise(resolve => {
            this.connect(this.DBName, this.collectionName).then(col => {
                col.updateOne(filter, result, (err, res) => {
                    _this.close();
                    if (err) throw err;
                    resolve(res.result);
                })
            });
        })
    }

    /**
     * 同时更新多条数据
     * @param filter 过滤项
     * @param result 结果
     * @returns {Promise<res>} 更新结果
     */
    updateMany(filter, result) {
        let _this = this;
        return new Promise(resolve => {
            this.connect(this.DBName, this.collectionName).then(col => {
                col.updateMany(filter, result, (err, res) => {
                    _this.close();
                    if (err) throw err;
                    resolve(res.result);
                })
            });
        })
    }

    // -------------------------------------- 删除 --------------------------------------
    /**
     * 删除一条数据
     * @param filter 过滤条件
     * @returns {Promise<res>} 删除结果
     */
    deleteOne(filter) {
        let _this = this;
        return new Promise(resolve => {
            this.connect(this.DBName, this.collectionName).then(col => {
                col.deleteOne(filter, (err, res) => {
                    _this.close();
                    if (err) throw err;
                    resolve(res.result);
                });
            });
        })
    }

    /**
     * 同时删除多条数据
     * @param filter 过滤条件
     * @returns {Promise<res>} 删除结果
     */
    deleteMany(filter) {
        let _this = this;
        return new Promise(resolve => {
            this.connect(this.DBName, this.collectionName).then(col => {
                col.deleteMany(filter, (err, res) => {
                    _this.close();
                    if (err) throw err;
                    resolve(res.result);
                });
            });
        })
    }
};
