const express = require('express');
var cors = require('cors')
var cookieParser = require('cookie-parser');
const webConfig = require('./webConfig.json');

const app = express();
const PORT = process.env.PORT || 3000;

var corsOptions = {
  credentials: true,
  origin: webConfig.frontend_url,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(cookieParser())

require('./startup/logging')();
require('./startup/routes')(app)
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

let server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));

module.exports = server;