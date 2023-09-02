const Contributor = require("../models/Contributor");

/* READ */

const getContributor = async (req, res) => {
    try {
        const user = req.user;
        // if (user.role !== 'ADMIN' || user.role !== 'CONTRIBUTOR') {
        //     throw 'Unauthorized access';
        // }
        const { username } = req.params;
        const contributor = await Contributor.findOne({ username: username });
        if (contributor === null) {
            res.json({
                status: 'error',
                message: 'Contributor not found'
            });
        } else {
            res.json({
                status: 'ok',
                data: contributor
            })
        }
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

const getContributors = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'ADMIN') {
            throw 'Unauthorized access';
        }
        const contributors = await Contributor.find({});
        res.json({
            status: 'ok',
            data: contributors
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

const getSubjectsToContribute= async (req,res)=>{
    try {
        const user=req.user;
        const subjects=await Contribute.find({username:user.username})
        res.json({
            status:'ok',
            subjects:subjects
        })
    } catch (error) {
        res.json({status:"error",error:error})
    }
};

/* CREATE */

const createContributor = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'CONTRIBUTOR') {
            throw 'Unauthorized access';
        }
        const contributor = new Contributor(req.body);
        await contributor.save();
        res.json({
            status: 'ok',
            message: 'Contributor profile created successfully',
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

module.exports = {
    getContributor,
    getContributors,
    getSubjectsToContribute,
    createContributor,
};