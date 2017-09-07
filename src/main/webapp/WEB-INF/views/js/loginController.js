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
        console.log("name:"+$scope.login.loginName);
        console.log("password:"+$scope.login.loginName);
        console.log("kaptcha:"+$scope.login.kaptcha);
        if($scope.loginData.$valid) {
            $http.post("/login",$scope.login).then(function (data) {
                console.log("success");
            }, function (data) {
                console.log("login error");
                console.log($scope.login);
            });
        }else{
            console.log($scope.login.loginName+"login error");
        };
    };
});
//
// console.log("hahah");
// if($scope.loginData.$valid){
//     console.log($scope.loginData.username);
//     alert("提交成功！");
// }else{
//     alert("请确认登录用户名是否填写正确");
//     console.log($scope.loginData.username);
// }