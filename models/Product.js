const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    requried: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  image: {
    type: String,
  },
  bestSeller: {
    type: String,
  },
  description: {
    type: String,
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
