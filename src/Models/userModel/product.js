const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product_cateory",
      required: true
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = productSchema;
