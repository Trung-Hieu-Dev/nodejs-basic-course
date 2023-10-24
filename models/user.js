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

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        })

        return db.collection('products')
            .find({ _id: { $in: productIds } }) // get all products with id in cart
            .toArray() // convert to array
            .then(products => { // assign quantity property to every product
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    }
                })
            })
            .catch(err => console.log(err))
    }

    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        })

        const db = getDb();
        return db.collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                {
                    $set: {
                        cart:
                            { items: updatedCartItems }
                    }
                }
            )
            .then()
            .catch(err => console.log(err))
    }

    addOrder() {
        const db = getDb();
        return db.collection('orders')
            .insertOne(this.cart)
            .then(() => {
                this.cart = { items: [] }
                return db.collection('users')
                    .updateOne(
                        { _id: new ObjectId(this._id) },
                        { $set: { cart: { items: [] } } }
                    )
            })
            .catch(err => console.log(err))
    }
}

module.exports = User