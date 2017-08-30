/**
 * Created by cxs on 2017/8/30.
 */
var mainApp = angular.module("mainApp", [
    "ngAnimate"
    // "ui.router",
    // "ui.bootstrap",
    // "oc.lazyLoad",
    // "ngSanitize",
    // "toaster"
]);
mainApp.controller('appController', ['$scope', '$rootScope', function($scope, $rootScope) {
    // $scope.$on('$viewContentLoaded', function() {});

    //接收headerController的事件
    $scope.$on('showState', function(d,data) {
        console.log(data);
    });
    //向navController传递事件
    $scope.$broadcast('showState',data);
}]);