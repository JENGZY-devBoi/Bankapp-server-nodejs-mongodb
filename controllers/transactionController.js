const User = require('./../models/userModel');
const handleFactory = require('./handleFactory');
const handleErrors = require('./handleErrors');

const isAction = (action) => {
    if (!["deposit", "transfer", "withdraw"].includes(action)) {
        throw Error(`Invalid action. value must be [deposit,transfer,withdraw] only.`);
    }
};

exports.deposit = async (req, res, next) => {
    try {
        const filteredBody = handleFactory.filterObj(req.body, 'action', 'amount', 'id')

        const { action, amount } = filteredBody;

        if (!action || !amount || !req.body.id) {
            throw Error("Missing or incomplete in the request body.");
        }
        isAction(action);

        const updateUser = await handleFactory.increaseBalance(
            { id: req.body.id, action, amount }
        );

        res.status(200).json({
            status: 'success',
            message: `Deposit success`,
            data: {
                updateUser
            }
        })
    } catch (err) {
        handleErrors.transac(err, res, 400);
    }
};

exports.withdraw = async (req, res, next) => {
    try {
        const filteredBody = handleFactory.filterObj(req.body, 'action', 'amount', 'id')

        const { action, amount } = filteredBody;

        if (!action || !amount || !req.body.id) {
            throw Error("Missing or incomplete in the request body.");
        }
        isAction(action);

        const updateUser = await handleFactory.decreaseBalance(
            { id: req.body.id, action, amount }
        );

        res.status(200).json({
            status: 'success',
            message: `Withdraw success`,
            data: {
                updateUser
            }
        })
    } catch (err) {
        handleErrors.transac(err, res, 400);
    }
};

exports.transfer = async (req, res, nex) => {
    try {
        const filteredBody = handleFactory.filterObj(req.body, 'action', 'amount', 'id', 'to')

        const { action, amount, to } = filteredBody;

        if (!action || !amount || !req.body.id || !to) {
            throw Error("Missing or incomplete in the request body.");
        }
        isAction(action);
            
        // find email(to, from)
        const dataRecieve = await User.findOne({ email: to });
        const { _id: id, email } = dataRecieve;

        if (email === req.body.email) {
            throw Error('Cannot be transferred to the current logged in account.')
        }
        
        // Update transfer account
        const updateTransfer = await handleFactory.decreaseBalance(
            { id: req.body.id, action, amount, email: req.body.to }
        );

        // Update recieve account
        const updateRecieve = await handleFactory.increaseBalance(
        { id: id, action, amount, email: req.body.email }
        );

        res.status(200).json({
            status: 'success',
            message: `Transfer success`,
            data: {
                updateTransfer,
                updateRecieve
            }
        })
    } catch (err) {
        handleErrors.transac(err, res, 400);
    }
};

exports.getRecieves = async (req, res, next) => {
    console.log(req.body)
    try {
        const filteredBody = handleFactory.filterObj(req.params, 'id')

        if (!req.body.id) {
            throw Error("Missing or incomplete in the request body.");
        }

        const { account: { transaction }} = await User.findById({ _id: req.body.id });

        const newTransaction = transaction.filter(({action}) => 
            action === 'recieve'
        );

        res.status(200).json({
            status: 'success',
            data: {
                transaction: newTransaction
            }
        })
    } catch (err) {
        handleErrors.transac(err, res, 400);
    }
}

exports.getTransfers = async (req, res, next) => {
    try {
        const filteredBody = handleFactory.filterObj(req.body, 'id')

        if (!req.body.id) {
            throw Error("Missing or incomplete in the request body.");
        }

        const { account: { transaction }} = await User.findById({ _id: req.body.id });

        const newTransaction = transaction.filter(({action}) => 
            action === 'transfer'
        );

        res.status(200).json({
            status: 'success',
            data: {
                transaction: newTransaction
            }
        })
    } catch (err) {
        handleErrors.transac(err, res, 400);
    }
}