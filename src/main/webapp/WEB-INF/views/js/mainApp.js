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
    $scope.$on('to-parent', function(d,data) {
        console.log(data);         //父级能得到值
    });
    $scope.$on('to-child', function(d,data) {
        console.log(data);         //子级得不到值
    });
}]);