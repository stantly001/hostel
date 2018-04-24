mongoose = require('mongoose'),
config = require('./db'),

mongoose.Promise = global.Promise;
mongoose.connect(config.db).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);



module.exports = mongoose