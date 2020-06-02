const {MongoClient, DB_URL} = require('./config')
function getRelust(dbName, collection, reqQuery={}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            dbase.collection(collection). find(reqQuery).toArray(function(err, result) { // 返回集合中所有数据
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                    db.close()
                }
            })
        })
    })
}

function postMethods(dbName, collection, postData={}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            dbase.collection(collection).insertOne(postData, function(err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log("文档插入成功");
                    resolve()
                    db.close();
                }
            })
        })
    })
}

function deleteMethods(dbName, collection, whereStr={}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            dbase.collection(collection).deleteOne(whereStr, function(err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log("文档删除成功");
                    resolve()
                    db.close();
                }
            })
        })
    })
}

function deleteMultipleMethods(dbName, collection, whereStr={}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            dbase.collection(collection).deleteMany(whereStr, function(err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log("文档删除成功");
                    resolve()
                    db.close();
                }
            })
        })
    })
}

function getByLimit(dbName, collection, whereStr={}, currentPage = 1, pageSize = 10) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            let skip = pageSize * (currentPage - 1)
            dbase.collection(collection).find(whereStr).skip(skip).limit(pageSize).toArray(function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                    console.log(result)
                    db.close();
                }
          })
        })
    })
}
module.exports = {
    getRelust,
    postMethods,
    deleteMethods,
    deleteMultipleMethods,
    getByLimit
}