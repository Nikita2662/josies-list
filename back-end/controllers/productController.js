//where we have all methods related to product

const Product = require("../models/Product");

const checkDuplicateProduct = async ({ itemName, description, price, tags, seller }) => {
    try {
        const duplicate = await Product.findOne({
            $and: [
                { itemName }, { description }, { price }, { seller }, { tags: tags }
            ]
        });

        if (duplicate != null) {
            return { duplicate: true }
        };

        return { duplicate: false };

    } catch (error) {
        throw new Error('Error checking for duplicate product: ' + err.message);
    }
};

module.exports = { checkDuplicateProduct };