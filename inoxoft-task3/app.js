const express = require('express');

const { authRouter, userRouter } = require('./resources/routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }

    next();
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

module.exports = app;
