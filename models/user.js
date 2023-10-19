const mongodb = require('mongodb')
const getDb = require('../utils/database').getDb

const ObjectId = mongodb.ObjectId

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User