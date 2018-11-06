app.controller("LoginController", function ($scope, $http, $window, AppService) {

    AppService.GetSession().then(function (data) {
        if (data) {
            $scope.logged = true;
        } else {
            $scope.logged = false;
        }
    });

    $scope.usersys = {};
    
    $scope.Reset = function () {
        $scope.usersys.username = "user";
        $scope.usersys.password = "user";
        $scope.errors = [];
        AppService.Token().then(function (data) {
            $scope.token = data;
        });
        $scope.errors = false;
        $scope.status = false;
        document.getElementById("divLogin").style.display = "block";
    };

    $scope.Login = function () {
        $scope.status = true;
        $scope.errors = [];

        var datas = {
            username: $scope.usersys.username,
            password: $scope.usersys.password,
            token: $scope.token
        };

        $http({
            method: 'POST',
            url: '/login',
            async: false,
            params: datas
        }).then(function successCallback(response) {
            var result = response.data;
            if (result.alert !== undefined) {
                toAlert("Information", result.alert, result.page);
            }    
            if (result.errors !== undefined) {
                $scope.errors = result.errors;
            }
            $scope.status = false;
        }, function errorCallback(response) {
            $scope.status = false;
            $window.location.href = "errors/505";
        });
    };

    $scope.Logout = function () {
        $http({
            method: 'GET',
            url: '/logout',
            async: false
        }).then(function successCallback(response) {
            var result = response.data;
            if (result.alert !== undefined) {
                toAlert("Information", result.alert, result.page);
            }    
            $scope.status = false;
        }, function errorCallback(response) {
            $window.location.href = "/errors/505";
        });
    };
    
    $scope.GetSession = function () {
        AppService.GetSession().then(function (data) {
            if(data === null){
                $scope.logged = false;
            }else{
                $scope.logged = true;
            }
        });
    };
});