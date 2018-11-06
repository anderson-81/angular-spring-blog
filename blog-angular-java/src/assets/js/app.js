var app = angular.module("SpringBlog", ['ngFileUpload']);

function GetSession(){
    AppService.GetSession().then(function (data) {
        if (data) {
            return false;
        } else {
            return true;
        }
    });      
}

   