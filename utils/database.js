require('dotenv').config();
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db;

const mongoConnect = (callback) => {
    MongoClient
        .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.nv9juva.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback()
        })
        .catch(err => {
            console.log(err)
            throw err;
        })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
