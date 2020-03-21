const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database.config');
const db = mongoose.createConnection(config.url)
var nodemailer = require('nodemailer');
var util = require('../utility')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, lastName: {
        type: String,
        required: true
    },email: {
        type: String,
        required: true,
        unique: true
    },password: {
        type: String,
        required: true
    },value:{
        type:Boolean,
        default:null
    },token: {
        type: String,
        default: null
    },saltSecret: String
},{      timestamps: true
    });
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});
let User = db.model('note', userSchema);
// function userModel(){
// }
// userModel.prototype.register = (body , callback) => {
//  let user = {
//  }
// }
// module.exports = 
class userModel {
    hash(password) {
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    register(data, callback) {
        let user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,

        });
        user.save((error, result) => {
            if (error) {
                console.error(error);
                callback(error)
            } else {

                callback(null, result)

            }
        });
    }
    login(data, callback) {
        User.findOne({ email: data.email }, (err, res) => {
            if (err) {
                callback(err)
            } else if (!res) {

                callback({ message: "User not found." });
            }
            bcrypt.compare(data.password, res.password, (err, result) => {
                if (result) {
                    User.updateOne({email: res.email},{value:true},(err,resultt)=>
                    {if(err)
                        callback(err)
                        else
                        callback(null,res)
                    });
                    //return callback(null, res);
                } else {

                    console.log('login failed');
                    callback({ message: "Wrong password" });
                }
            })
        });
    }
    forget(data, callback) {
        User.findOne({ email: data.email }, (err, res) => {
            if (err) {
                callback(err)
            }
            else if (!res) {

                callback({ message: "User not found." });
            }
            
            
            var resetToken = jwt.sign({ email: res.email }, config.secret, { expiresIn: "7d" });
            //The token is generated and is stored in resetToken variable
            User.updateOne({ email: res.email }, { token: resetToken }, (err, info) => {
              // The token generated is stored in database
                if (err)
                    callback(err)
                else {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'tommoody1107@gmail.com',
                            pass: 'bridgelabs'
                        }
                    });
                    var mailOptions = {
                        from: 'tommoody1107@gmail.com',
                        to: res.email,
                        subject: 'Sending Email using Node.js',
                        text: 'reset password link!' + '  ' + 'http://localhost:3000/#!/reset/' + resetToken
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        // console.log(mailOptions);
                        if (error) {
                            callback(error);
                        } else {
                            callback(null, info);
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
            })
        });
    }
    reset(req, callback) {
        User.findOne({ email: req.email }, (err, res) => {
            if (err) {
                callback(err)
            }
            else {
                if (res.token == req.token) {
                    User.updateOne({ email: res.email }, { password: this.hash(req.password) }, (err, info) => {
                        if (err)
                            callback(err)
                        else
                            callback(null, res);
                    })
                    // callback(null,res);

                }
            }
        })
    }
    getAllUsers(req, callback) {
        User.find({}, { _id: 0, firstName: 1 }, function (err, res) {
            if (err)
                callback(err)
            else
                callback(null, res)
        })
    }

}
module.exports = new userModel();

