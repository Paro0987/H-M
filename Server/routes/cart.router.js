const express = require('express');
const { CartModel } = require('../models/cart.model');
const cartRouter = express.Router();

// GET: Retrieve cart for a specific user
cartRouter.get('/', async (req, res) => {
  try {
    const { userId } = req.query; // Expect userId as a query parameter
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required', status: 'error' });
    }

    const cart = await CartModel.findOne({ user: userId }); // Find cart for the user
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found', status: 'error' });
    }

    const totalCount = cart.items.length; // Count the items in the cart
    res.status(200).json({ data: cart, status: 'success', totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', status: 'error' });
  }
});

// POST: Add items to the cart
cartRouter.post('/add', async (req, res) => {
  try {
    const { userId, product, quantity, price } = req.body;
    if (!userId || !product || !quantity || !price) {
      return res.status(400).json({ message: 'All fields are required', status: 'error' });
    }

    let cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      // Create a new cart if it does not exist
      cart = new CartModel({ user: userId, items: [{ product, quantity, price }] });
    } else {
      // Add the new item to the existing cart
      cart.items.push({ product, quantity, price });
    }

    await cart.save();
    res.status(201).json({ message: 'Product added to cart', status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', status: 'error' });
  }
});

// PATCH: Update quantity or other details of a cart item
cartRouter.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  try {
    const cart = await CartModel.findOneAndUpdate(
      { 'items._id': id },
      { $set: { 'items.$.quantity': quantity, 'items.$.price': price } },
      { new: true } // Return the updated document
    );
    if (!cart) {
      return res.status(404).json({ message: 'Cart item not found', status: 'error' });
    }
    res.status(200).json({ message: 'Cart item updated successfully', status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', status: 'error' });
  }
});

// DELETE: Remove a specific item from the cart
cartRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartModel.findOneAndUpdate(
      { 'items._id': id },
      { $pull: { items: { _id: id } } },
      { new: true } // Return the updated document
    );
    if (!cart) {
      return res.status(404).json({ message: 'Cart item not found', status: 'error' });
    }
    res.status(200).json({ message: 'Cart item deleted successfully', status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', status: 'error' });
  }
});

// DELETE: Checkout and clear the cart for a specific user
cartRouter.delete('/checkout', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required', status: 'error' });
    }

    await CartModel.deleteOne({ user: userId });
    res.status(200).json({ message: 'Cart cleared successfully', status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', status: 'error' });
  }
});

module.exports = {
  cartRouter,
};
