const nodemailer = require('nodemailer');
var msg91 = require("msg91")('216254Ayubp06Hn5b002095', 'AJ-IND', 4)

var property_reader = require('../propertiesReader/reader')

function mail(req, res) {
    var returnPropREader = property_reader.mail_reader();

    var auth_user = returnPropREader.get('auth.user')
    var auth_pass = returnPropREader.get('auth.pass')

    var auth_host = returnPropREader.get('host.host_name')
    var auth_port = returnPropREader.get('host.port')
    var auth_secure = returnPropREader.get('host.secure')
    var auth_service = returnPropREader.get('host.service')

    nodemailer.createTestAccount((err, account) => {
        var transporter = nodemailer.createTransport({
            service: auth_service,
            auth: {
                user: auth_user,
                pass: auth_pass
            }
        });

        // let transporter = nodemailer.createTransport({
        //     host: 'mail.gmail.com',
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: 'arul.netphenix@gmail.com',
        //         pass: 'arul@8548'
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Hostel 👻" <' + auth_user + '>',
            to: 'ajose@netphenix.com', //psankareswari@netphenix.com list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world 1234?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.render('Send')
        });
    });
}


function sms(req, res) {
    var sms = {};
    sms.authKey = '';
    msg91.send('+919003387322', "MESSAGE", function (err, response) {
        console.log(err);
        console.log("MGS19-sms", response);
    });

}

var mailService = { mail, sms };
module.exports = mailService;
