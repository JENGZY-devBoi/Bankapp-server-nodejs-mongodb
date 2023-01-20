const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router
    .route('/')
    .post(authController.checkUser)
    .get(userController.getAllUser)

router
    .route('/login')
    .post(authController.login);

router
    .route('/logout')
    .post(authController.logout)

router
    .route('/signup')
    .post(authController.signup)


router
    .route('/:id')
    .get(
        userController.getUser
    )

module.exports = router;