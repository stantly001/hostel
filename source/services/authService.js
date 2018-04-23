var userRegSer = require('./registrationService');
function authentication(res) {
    userRegSer.getUserByUserName('aruljose', function(err, data){
    })
}


var auth = { authentication }

module.exports = auth;