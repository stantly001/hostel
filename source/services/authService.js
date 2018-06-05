var userRegSer = require('./registrationService');
var bcrypt = require('bcrypt');

/**
 * 
 * @param {*} userAuth 
 * @param {*} res 
 * Find Login User
 */
function authentication(userAuth, cb) {
    var user_name = userAuth.session.user_name;
    var password = userAuth.session.password;
    var ifPasTrue = false;
    var returnRes = ''
    var authObj = {}
    userRegSer.getUserByUserName(user_name, function (err, auth) {
        if (err) {
            return cb(err)
        } else if (!auth) {            
            userAuth.session.isValid = false
            returnRes = { message: 'User Not Found', data: userAuth.session }
            console.log(JSON.stringify(returnRes))
            return cb(err, returnRes)
        } else {
            // authObj = auth
            authObj.isValid = true;
            authObj.user_name = auth.user_name;
            authObj.email = auth.email;
            authObj._id = auth._id
            
            ifPasTrue = bcrypt.compareSync(password, auth.password)
            if (ifPasTrue == true) {
                
                returnRes = { message: 'Login Success !!!', data: authObj }
                console.log(JSON.stringify(authObj))
                return cb(err, returnRes)
            } else {
                userAuth.session.isValid = false
                returnRes = { message: 'Invalid Password', data: userAuth.session }
                console.log(JSON.stringify(returnRes))
                return cb(err, returnRes)
            }
        }
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * User Login
 */
function userLogin(req, res) {
    console.log(req)
    var sessionAuth = authSession(req);
    authentication(sessionAuth, function (err, data) {
        console.log(data)
        if (err) {
            return cb(err)
        } else {
            res.json(data)
        }
    })
}

/**
 * 
 * @param {*} req 
 * set session
 */
function authSession(req) {
    
    var authUser = req.body;
    req.session.user_name = authUser.user_name;
    req.session.password = authUser.password;
    return req
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Logout
 */
function logout(req, res) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                // return res.redirect('/');
                var data="logout successfully"
                return res.json(data);
            }
        });
    }
}


var auth = { userLogin, logout }

module.exports = auth;