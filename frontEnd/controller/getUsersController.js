
app.controller("usersController", function ($scope, userService) {

    // $scope.getUser = function () 

    userService.getdata($scope, (err, data) => {
        if (err) {
            console.log("not----")
        }
        else {
            $scope.data = data;
        }

    })




})