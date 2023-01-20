const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const handleErrors = require('./handleErrors');
const handleFactory = require('./handleFactory');
const handleJWT = require('./handleJWT');

exports.signup = async (req, res, next) => {
    try {
        handleFactory.filterObj(req.body, 'name', 'email', 'password');

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            account: {
                accountId: req.body.account.accountId,
                balance: req.body.account.balance
            }
        });

        let token = handleJWT.createToken(newUser._id);
        handleJWT.sendCookieToken(res, token);

        res.status(201).json({
            create: 'sucess',
            token
        });
    } catch (err) {
        handleErrors.auth(err, res, 400);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.login(req.body.email, req.body.password);

        let token = handleJWT.createToken(user._id);
        handleJWT.sendCookieToken(res, token);

        res.status(200).json({
            status: 'success',
            token,
            user
        });
    } catch (err) {
        handleErrors.auth(err, res, 400);
    }
};

exports.logout = async (req, res, next) => {
    try {
        handleJWT.removeCookieToken(res);

        res.status(200).json({
            status: 'success',
            message: 'Logout succes'
        });
    } catch (err) {
        handleErrors.auth(err, res, 400);
    }
};

exports.checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            throw new Error("No token provided.")
        };

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodeToken.id);

        if (!user) throw new Error("User validation failed.");

        res.status(200).json({ 
            status: 'success', 
            id: user._id 
        });
    } catch (err) {
        handleErrors.auth(err, res, 400);
    } finally {
        next();
    }
};