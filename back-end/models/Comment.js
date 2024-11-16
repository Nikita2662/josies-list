const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TO DO: Add Image Field
const commentSchema = new Schema({
    user: { type: String, required: true }, 
    content: { type: String, required: true },
    productID: { type: String, required: true }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;