/**
 * Created by cxs on 2017/9/6.
 */
var loginApp=angular.module("login",[]);
loginApp.controller("loginController",function($scope,$http){
    //获取验证码
    $scope.kaptcha=function(ev){
        console.log("success:"+ev.target.src);
        $http.get("/kaptcha/generatecode").then(function(){
            $('#kaptchaImage').hide().attr('src', '/kaptcha/generatecode').fadeIn();
        },function(){
            console.log("error");
        });
    };

    //点击提交
    $scope.submitForm=function(){
        console.log("hahah");
        if($scope.loginData.$valid){
            console.log($scope.loginData.username);
            alert("提交成功！");
        }else{
            alert("请确认登录用户名是否填写正确");
            console.log($scope.loginData.username);
        }
    };
});