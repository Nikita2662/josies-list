const mongoose = require('mongoose');
const schema = mongoose.Schema;

// can add more attributes once these are tested
const userSchema = new Schema({
    userId: { // email
        type: String,
        required: true
    }
    username: {
        type: String,
        default: userId
    }
    bio: {
        type: String,
        default: "None"
    }
})

module.exports = mongoose.model('User', userSchema);