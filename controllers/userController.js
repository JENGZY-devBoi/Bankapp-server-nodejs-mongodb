const User = require('../models/userModel');
const handleErrors = require('./handleErrors');

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id });

        res.status(200).json({
            status: 'success',
            user 
        });

    } catch (err) {
        handleErrors.user(err, res, 400);
    }
};


exports.getAllUser = async (req, res, next) => {
    try {
        const user = await User.find();

        res.status(200).json({
            status: 'success',
            user 
        });

    } catch (err) {
        handleErrors.user(err, res, 400);
    }
};