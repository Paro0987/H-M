const express = require("express");
const { DividendModel } = require("../models/product.model");
const DividendRouter = express.Router();

DividendRouter.get("/dividend", async (req, res) => {
    const category = req?.query?.category;
    const page = Math.max(0, req?.query?.page || 0);
    const limit = req?.query?.limit || 15;
    const sort = req?.query?.sortby;
    let min_price = req?.query?.min_price;
    let max_price = req?.query?.max_price;
    let s;
    if (sort == "asc") {
      s = 1;
    } else if (sort == "desc") {
      s = -1;
    }
    try {
      if (category && min_price && max_price) {
        min_price = Number(min_price);
        max_price = Number(max_price);
        console.log(min_price, max_price);
        const product = await DividendModel.find({
          category: category,
          price: { $gte: min_price, $lte: max_price },
        }).limit(limit);
        const productlength = await DividendModel.find({
          category: category,
          price: { $gte: min_price, $lte: max_price },
        }).count();
  
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (min_price && max_price) {
        min_price = Number(min_price);
        max_price = Number(max_price);
        const product = await DividendModel.find({
          price: { $gte: min_price, $lte: max_price },
        }).limit(limit);
        const productlength = await DividendModel.find({
          price: { $gte: min_price, $lte: max_price },
        }).count();
  
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (category && min_price) {
        min_price = Number(min_price);
        const product = await DividendModel.find({
          price: { $gte: min_price },
          category: category,
        }).limit(limit);
        const productlength = await DividendModel.find({
          price: { $gte: min_price },
        }).count();
  
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (category && max_price) {
        max_price = Number(max_price);
        const product = await DividendModel.find({
          price: { $lte: max_price },
        }).limit(limit);
        const productlength = await DividendModel.find({
          price: { $lte: max_price },
        }).count();
  
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (min_price) {
        min_price = Number(min_price);
  
        const product = await DividendModel.find({
          price: { $gte: min_price },
        }).limit(limit);
        const productlength = await DividendModel.find({
          price: { $gte: min_price },
        }).count();
  
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (max_price) {
        min_price = Number(min_price);
        max_price = Number(max_price);
        const product = await DividendModel.find({
          price: { $lte: max_price },
        }).limit(limit);
        const productlength = await DividendModel.find({
          price: { $lte: max_price },
        }).count();
  
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (category && sort) {
        const product = await DividendModel.find({ category: category })
          .limit(limit)
          .sort({ price: s });
        const productlength = await DividendModel.find({
          category: category,
        }).count();
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (category) {
        const product = await DividendModel.find({ category: category })
          .limit(limit)
          .skip(limit * page);
        const productlength = await DividendModel.find({
          category: category,
        }).count();
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (limit && page && sort) {
        const product = await DividendModel.find()
          .limit(limit)
          .skip(limit * page)
          .sort({ price: s });
        const productlength = await DividendModel.find().count();
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (page && sort) {
        const product = await DividendModel.find()
          .limit(limit)
          .skip(limit * page)
          .sort({ price: s });
        const productlength = await DividendModel.find().count();
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (page) {
        const product = await DividendModel.find()
          .limit(limit)
          .skip(limit * page);
        const productlength = await DividendModel.find().count();
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else if (sort) {
        const product = await DividendModel.find()
          .limit(limit)
          .sort({ price: s });
        const productlength = await DividendModel.find().count();
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      } else {
        const product = await DividendModel.find().limit(limit);
        const productlength = await DividendModel.find().count();
        res.status(201).json({
          data: product,
          status: "success",
          totalCount: productlength,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "error" });
    }
  });

  DividendRouter.get("/dividend/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await DividendModel.find({ _id: id });
      res.status(201).json({ data: product, status: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "error" });
    }
  });

  DividendRouter.post("/dividend/add", async (req, res) => {
    try {
      const product = new DividendModel(req.body);
      product.save();
      res
        .status(201)
        .json({ message: "Product added successfully", status: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "error" });
    }
  });

  DividendRouter.patch("/dividend/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await DividendModel.findByIdAndUpdate(
        { _id: id },
        req.body
      );
      res
        .status(201)
        .json({ message: "Data update successfully", status: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "error" });
    }
  });

  DividendRouter.delete("/dividend/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await DividendModel.findByIdAndDelete({ _id: id });
      res
        .status(201)
        .json({ message: "Data delete successfully", status: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong", status: "error" });
    }
  });
  
  module.exports = {
    DividendRouter,
  };