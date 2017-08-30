/**
 * Created by cxs on 2017/8/30.
 */
var mainApp = angular.module("mainApp", [
    // "ui.router",
    // "ui.bootstrap",
    // "oc.lazyLoad",
    // "ngSanitize",
    // "ngAnimate",
    // "toaster"
]);
mainApp.controller('appController', ['$scope', '$rootScope', function($scope, $rootScope) {
    // $scope.$on('$viewContentLoaded', function() {});
    console.log("1+2=3");
}]);