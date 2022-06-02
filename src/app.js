const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const cookie = require("cookie-parser");
const server = require('http').Server(app);
const socketio = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);
app.set ("views", path.resolve (__dirname, "views"));
app.set("view engine", "ejs");

//app.listen(app.get('port'), ()=> console.log('Listening on http://localhost:' + app.get('port')));

//Configuración Socket.io
require('./sockets')(socketio); //Su ejecución

server.listen(app.get('port'), () => console.log("Listening server on  http://localhost:" +  app.get('port')));

app.use(express.static(path.resolve(__dirname, "../public")));
app.use("/uploads",express.static(path.resolve(__dirname, "../uploads")));

app.use(require("./middlewares/user"))

app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'Secret!',
    resave: false,
    saveUninitialized: true
  }));
  app.use(cookie());
  
  
  app.use(require('./router/main'));