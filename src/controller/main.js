const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require("sequelize");
const db = require('../../database/models');

module.exports = {
    index: (req, res) =>{ 
        db.Product.findAll()
        .then(result =>res.render('index', {
            user: req.session.user ? req.session.user.id : null
    }))
    .catch(err => res.send(err))
},
    login: (req, res) => res.render('login'),
    register: (req, res) => res.render('register'),
    save: (req,res) => {
        db.User.findOne({where: {email: req.body.email}})
        .then(exist => {
            if (exist) {
                return res.render("/register",{
                 style: "register",
                    errors:{
                         email:{
                             msg: "Este email ya está registrado",
                         }
                     }
                 })
            } else {

                db.User.create({ 
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    file: req.body.file,
                })
                }})
                .then(() => res.redirect("/login"))
                .catch(err => res.send(err))
                
    },

    access: (req,res) => {
        db.User.findOne({where: {email: req.body.email}})
            .then(exist => {
                if (!exist) {
                    return res.render("/login",{
                    style: "login",
                        errors:{
                            email:{
                                msg: "El email no existe",
                            }
                        }
                    })
                }
                if (!bcrypt.compareSync(req.body.password, exist.password)) {
                    return res.render("/login",{
                    style: "login",
                        errors:{
                            password:{
                                msg: "La contraseña es incorrecta",
                            }
                        }
                    })
                }
        
            req.session.user = exist
            return res.redirect ("/")
            }).catch(err => res.send(err))
        
    },
    messages: (req,res) => {
        /* Necesito que al mandar mensaje se guarde en la base de datos :
            Creo un Message - User id lo saco del input hiddenn, Y el chat como defino cuando crear uno y cuando no????
        */
    }
}