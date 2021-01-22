const MongoClient = require('mongodb').MongoClient
const DB_URL = "mongodb://localhost:27017/tsAdmin"
module.exports = {
    MongoClient,
    DB_URL
}