/**
 * Created by cxs on 2017/8/30.
 */
// var mainApp=angular.module("headerApp",[]);
mainApp.controller("headerController",['$scope','$http','$rootScope','navService', function($scope,$http,$rootScope,navService) {
    // controll nav dowm and up
    //点击事件控制导航， $watch监听showNav值改变状态
    $scope.showNav=false;
    $scope.navToggle=function() {
        $scope.showNav=!($scope.showNav);
        // console.log($scope.showNav);
    };
    $scope.$watch("showNav", function(showNav) {
        navService.change(showNav);
    });

}]);
