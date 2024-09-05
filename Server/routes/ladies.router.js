const express = require("express");
const { LadiesModel } = require("../models/product.model");
const ladiesRouter = express.Router();

// Fetch all ladies products with filtering, sorting, and searching
ladiesRouter.get("/", async (req, res) => {
  try {
    const { category, subCategory, sort, search } = req.query;

    // Build query
    let query = {};
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;

    // Add search functionality to query
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Sorting options
    let sortOptions = {};
    if (sort) {
      switch (sort) {
        case 'priceAsc':
          sortOptions.price = 1; // Ascending
          break;
        case 'priceDesc':
          sortOptions.price = -1; // Descending
          break;
        case 'titleAsc':
          sortOptions.title = 1; // Ascending
          break;
        case 'titleDesc':
          sortOptions.title = -1; // Descending
          break;
        default:
          break;
      }
    }

    // Fetch products with filtering and sorting
    const products = await LadiesModel.find(query).sort(sortOptions);

    res.status(200).json({
      message: "Product data retrieved successfully",
      products
    });
  } catch (error) {
    res.status(404).json({ message: `Error while retrieving product data: ${error}` });
  }
});

// Fetch a single product by ID
ladiesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await LadiesModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", status: "error" });
    }
    res.status(200).json({ data: product, status: "success" });
  } catch (error) {
    res.status(500).json({ message: `Error while fetching product: ${error.message}`, status: "error" });
  }
});

// Add a new product
ladiesRouter.post("/add", async (req, res) => {
  try {
    const product = new LadiesModel(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: `Error while adding product: ${error.message}`, status: "error" });
  }
});

// Update a product by ID
ladiesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await LadiesModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found", status: "error" });
    }
    res.status(200).json({ message: "Data updated successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: `Error while updating product: ${error.message}`, status: "error" });
  }
});

// Delete a product by ID
ladiesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await LadiesModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", status: "error" });
    }
    res.status(200).json({ message: "Data deleted successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: `Error while deleting product: ${error.message}`, status: "error" });
  }
});

module.exports = { ladiesRouter };
