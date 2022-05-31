const path = require('path');
const express = require('express');
const router = express.Router();
const main = require('../controller/main.js')
const multer = require('multer');
const upload = multer ({storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve (__dirname, "../../uploads")),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
})});

router.get('/', main.index);
router.get('/login', main.login);
router.get('/register', main.register);

router.post("/save",[upload.single("file")], main.save);
router.post("/access", main.access); 

module.exports = router;