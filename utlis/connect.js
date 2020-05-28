
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/admin"
function getRelust(dbName, collection, reqQuery={}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                reject(err)
            }
            var dbase = db.db(dbName)
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
module.exports = {
    getRelust
}