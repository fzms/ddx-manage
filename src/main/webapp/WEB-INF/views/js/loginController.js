/**
 * Created by cxs on 2017/9/6.
 */
var loginApp=angular.module("login",[]);
loginApp.controller("loginController",function($scope,$http){
    //刷新验证码
    $scope.kaptcha=function(ev){
        console.log("success:"+ev.target.src);
        $('#kaptchaImage').hide().attr('src', '/kaptcha/generatecode?' + Math.floor(Math.random() * 100)).fadeIn();
        console.log("success:"+ev.target.src);
    };

    //点击提交
    $scope.submitForm=function(data){
        // console.log("name:"+$scope.login.loginName);
        // console.log("password:"+$scope.login.loginName);
        // console.log("kaptcha:"+$scope.login.kaptcha);
        if($scope.loginData.$valid) {
            $http.post("/login",$scope.login).then(function (data) {
                $scope.loginMessage=data.data;
                if($scope.loginMessage.status==="success"){
                    console.log($scope.loginMessage.msg);
                    $window.location.href = '/index?name='+$scope.login.loginName;
                }else{
                    $('#kaptchaImage').hide().attr('src', '/kaptcha/generatecode?' + Math.floor(Math.random() * 100)).fadeIn();
                }
            }, function () {
                console.log("login error");
            });
        }else{
            console.log($scope.login.loginName+"login error");
        };
    };
});