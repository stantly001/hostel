
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    appRoutes = require('./source/routes/routes'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    dbConnection = require('./source/config/config');

var sessionDb = dbConnection.connection;

const app = express();
app.use(bodyParser.json());
app.use(cors());

sessionDb.on('error', console.error.bind(console, 'connection error:'));
sessionDb.once('open', function () {
    console.log("Connection Success !")
});
app.use(session({
    secret: 'hms service',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: sessionDb
    })
}));


const port = process.env.PORT || 4000;

app.use('/hms', appRoutes);


const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});