const mongoose = require('mongoose');

// Define the schema for individual items in the cart
const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model
  quantity: { type: Number, required: true, min: 1 }, // Quantity of the product
  price: { type: Number, required: true } // Price of the product at the time of adding to the cart
});

// Define the schema for the cart
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  items: [CartItemSchema], // Array of cart items
  totalPrice: { type: Number, default: 0 }, // Total price of all items in the cart
  createdAt: { type: Date, default: Date.now } // Timestamp for when the cart was created
});

// Create and export the Cart model
const CartModel = mongoose.model('Cart', cartSchema);

module.exports = { CartModel };
