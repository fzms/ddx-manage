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
        if($scope.loginData.$valid) {
            $http.post("/login",$scope.loginData).then(function (data) {
                console.log("success");
            }, function (data) {
                console.log("login error");
                // console.log($scope.loginData);
            });
        }else{
            console.log($scope.loginData.loginName);
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