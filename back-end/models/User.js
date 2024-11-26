const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    _id: { // email
        type: String, // always required and unique
    },
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "None"
    },
    name: {
        type: String,
        default: ""
    },
    picture: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);