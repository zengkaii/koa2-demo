const {MongoClient, DB_URL} = require('./config')
function getRelust(dbName, collection, reqQuery={}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            dbase.collection(collection).find(reqQuery).toArray(function(err, result) { // 返回集合中所有数据
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

function getByLimit(dbName = 'tsAdmin', collection, whereStr={}, currentPage = 1, pageSize = 10) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            let skip = pageSize * (currentPage - 1)
            delete whereStr.currentPage
            delete whereStr.pageSize
            dbase.collection(collection).find(whereStr).skip(skip).limit(pageSize).toArray(function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                    db.close();
                }
          })
        })
    })
}

function postMethod(dbName = 'tsAdmin', collection, postData={}) {
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


function postMultipleMethod(dbName = 'tsAdmin', collection, postData=[]) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            dbase.collection(collection).insertMany(postData, function(err, res) {
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

function updateMethod(dbName = 'tsAdmin', collection, whereStr={}, updateStr={}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            updateData = {$set: updateStr}
            dbase.collection(collection).updateOne(whereStr, updateData, function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                    console.log('文档更新成功')
                    db.close();
                }
            })
        })
    })
}

function updateMultipleMethod(dbName = 'tsAdmin', collection, whereStr={}, updateStr={}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            const dbase = db.db(dbName)
            updateData = {$set: updateStr}
            dbase.collection(collection).updateMany(whereStr, updateData, function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                    console.log('文档更新成功')
                    db.close();
                }
            })
        })
    })
}

function deleteMethod(dbName = 'tsAdmin', collection, whereStr={}) {
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

function deleteMultipleMethod(dbName = 'tsAdmin', collection, whereStr={}) {
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


module.exports = {
    getRelust,
    getByLimit,
    postMethod,
    postMultipleMethod,
    updateMethod,
    updateMultipleMethod,
    deleteMethod,
    deleteMultipleMethod
}