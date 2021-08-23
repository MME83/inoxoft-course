const router = require('express').Router();
const User = require('../users/user.model');

const loginService = require('./login.service');


router.route('/').post(async (req, res) => {    
    const { login, password } = req.body;

    const user = await loginService.getUserIfLogin(login, password);

    if (!user) {
        res.status(404).send(`<html><head>//server Response</head><body><h1>You have no account yet, pls SIGN UP</h1><button onclick="window.location.href='/signup/';">Sign UP</button></body></html>`);
        return;
    } else {
        res.status(301).redirect(`/signin?login=${user.login}&name=${user.name}&age=${user.age}`);
    }
});

module.exports = router;