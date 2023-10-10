const Evaluator = require('../models/Evaluator');

/* READ */

const getEvaluator = async (req, res) => {
    try {
        const { username } = req.params;
        const evaluator = await Evaluator.findOne({ username: username });
        if (evaluator === null) {
            res.json({
                status: 'error',
                message: 'Evaluator not found'
            });
        } else {
            res.json({
                status: 'ok',
                data: evaluator
            })
        }
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

module.exports = {
    getEvaluator
}