const userService = require('../services/userServices.js');
const expressValidator = require('express-validator');
exports.registerController = (req, res) => {
    let responseResult = {};
    req.checkBody('firstName', 'FirstName is required').not().isEmpty();
    req.checkBody('lastName', 'LastName is required').not().isEmpty();
    req.checkBody('password').isLength({ min: 6 });
    req.checkBody('email').isEmail();
    var errors = req.validationErrors();
    if (errors) {
        responseResult.success = false;
        responseResult.message = "validation error";
        responseResult.errors = errors;
        return res.status(422).send(responseResult);
    }
    
        var registerObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        console.log('api rg', registerObj);
        
        userService.registerService(registerObj, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.message = "registeration error";
                responseResult.errors = err;
                return res.status(400).send(responseResult);
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                responseResult.message = "registeration success";
                return res.status(200).send(responseResult);
            }
        })
    
}
exports.loginController = (req, res) => {
    let responseResult = {};
    userService.loginService(req.body, (err, result) => {
        if (err) {

            responseResult.success = false;
            responseResult.errors = err;
            //responseResult.message ="email not found";
            return res.status(400).send(responseResult);
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            responseResult.message = "login successful";
            responseResult.value=true;
            return res.status(200).send(responseResult);
        }

    })
}
exports.forgetController = (req, res) => {
    let responseResult = {};
    userService.forgetService(req.body, (err, result) => {
        if (err) {
            // console.log('---------------eroorrr')
            responseResult.success = false;
            responseResult.errors = err;
            //responseResult.message ="email not found";
            return res.status(400).send(responseResult);
        }
        else {
            // console.log("successss---------------------");

            responseResult.success = true;
            responseResult.result = result;
            responseResult.message = " successful";
            return res.status(200).send(responseResult);
        }

    })
}
exports.resetController = (req, res) => {
    var registerObj = {
        email: req.user.email,
        token: req.headers.token,
        password: req.body.password
    }
    console.log("register obj", registerObj)
    let responseResult = {};
    userService.resetService(registerObj, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.errors = err;
            //responseResult.message ="email not found";
            return res.status(400).send(responseResult);
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            responseResult.message = "password reset";
            return res.status(200).send(responseResult);
        }
    })
}
exports.getUsersController = (req, res) => {
    let responseResult = {};
    userService.getUsersService(req.body, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.errors = err;
            return res.status(400).send(responseResult);
        }
        else {
            console.log(responseResult);
            
            responseResult.success = true;
            responseResult.result = result;
            responseResult.message = " successful";
            console.log(responseResult);
            return res.status(200).send(responseResult);
        }

    })
}