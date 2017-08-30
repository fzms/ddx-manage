/**
 * Created by cxs on 2017/8/30.
 */
// var mainApp=angular.module("headerApp",[]);
mainApp.controller("headerController",['$scope','$http', function($scope,$http) {
    $scope.showNav=false ;
    $scope.navToggle=function() {
        $scope.showNav=!($scope.showNav);
        // console.log($scope.showNav);
        //向父级mainApp传导航的状态值
        $scope.$emit('showState',$scope.showNav);
    };
}]);
