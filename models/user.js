const mongodb = require('mongodb')
const getDb = require('../utils/database').getDb

const ObjectId = mongodb.ObjectId

class User {
    constructor(email, password, cart, id) {
        this.email = email;
        this.password = password;
        this.cart = cart; // {items: [productId, quantity]}
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new ObjectId(userId) });
    }

    addToCart(product) {
        const updatedCart = {
            items: [
                { productId: new ObjectId(product._id), quantity: 1 }
            ]
        };

        const db = getDb();
        return db.collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            )
            .then()
            .catch(err => console.log(err))
    }
}

module.exports = User