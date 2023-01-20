const jwt = require('jsonwebtoken');

exports.createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRES_IN * 100,
    });

    return token;
};

exports.sendCookieToken = (res, token) => {
    res.cookie('jwt', token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 100 * 60
    });
};

exports.removeCookieToken = (res) => {
    res.cookie('jwt', 'loggedout', {
        httpOnly: true,
        maxAge: process.env.JWT_COOKIE_EXPIRES_IN,
        withCredentials: true
    });
};