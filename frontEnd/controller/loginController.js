
app.controller("loginController",  function ($scope,loginService) {
  
    $scope.loginUser = function () {
        let data={}
        data.email=$scope.email;
     data.password=$scope.password;
        console.log("printing scope", data);
        loginService.login(data)
 
    }
    
})