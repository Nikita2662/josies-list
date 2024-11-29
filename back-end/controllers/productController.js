//where we have all methods related to product

const Product = require("../models/Product");

//Check for a duplicate product in the database
const checkDuplicateProduct = async ({ itemName, description, price, tags, seller }) => {
    try {
        const duplicate = await Product.findOne({
            $and: [
                { itemName }, { description }, { price }, { seller }, { tags: tags }
            ]
        });

        if (duplicate != null) {
            return { duplicate: true } //return true if a duplicate was found
        };

        return { duplicate: false }; //returns false if a duplicate was not found

    } catch (error) { //
        return res.status(500).json({ message: error });
    }
};

module.exports = { checkDuplicateProduct };