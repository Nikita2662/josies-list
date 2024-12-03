const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        user: { type: String, required: true },  //user email is used here
        content: { type: String, required: true },
        productID: { type: String, require: true}, 
        createdAt: {type: Date, default: Date.now}
    }, 
    { timestamps : true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;