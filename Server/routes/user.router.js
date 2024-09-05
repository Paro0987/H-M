const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
const { authenticate } = require('../middlewares/auth.middlewares');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('user login');
});

userRouter.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, gender } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists, Please login', status: 'error' });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: hash,
            gender,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', status: 'error' });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please Signup first", status: "error" });
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(400).json({ message: "Wrong Password", status: "error" });
        }

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "User login successfully",
            status: "success",
            token,
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, status: "error" });
    }
});

userRouter.get("/all-users", authenticate, async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", status: "error" });
    }
});

userRouter.get("/all-users/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }
        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", status: "error" });
    }
});

userRouter.delete("/delete/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }
        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", status: "error" });
    }
});

userRouter.patch("/update/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }
        res.status(200).json({
            status: "success",
            message: "User data updated successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", status: "error" });
    }
});

// Favourite routes
userRouter.get('/favourites', authenticate, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userID);
        if (!user) return res.status(404).json({ message: 'User not found', status: 'error' });
        res.json({ favourites: user.favourites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching favourites', status: 'error' });
    }
});

userRouter.post('/favourites/:itemId', authenticate, async (req, res) => {
    console.log('Add to favourites route hit');
    console.log('Item ID:', req.params.itemId);
    console.log('User ID:', req.user.userID);
    
    try {
        const user = await UserModel.findById(req.user.userID);
        if (!user) return res.status(404).json({ message: 'User not found', status: 'error' });

        if (!user.favourites.includes(req.params.itemId)) {
            user.favourites.push(req.params.itemId);
            await user.save();
        }
        res.json({ message: 'Item added to favourites', status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding item to favourites', status: 'error' });
    }
});



userRouter.delete('/favourites/:itemId', authenticate, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userID);
        if (!user) return res.status(404).json({ message: 'User not found', status: 'error' });

        user.favourites = user.favourites.filter(id => id !== req.params.itemId);
        await user.save();
        res.json({ message: 'Item removed from favourites', status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing item from favourites', status: 'error' });
    }
});

module.exports = { userRouter };
