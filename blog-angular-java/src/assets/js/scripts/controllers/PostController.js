app.controller("PostController", function ($scope, $http, $window, Upload, AppService) {

    AppService.GetSession().then(function (data) {
        if (data) {
            $scope.logged = true;
        } else {
            $scope.logged = false;
        }
    });

    $scope.List = function () {
        AppService.Token().then(function (data) {
            $scope.token = data;
            $scope.search = "";
            $scope.Search();
        });
    };

    $scope.Search = function () {
        BeginTable();
        $scope.show = false;
        $scope.status = true;
        var datas = {
            search: $scope.search,
            token: $scope.token
        };
        $http({
            method: 'POST',
            url: "/index",
            params: datas,
            async: false
        }).then(function Success(response) {
            $("#divTable").append("<table id='tablePost' data-page-length='5' ng-show='show'><thead><tr><th></th><th></th></tr></thead><tbody></tbody></table>");
            $.each(response.data.posts, function (idx, post) {
                $("tbody").append("<tr><td style='display:none;'>" + post.id + "</td><td><a href='/show/" + post.id + "'><h2 class='post-title'>" + post.title + "</h2><h6 class='post-subtitle'>" + post.briefing + "</h6></a><p class='post-meta'>Posted by <a>" + post.name + "</a> on " + post.datepost + "<span class='post-meta' id='span" + post.id + "'></span></p><hr></td></tr>");
                if (post.dateupdate !== undefined) {
                    $("#span" + post.id).text(" and edited on " + post.dateupdate);
                }
                post.dateupdate = null;
            });
            ConfigureTable();
            $scope.show = true;
            $scope.status = false;
            
            if (response.data.alert !== undefined) {
                toAlert("Information", response.data.alert, response.data.page);
            }   
            
            
        }, function Error(response) {
            $window.location.href = "/errors/505";
        });
    };

    $scope.Show = function (opc) {
        if (opc === 1) {
            AppService.CheckAuthorPost().then(function (data) {
                if (data.check === true) {
                    $window.location.href = "/edit/" + $scope.post.id;
                } else {
                    toAlert("Information", data.alert);
                }
            });
        } else {
            ShowPost();
        }
    };

    function ShowPost() {
        $http({
            method: 'PUT',
            url: $window.location.pathname,
            async: false
        }).then(function Success(response) {
            if (response.data.page === undefined) {
                //Initializing Post.
                $scope.post = {};
                $scope.post = response.data.post;
                $scope.author = response.data.author;
                $scope.picture = response.data.picture;
                //If Show on Form.
                if ($('#divEdit').length) {
                    AppService.Token().then(function (data) {
                        $scope.token = data;
                    });
                    document.getElementById("divEdit").style.display = "block";
                    $scope.post.picture = {};
                }else{
                    document.getElementById("divShow").style.display = "block";
                }
                
                if (response.data.alert !== undefined) {
                    toAlert("Information", response.data.alert, response.data.page);
                }   
                
            } else {
                toAlert("Information", response.data.alert, response.data.page);
            }
        }, function Error(response) {
            $window.location.href = "/errors/505";
        });
    }

    $scope.Reset = function () {
        $scope.post = {};
        $scope.post.title = "";
        $scope.post.briefing = "";
        $scope.post.text = "";
        $scope.post.picture = {};
        $("#picture").val("");
        $scope.errors = [];
        AppService.Token().then(function (data) {
            $scope.token = data;
        });
        $scope.errors = false,
        $scope.status = false;
        document.getElementById("divCreate").style.display = "block";
    };


    $scope.Create = function () {
        $scope.errors = [];
        $scope.status = true;
        var datas = {
            title: $scope.post.title,
            briefing: $scope.post.briefing,
            text: $scope.post.text,
            picture: $scope.post.picture,
            token: $scope.token
        };

        Upload.upload({
            url: '/new',
            data: datas,
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(function (resp) {
            var result = resp.data;
            if (result.errors !== undefined) {
                $scope.errors = result.errors;
                AppService.Token().then(function (data) {
                    $scope.token = data;
                });
            }
            if (result.alert !== undefined) {
                toAlert("Information", result.alert, result.page);
            }    
            $scope.status = false;
        }, function (resp) {
            $window.location.href = "/errors/505";
        }, function (evt) {
        });
    };

    $scope.Update = function () {

        $("#modalEdit").modal('toggle');

        $scope.errors = [];
        $scope.status = true;
        var datas = {
            id: $scope.post.id,
            title: $scope.post.title,
            briefing: $scope.post.briefing,
            text: $scope.post.text,
            picture: $scope.post.picture,
            token: $scope.token
        };

        Upload.upload({
            url: '/edit/update',
            data: datas,
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(function (resp) {
            var result = resp.data;
            if (result.errors !== undefined) {
                $scope.errors = result.errors;
                AppService.Token().then(function (data) {
                    $scope.token = data;
                });
            }
            if (result.alert !== undefined) {
                toAlert("Information", result.alert, result.page);
            }    
            $scope.status = false;
        }, function (resp) {
            $window.location.href = "/errors/505";
        }, function (evt) {
        });
    };

    $scope.Delete = function () {
        $scope.status = true;
        var link = "/delete/" + $scope.post.id + "/" + $scope.token;
        $http({
            method: 'DELETE',
            url: link,
            async: false
        }).then(function Success(response) {
            var result = response.data;
            if (result.alert !== undefined) {
                toAlert("Information", result.alert, result.page);
            }    
            $scope.status = false;
        }, function Error(response) {
            $window.location.href = "/errors/505";
        });
    };

});