const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const userRouter = require('./resources/users/user.router');
const loginRouter = require('./resources/login/login.router');
const { users } = require('./resources/users/user.repository');

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }

    next();
});

app.use('/auth', loginRouter);
app.use('/users', userRouter);

//Render endpoints
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/signin', (req, res) => {
    const { login, name, age } = req.query;

    res.render('signin', { name, login, age });
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/users', (req, res) => {
    res.render('users', { title: "List of all users", users });
});

module.exports = app;