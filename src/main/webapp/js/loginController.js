/**
 * Created by cxs on 2017/9/6.
 */
var loginApp=angular.module("login",[]);
loginApp.controller("loginController",function($scope,$http){
    //刷新验证码
    $scope.kaptcha=function(ev){
        // console.log("success:"+ev.target.src);
        $('#kaptchaImage').hide().attr('src', '/kaptcha/generatecode?' + Math.floor(Math.random() * 100)).fadeIn();
    };

    //点击提交
    $scope.submitForm=function(path){
        // console.log("name:"+$scope.login.loginName);
        // console.log("password:"+$scope.login.loginName);
        // console.log("kaptcha:"+$scope.login.kaptcha);
        if($scope.loginData.$valid) {
            $http.post("/login",$scope.login).then(function (data) {
                $scope.loginMessage=data.data;
                if($scope.loginMessage.status==="success"){
                    console.log($scope.loginMessage.data["CLIENT_TOKEN"]);
                    console.log($scope.loginMessage.data["SESSION_USER_INFO"].realName);
                    console.log($scope.loginMessage.msg);
                    location.href="index.html?CLIENT_TOKEN="+$scope.loginMessage.data["CLIENT_TOKEN"];
                    // window.location.href = "index.html";

                }else{
                    $('#kaptchaImage').hide().attr('src', '/kaptcha/generatecode?' + Math.floor(Math.random() * 100)).fadeIn();
                }
                console.log("login error");
            });
        }else{
            console.log($scope.login.loginName+"login error");
        };
    };
});