const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bidSchema = new schema({
    product_id: { type: Schema.Types.ObjectId, required: true }, // can get all info about product given this
    buyer_id: { type: String, required: true }, // USER EMAIL -- should not be visible to seller
    bid_value: {type: Number, required: true}
})

module.exports = mongoose.model('Bid', bidSchema);