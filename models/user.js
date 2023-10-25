const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product' // define relation
            },
            quantity: {
                type: Number,
                required: true,
            }
        }]
    }
})

module.exports = mongoose.model('User', userSchema);