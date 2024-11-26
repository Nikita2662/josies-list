const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    _id: { // email
        type: String,
        required: true,
        unique: true // makes sure it's a unique value
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