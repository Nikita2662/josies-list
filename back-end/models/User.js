const mongoose = require('mongoose');
const schema = mongoose.Schema;

// NEED TO ADD ALL ATTRIBUTES, ONCE THESE ARE TESTED
const userSchema = new schema({
    user_id: { // email
        type: String,
        required: true,
        unique: true // makes sure it's a unique value
        /* , validate: (value) => {
            return validator.isEmail(value);
        } */ // lol this would also work for email validation instead of Google validation, just as an alternative
    },
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "None"
    }

    // can also add user methods here
})

module.exports = mongoose.model('User', userSchema);