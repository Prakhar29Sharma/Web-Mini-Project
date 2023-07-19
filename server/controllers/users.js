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

module.exports = {getUser, getUsers}
