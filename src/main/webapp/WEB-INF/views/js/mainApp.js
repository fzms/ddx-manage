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

// controll nav dowm and up
//创建服务，返回一个change函数，函数广播showNav的值（全局）
mainApp.service('navService', function($rootScope) {
    return {
        change: function(showNav) {
            $rootScope.$broadcast("valueChange", showNav);
        }
    }
});


mainApp.controller('appController', ['$scope', '$rootScope', function($scope, $rootScope) {

}]);