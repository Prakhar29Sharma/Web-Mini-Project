const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {

        const token = jwt.sign({
            username: user.username,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: '1h'});

        if (user.password === password) {
            res.status(200).json({
                status: 'ok',
                message: "Login successful",
                user: {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
                token: token,
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: "Invalid Credentials",
            });
        }
    } else {
        res.status(400).json({
            status: 'error',
            message: "Invalid Credentials",
        });
    }
});

router.post('/register', async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
        if (role === '' || password === '' || username === '' || email === '') {
            res.status(400).json({
                status: 'error',
                message: "every field is required",
            });
        } else {
            const user = await User.exists({ username: username });
            if (user) {
                res.status(400).json({
                    status: 'error',
                    message: "username already exists",
                });
            } else {
                const user = new User({ username, password, email, role });
                await user.save();
                res.status(200).json({
                    status: 'ok',
                    message: "user created",
                });
            }
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: "Something went wrong",
            error: err.message,
        });
    }
});

module.exports = router;