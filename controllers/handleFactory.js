const User = require('./../models/userModel');

const accountObjFindById = async (id) => {
    const { account } = await User.findById({ _id: id });

    return account;
}

const transacUpdate = async (...data) => {
    const { id, action, from, to, amount, newBalance, transaction } = data[0];

    const datetime = new Date(Date.now()).toISOString();

    const newTransaction = [
        ...transaction, 
        {
            datetime,
            from,
            to,
            action,
            amount,
            remain: newBalance
        }
    ]

    const account = {
        balance: newBalance,
        transaction: newTransaction
    };

    const updateUser = await User.findByIdAndUpdate(id, 
        { account },
        {
            new: true,
            runValidator: true
        });

    return updateUser;
};

const isStringNumber = (value) => {
    if (typeof value === 'string') {
        const parseValue = Number(value);
        return !isNaN(parseValue);
    }
    return true;
};

exports.filterObj = (obj, ...alloweFeilds) => {
    const newObj = {};

    Object.keys(obj).forEach(el => {
        if (alloweFeilds.includes(el)) newObj[el] = obj[el];
    });

    return newObj;
}

exports.increaseBalance = async (...data) => {
    let { id, action, amount, email } = data[0];
    
    if (!isStringNumber(amount) || Number(amount) <= 0) {
        throw Error("Invalid amount, value must be a number or a none-negative number.");
    }

    let from;
    if (email) {
        from = email;
        action = "recieve";
    };
    
    const { balance, transaction } = await accountObjFindById(id);

    const newBalance = Number(balance) + Number(amount);

    const updateUser = await transacUpdate({
        id,
        action,
        from,
        amount,
        newBalance,
        transaction,
    });

    return updateUser
};

exports.decreaseBalance = async (...data) => {
    let { id, action, amount, email} = data[0];

    if (!isStringNumber(amount) || Number(amount) <= 0) {
        throw Error("Invalid amount, value must be a number or a none-negative number.");
    }

    let to;
    if (email) {
        to = email;
        action = "transfer";
    }

    const { balance, transaction } = await accountObjFindById(id);

    const currBal = Number(balance) - Number(amount);
    if (currBal < 0) {
        throw Error('Insufficient balance for the transaction.');
    }
    const newBalance = currBal;

    const updateUser = await transacUpdate({
        id,
        action,
        to,
        amount,
        newBalance,
        transaction,
    });

    return updateUser
};

exports.filterObj;