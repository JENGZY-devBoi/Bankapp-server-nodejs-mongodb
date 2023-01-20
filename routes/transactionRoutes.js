const express = require('express');
const authController = require('./../controllers/authController');
const transactionController = require('./../controllers/transactionController');

const route = express.Router();

route.put('/deposit', transactionController.deposit);
route.put('/withdraw', transactionController.withdraw);
route.put('/transfer', transactionController.transfer);

route.post('/recieves', transactionController.getRecieves);
route.post('/transfers', transactionController.getTransfers);

module.exports = route;