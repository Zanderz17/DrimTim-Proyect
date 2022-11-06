const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.post('/users/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
            });
        }
    })(req, res, next);
});

router.post('/users/register', (req, res) => {
    const { correo, nombre, apellidos, rol, password } = req.body;
    User.findOne({ correo: req.body.correo }, async (err, doc) => {
        if (err) throw err;
        if (doc) {res.send("User alredy exists")}
        else {
            const newUser = await new User({ correo, nombre, apellidos, rol, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            res.send("Successfully Registered");
        }
    }) 
})

router.get('/users/login/return', (req, res) => {
    //console.log(req.user);
    res.send(req.user);
});

router.get('/users/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); 
        }
    });
    res.send("Logout completed");
});

module.exports = router;