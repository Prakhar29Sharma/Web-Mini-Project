const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const createMail = require('../services/mailService');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username, isActive: true });
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
    const { username, password, email, role, portfolio, experience } = req.body;
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
                isActive = false;
                if (role === 'STUDENT') {
                    isActive = true;
                }
                const user = new User({ username, password, email, role, isActive, portfolio, experience });
                await user.save()
                .then(async () => {
                    await createMail(username, email, 'Welcome to Edulib!', `<p>Thank you for registering with us. We hope you have a great experience!</p>${role !== 'STUDENT' ? `<p>Your account is not active yet, we'll get back to you.</p>` : null }<p>Regards,<br>Team Edulib</p>`);
                });
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