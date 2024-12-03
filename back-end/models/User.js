const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    _id: { // email
        type: String, // always required and unique
        validate: {
            validator: function(email) {
                return /(g\.ucla\.edu)$/.test(email); // true if g.ucla.edu email, false otherwise
            },
            message: props => ' is not a valid g.ucla.edu email!' // send 400 message 
        }
    },
    username: String,
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