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
        const cartProductIndex = this.cart.items.findIndex(p => {
            return p.productId.toString() === product._id.toString();
        })

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({ productId: new ObjectId(product._id), quantity: 1 });
        }

        const updatedCart = { items: updatedCartItems };

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