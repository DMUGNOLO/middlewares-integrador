const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const getAllUsers = require('../helpers/getAllUsers');
const generateNewIdUser = require('../helpers/generateNewIdUser');
const writeUsers = require('../helpers/writeUsers');


module.exports = {
    showRegister: (req, res) => {
        return res.render('./user/user-register-form');
    },
    processRegister: (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors.errors)
            return res.render('./user/user-register-form', { errors: errors.errors, old: req.body })
        } else {
            const newUser = {
                id: generateNewIdUser(),
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                avatar: req.files[0].filename
            }
            writeUsers(newUser);
            return res.redirect('/')
        }
    },
    showLogin: (req, res) => {
        return res.render('./user/user-login-form');
    },
    processLogin: (req, res) => {
        const errors = validationResult(req);
        const users = getAllUsers();
        const email = req.body.email;
        const password = req.body.password;
       
        if(!errors.isEmpty()){
            return res.render('./user/user-login-form', { errors: errors.errors, old: req.body })
        }
        
        const userToLogin = users.find(user=>user.email == email)
        req.session.userLogged = userToLogin;

        if (req.body.remember){
            res.cookie('user', userToLogin.id, { maxAge: 1000 * 60 * 60 * 365 })
        }
        console.log(req.session.userLogged)
        console.log(req.cookies.user)

        return res.redirect('/');
    },
    showProfile: (req, res) => {
        const sessionInfo = req.session.userLogged;
        return res.render('user/profile', { sessionInfo: sessionInfo });
    },
    logout: (req, res) => {
        res.clearCookie('user')
        req.session.destroy();
        return res.redirect('/');
    }
}