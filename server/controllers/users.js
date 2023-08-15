const User = require('../models/User');

/* READ */

const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        // res.status(200).json(user);
        res.json({
            status: 'ok',
            user: user,
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        // res.status(200).json(user);
        res.json({
            status: 'ok',
            users: users,
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

const getUserWithRole = async (req, res) => {
    try {
        const {role} = req.params;
        const users = await User.find({role: role.toUpperCase()});
        // res.status(200).json(users);
        res.json({
            status: 'ok',
            users: users,
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

const getNumOfUsers = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'ADMIN') {
            return res.json({ status: 'error', error: 'You are not authorized to perform this action'});
        }
        const {role} = req.params;
        if (role.toUpperCase() === 'ALL') {
            const users = await User.find({});
            res.status(200).json({
                status: 'ok',
                user_count: users.length,
            })
        } else {
            const users = await User.find({role: role.toUpperCase()});
            res.json({
                status: 'ok',
                user_count: users.length,
            })
        }

    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

/* CREATE */

const createUser = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.exists({ username: username });
        if (user === null) {
            const newUser = User(req.body);
            await newUser.save();
            res.json({
                status: 'ok',
                message: 'new user created'
            });
        } else {
            throw Error
        }
    } catch (err) {
        res.json({
            status: 'error',
            message: 'username already used',
        })
    }
}


module.exports = {getUser, getUsers, getUserWithRole, getNumOfUsers, createUser}