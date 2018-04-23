var userRegSer = require('./registrationService');
var bcrypt = require('bcrypt');

/**
 * 
 * @param {*} userAuth 
 * @param {*} res 
 */
function authentication(userAuth, res) {
    var user_name = userAuth.user_name;
    var password = userAuth.password;
    var ifPasTrue = false;
    userRegSer.getUserByUserName(user_name, function (err, auth) {
        if (err) {
            return err
            console.log(err)
        } else if (!auth) {
            res.json({ message: 'User Not Found', data: userAuth })
        } else {
            ifPasTrue = bcrypt.compareSync(password, auth.password)
            if (ifPasTrue == true) {
                res.json({ message: 'Login Success !!!', data: auth })
            }else{
                res.json({message: 'Invalid Password', data: userAuth})
            }
        }
    })
}


var auth = { authentication }

module.exports = auth;