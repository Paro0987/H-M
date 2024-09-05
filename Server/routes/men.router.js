const express = require("express");
const { MenModel } = require("../models/product.model");
const menRouter = express.Router();

// Fetch all men's products with filtering, sorting, and pagination
menRouter.get("/", async (req, res) => {
  try {
    const { category, sortby, min_price, max_price, page = 0, limit = 15 } = req.query;

    // Convert query parameters to appropriate types
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const minPrice = min_price ? parseFloat(min_price) : undefined;
    const maxPrice = max_price ? parseFloat(max_price) : undefined;
    const sort = sortby === "asc" ? 1 : sortby === "desc" ? -1 : undefined;

    // Build query
    let query = {};
    if (category) query.category = category;
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    // Fetch products with filtering, sorting, and pagination
    const products = await MenModel.find(query)
      .sort(sort ? { price: sort } : {})
      .limit(limitNumber)
      .skip(limitNumber * pageNumber);
    
    const totalCount = await MenModel.countDocuments(query);

    res.status(200).json({
      data: products,
      status: "success",
      totalCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", status: "error" });
  }
});

// Fetch a single product by ID
menRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await MenModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", status: "error" });
    }
    res.status(200).json({ data: product, status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", status: "error" });
  }
});

// Add a new product
menRouter.post('/add', async (req, res) => {
  try {
    const product = new MenModel(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added successfully', status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', status: 'error' });
  }
});

// Update a product by ID
menRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await MenModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found", status: "error" });
    }
    res.status(200).json({ message: "Product updated successfully", status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", status: "error" });
  }
});

// Delete a product by ID
menRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await MenModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", status: "error" });
    }
    res.status(200).json({ message: "Product deleted successfully", status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", status: "error" });
  }
});

module.exports = { menRouter };
