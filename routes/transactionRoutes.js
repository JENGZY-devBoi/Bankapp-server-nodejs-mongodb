const express = require('express');
const authController = require('./../controllers/authController');
const transactionController = require('./../controllers/transactionController');

const route = express.Router();

route.put('/deposit', transactionController.deposit);
route.put('/withdraw', transactionController.withdraw);
route.put('/transfer', transactionController.transfer);

route.get('/recieves', transactionController.getRecieves);
route.get('/transfers', transactionController.getTransfers);

module.exports = route;