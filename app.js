const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan)
}

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials: true,
}));
app.use(cookieParser(   ));
app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/transaction', transactionRoutes);


module.exports = app;