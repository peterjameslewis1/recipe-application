const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        min: 7,
        max: 255
    },
    password: {
        type: String,
        min: 5,
        max: 255
    },
    status: {
        type: String
    },
    username: {
        type: String
    },
    hash: {
        type: String
    },
    image: {
        type: String
    },
    favourites: [Number],
    // favouriteDetails: [Object],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', User)