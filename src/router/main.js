const express = require('express');
const router = express.Router();
const main = require('../controller/main.js')

router.get('/', main.index);
router.get('/login', main.login);
router.get('/register', main.register);

module.exports = router;