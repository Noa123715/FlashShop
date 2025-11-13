const mongoose = require("mongoose");
const Joi = require("joi");
let productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: [{
        data: Buffer,
        contentType: String
    }],
    category: String,
    stock: Number,
    date_created: {
        type: Date,
        default: Date.now
    }
});
exports.ProductModel = mongoose.model("products", productSchema);
