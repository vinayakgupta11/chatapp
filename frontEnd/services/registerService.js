//var app = angular.module('myApp', []);
app.service('registerService', function ($http) {

    this.register = function (inputData) {
        console.log("inputData",inputData);
        
        $http({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: inputData
        })
        .then(function (success) {
            console.log("data after api call", success);
        }, function (error) {
            console.log("data after api call", error);
        })
    }
})

app.service('loginService', function ($http,$state) {

    this.login = function (inputData) {
        console.log("inputData",inputData);
        
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: inputData
        })
        .then(function (success) {
            $state.go('dashboard')
            console.log("data after api call", success);
        }, function (error) {
            console.log("data after api call", error);
        })
    }
})

app.service('forgetService', function ($http) {

    this.forget = function (inputData) {
        console.log("inputData",inputData);
        
        $http({
            method: 'POST',
            url: 'http://localhost:3000/forget',
            data: inputData
        })
        .then(function (success) {
            console.log("data after api call", success);
        }, function (error) {
            console.log("data after api call", error);
        })
    }
})

app.service('resetService', function ($http) {

    this.reset = function (inputData,token) {
     //   console.log("inputData",inputData);
        
        $http({
            method: 'POST',
            url: 'http://localhost:3000/reset',
            headers: {
                'token': token
              },
            data: inputData
        })
        .then(function (success) {
            console.log("data after api call", success);
        }, function (error) {
            console.log("data after api call", error);
        })
    }
})
app.service('userService', function ($http) {

    this.getdata = function (dataobj,callback) {
        
        $http({
            method: 'GET',
            url: 'http://localhost:3000/dashboard',
            //data: inputData
        })
        .then(function (success) {
            console.log("data after api call", success);
            callback(null,success.data.result);
         
        }, function (error) {
            callback(error,null)
            console.log("data after api call", error);
        })
    }
})

