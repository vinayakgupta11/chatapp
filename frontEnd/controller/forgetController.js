
app.controller("forgetController",  function ($scope,forgetService) {
  
    $scope.forgetUser = function () {
        let data={}
        data.email=$scope.email;
        console.log("printing scope", data);
        forgetService.forget(data)
 
    }
    
})