const express = require('express');
const path = require('path');
const userRouter = require('./resources/users/user.router');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }

    next();
});

app.use('/users', userRouter);

module.exports = app;