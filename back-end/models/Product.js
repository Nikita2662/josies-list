const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TO DO: Add Image Field
const productSchema = new Schema({
    itemName: { type: String, required: true }, 
    description: { type: String, default: 'No description listed for this item.' },
    price: { type: Number, required: true, default: 0 },
    tags: { type: [String], default: [] },
    image: String,
    seller_name: String,
    seller_email: String
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;