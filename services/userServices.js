const userModel = require('../models/userModels.js');

exports.registerService = (data, callback) => {

    userModel.register(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.loginService = (data, callback) => {
    userModel.login(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.forgetService = (data, callback) => {
    userModel.forget(data, (err, result) => {
        if (err) {
            //console.log(("service error"));
            
            callback(err);
        } else {
            //console.log(("service pass"));
            callback(null, result);
        }
    })
}
exports.resetService = (data, callback) => {
    userModel.reset(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.getUsersService = (data, callback) => {
    userModel.getAllUsers(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}