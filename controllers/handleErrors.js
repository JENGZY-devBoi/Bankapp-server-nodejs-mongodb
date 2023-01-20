// ** Separate modules for readable errors
exports.auth = (err, res, statusCode) => {
    let errors = { message: '' };

    if (err.message === "No token provided.") {
        errors.message = err.message;
    }

    if (err._message === "User validation failed.") {
        errors.message = err._message;
    }

    if (err.code === 11000) {
        errors.message = "This account already exists in the system.";
    }

    if (err.message === "Invalid email or password.") {
        errors.message = "Invalid email or password.";
    }

    if (errors.message === "") {
        errors.message = "Something went wrong.";
    }

    res.status(statusCode).json({
        status: 'fail',
        errors
    });
};

exports.user = (err, res, statusCode) => {
    let errors = { message: '' };

    if (!err.messageFormat) {
        errors.message = "Invalid value or account are not exists in the system."
    }
    
    if (errors.message === "") {
        errors.message = "Something went wrong.";
    }

    res.status(statusCode).json({
        status: 'fail',
        errors
    });
};

exports.transac = (err, res, statusCode) => {
    let errors = { message: '' };

    
    if (err.message === "Insufficient balance for the transaction.") {
        errors.message = err.message;
    }
    
    if (err.message === `Invalid action. value must be [deposit,transfer,withdraw] only.`) {
        errors.message = err.message;
    }
    
    if (err.message === "Invalid amount, value must be a number or a none-negative number.") {
        errors.message = err.message;
    }
    
    if (!err.messageFormat) {
        errors.message = "Invalid value or account are not exists in the system."
    }
    
    if (err.message === "Missing or incomplete in the request body.") {
        errors.message = err.message;
    }  
    
    if (err.message === "Cannot be transferred to the current logged in account.") {
        errors.message = err.message;
    }

    if (errors.message === "") {
        errors.message = "Something went wrong.";
    }
    
    res.status(statusCode).json({
        status: 'fail',
        errors
    });
}