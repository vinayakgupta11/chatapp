var app = angular.module("chatApp",['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise('/login');                                                        
 $stateProvider
 //The register stage is defined with corresponding url and controller
     .state('register', {
         url: '/register',
         templateUrl: '../templates/register.html',
         controller: 'registerController'
     })
     //The login stage is defined with corresponding url and controller
     .state('login', {
        url: '/login',
        templateUrl: '../templates/login.html',
        controller: 'loginController'
    })
    //The forget password stage is defined with corresponding url and controller
    .state('forgetPassword', {
        url: '/forget',
        templateUrl: '../templates/forget.html',
        controller: 'forgetController'
    })
    //The reset stage is defined with corresponding url and controller 
    .state('reset', {
        url: '/reset/:token',
        //the token is added at the end to open reset link with appropiate token
        templateUrl: '../templates/reset.html',
        controller: 'resetController'
    })
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: '../templates/dashboard.html',
        controller: 'usersController'
    })
});