const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), ()=> console.log('Listening on http://localhost:' + app.get('port')));

app.use(express.static(path.resolve(__dirname, "../public")));

app.use(require('./router/main'));