const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  itemName: { type: String, required: true },
  description: {
    type: String,
    default: "No description listed for this item.",
  },
  price: { type: Number, required: true, default: 0 },
  tags: { type: [String], default: [] },
  image: String,
  seller_name: String,
  seller_email: String,
  highestBid: Number,
  highestBidder: {
    type: String,
    default: "",
    required: function () {
      return this.highestBid ? true : false; // require bidder only if highest bid exists
    },
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
