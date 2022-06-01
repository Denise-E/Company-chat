const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

app.set('port', process.env.PORT || 3000);
app.set ("views", path.resolve (__dirname, "views"));
app.set("view engine", "ejs");

app.listen(app.get('port'), ()=> console.log('Listening on http://localhost:' + app.get('port')));

app.use(express.static(path.resolve(__dirname, "../public")));
app.use("/uploads",express.static(path.resolve(__dirname, "../uploads")));
app.use(express.urlencoded({extended:true}));

app.use(require('./router/main'));


app.use(session({
    secret: 'Secret!',
    resave: false,
    saveUninitialized: true
  }))