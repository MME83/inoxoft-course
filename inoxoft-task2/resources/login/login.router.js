const router = require('express').Router();
const User = require('../users/user.model');

const loginService = require('./login.service');


router.route('/').post(async (req, res) => {    
    const { login, password } = req.body;

    const user = await loginService.getUserIfLogin(login, password);

    if (!user) {
        res.status(404).redirect("/signup");
        return;
    } else {
        res.status(301).redirect(`/signin?login=${user.login}&name=${user.name}&age=${user.age}`);
    }
});

module.exports = router;