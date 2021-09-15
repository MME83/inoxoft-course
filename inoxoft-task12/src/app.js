const express = require('express');
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const {
    authRouter,
    userRouter,
    buildingRouter,
    flatRouter
} = require('./resources/routers');

const handleErrors = require('./middleware/globalHandleErrors');

const { SERVER_RATELIMITS_PERIOD, SERVER_RATELIMITS_MAXREQUESTS } = require('./common/constants');

const app = express();

app.use(rateLimit({
    windowMs: SERVER_RATELIMITS_PERIOD, // 15 minutes
    max: SERVER_RATELIMITS_MAXREQUESTS // limit each IP to 1000 requests per windowMs
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

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
