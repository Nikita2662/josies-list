const mongoose = require('mongoose');
const schema = mongoose.Schema;

// can add more attributes once these are tested
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
        default: userId
    },
    bio: {
        type: String,
        default: "None"
    }
    // can also add user methods here
})

module.exports = mongoose.model('User', userSchema);