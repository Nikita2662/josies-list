const mongoose = require('mongoose');
const schema = mongoose.Schema;

// NEED TO ADD ALL ATTRIBUTES, ONCE THESE ARE TESTED
const userSchema = new schema({
    _id: { // email
        type: String,
        required: true,
        unique: true // makes sure it's a unique value
    },
    /* user_id: { // email // DELETE THIS SECTION IF ABOVE WORKS
        type: String,
        required: true,
        unique: true // makes sure it's a unique value
        // , validate: (value) => {
        //    return validator.isEmail(value);
        // }  // lol this would also work for email validation instead of Google validation, just as an alternative
    }, */
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "None"
    }
    // insert any user methods here
})

// custom query methods --- DELETE
/* userSchema.query.byEmail = function (email) { // allows you to find user by email, rather than the self defined ID (alternatively, could just rewrite the default id to the user_id, which is the email)
    return this.find({ _id: email });
} */

module.exports = mongoose.model('User', userSchema);