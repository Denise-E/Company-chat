const path = require('path');

module.exports = {
    index: (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')),
    login: (req, res) => res.sendFile(path.resolve(__dirname, '../views/login.html')),
    register: (req, res) => res.sendFile(path.resolve(__dirname, '../views/register.html')),
}