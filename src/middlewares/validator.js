const { body } = require('express-validator');
const path = require('path');
const bcrypt = require("bcryptjs")
const getAllUsers = require('../helpers/getAllUsers');

module.exports = {
    login: [
        body('email')
            .notEmpty()
                .withMessage('El campo email es obligatorio')
                .bail()
            .isEmail()
                .withMessage('Ingresar un email válido')
                .bail()
            .custom((value, { req })=>{
                const users = getAllUsers();
                const password = req.body.password;
                const userFound = users.find(user=>value == user.email);
                if(userFound && bcrypt.compareSync(password, userFound.password)){
                    return true;
                }
                return false;
            })
                .withMessage('Email o contraseña inválidos')
    ],
    register: [
        body('email')
            .notEmpty()
                .withMessage('El campo email esta vacío')
                .bail()
            .isEmail()
                .withMessage('Ingresar un email válido')
                .bail()
            .custom((value, { req })=>{
                const users = getAllUsers();
                const userFound = users.find(user=>value == user.email);
                return !userFound;
            })
                .withMessage('El email ingresado no está disponible')
                .bail(),
        body('password')
            .notEmpty()
                .withMessage('El campo password es obligatorio')
                .bail()
            .isLength({ min: 6 })
                .withMessage('La contraseña debe tener como mínimo 6 caracteres')
                .bail()
            .custom((value, { req })=>{
                if(req.body.retype){
                    return igualRetype = value == req.body.retype;
                }
                return true;
            })
                .withMessage('Las contraseñas no coinciden'),
        body('retype')
            .notEmpty()
            .withMessage('El campo confirmar password es obligatorio')
            .bail(),
        body('avatar')
            .custom((value, { req }) => {
                return req.files[0];
            })
                .withMessage('La imagen es obligatoria')
                .bail()
            .custom((value, { req }) => {
                const imageExtName = path.extname(req.files[0].originalname);
                return imageExtName == '.jpg' || imageExtName == '.png' || imageExtName == '.jpeg'
            })
                .withMessage('La imagen no tiene una extension válida')
                .bail(),
    ]
}