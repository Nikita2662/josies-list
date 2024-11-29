const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TO DO: Add Image Field
const commentSchema = new Schema(
    {
        user: { type: String, required: true },  //use user email here (id field)
        content: { type: String, required: true },
        productID: { type: String, require: true}, 
    }, 
    { timestamps : true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
