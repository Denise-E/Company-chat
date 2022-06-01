const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require("sequelize");
const db = require('../../database/models');
const op = sequelize.Op;

module.exports = {
    index: (req, res) =>res.render('index', {
        user_id: req.session ? req.session.user : 'No hay ning[un usuario logeado'
    })
    ,
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
                    file: req.file ? req.file.filename : "default.png",
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
                
                if(req.body.remember){
                    res.cookie("email",req.body.email,{maxAge:1000*60*60*24*365})
                }

            req.session.user = exist
            //res.send(req.body)
            return res.redirect ("/")
            }).catch(err => res.send(err)) 
        
    },
    messages: (req,res) => {
        // Y el chat_id como lo defino????

            db.Message.create({ 
                message: req.body.message, 
                user_id: req.body.user_id,
                chat_id: 1,
    })
    .then(data=> res.send(data))
    .catch(err => res.send(err))   
    },
    logout: (req, res) => {
        delete req.session.user
        return res.redirect("/login")
    },
    search: (req, res) => {
        db.User.findAll({
            where: { name: { [op.like] : "%" + req.body.search + "%"}}
        })
        .then(results => {
            res.send(results)
            })
        }
}