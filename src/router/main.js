const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer ({storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve (__dirname, "../../uploads")),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
})});

const {index, login, register, messages, save, access, logout, search} = require('../controller/main.js')

router.get('/', index);
router.get('/login', login);
router.get('/register', register);

router.post('/', messages);
router.post("/save",[upload.single("file")], save);
router.post("/access", access); 
router.post("/logout", logout); 
router.post('/search', search);

module.exports = router;