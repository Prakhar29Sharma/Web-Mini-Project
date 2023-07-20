const User = require('../models/User');

/* READ */

const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

const getUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

const getUserWithRole = async (req, res) => {
    try {
        const {role} = req.params;
        const users = await User.find({role: role.toUpperCase()});
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

const getNumOfUsers = async (req, res) => {
    try {
        const {role} = req.params;
        if (role.toUpperCase() === 'ALL') {
            const users = await User.find({});
            res.status(200).json({
                user_count: users.length,
            })
        } else {
            const users = await User.find({role: role.toUpperCase()});
            res.status(200).json({
                user_count: users.length,
            })
        }

    } catch (err) {
        res.status(404).json({ error: err });
    }
}


module.exports = {getUser, getUsers, getUserWithRole, getNumOfUsers}
