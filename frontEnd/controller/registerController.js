app.controller("registerController",  function ($scope,registerService) {
  
    $scope.registerUser = function () {
        let data={}
        data.email=$scope.email;
     data.firstName=$scope.firstname;
     data.lastName=$scope.lastname;
     data.password=$scope.password;
        console.log("printing scope", data);
        registerService.register(data)
 
    }
    
})