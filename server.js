
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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

// app.use(express.static(path.join(__dirname, 'src')));

app.use('/hms', appRoutes);

app.set('view engine', 'html');
app.set('src', __dirname);

app.use(express.static(__dirname + '/assets', { index: false }));
// app.use(express.static(__dirname + '/dist', { index: false }));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

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



const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});