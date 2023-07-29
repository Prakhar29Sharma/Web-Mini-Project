const Unit = require('../models/Unit');

/* READ */

const getUnit = async (req, res) => {
    try {
        const { subjectCode, unitNum } = req.params;
        const unit = await Unit.findOne({subjectCode: subjectCode, unitNumber: unitNum});
        if (unit) {
            res.json({
                status: 'ok',
                unit: unit
            });
        } else {
            throw Error
        }
    } catch (err) {
        res.json({ status: 'error', error: 'invalid unit id' });
    }
};

const getUnits = async (req, res) => {
    try {
        const units = await Unit.find({});
        res.json({
            status: 'ok',
            units: units,
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

/* CREATE */

const createUnit = async (req, res) => {
    try {
        const unit = await Unit.findOne(req.body);
        if (!unit) {
            const newUnit = Unit(req.body);
            await newUnit.save();
            res.json({
                status: 'ok',
                message: 'added new unit',
            });
        } else {
            throw Error
        }

    } catch (err) {
        res.json({ status: 'error', error: 'unit already exists' });
    }
};

/* DELETE */

const deleteUnit = async (req, res) => {
    try {
        const id = req.params.id;
        const unit = await Unit.findOne({ _id: id });
        if (unit) {
            await Unit.deleteOne({ _id: id });
            res.json({
                status: 'ok',
                message: 'deleted unit with id ' + id,
            })
        } else {
            throw Error
        }
    } catch (err) {
        res.json({ status: 'error', error: 'invalid unit id'});
    }
};


module.exports = { getUnit, getUnits, createUnit, deleteUnit }