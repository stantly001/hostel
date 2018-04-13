
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./source/config/db'),
    hostelService = require('./source/routes/routes');

mongoose.Promise = global.Promise;
mongoose.connect(config.db).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use('/hms', hostelService);


const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});