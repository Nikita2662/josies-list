const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    itemName: { type: String, required: true }, 
    description: { type: String, default: 'No description listed for this item.' },
    price: { type: Number, required: true, default: 0 }, 
    seller: String
})

module.exports = mongoose.model('Product', productSchema);