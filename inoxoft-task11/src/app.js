const express = require('express');
const expressFileUpload = require('express-fileupload');

const {
    authRouter,
    userRouter,
    buildingRouter,
    flatRouter
} = require('./resources/routers');

const handleErrors = require('./middleware/globalHandleErrors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }

    next();
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/buildings', buildingRouter);
app.use('/flats', flatRouter);
app.use(handleErrors);

module.exports = app;
