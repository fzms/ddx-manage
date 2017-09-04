/**
 * Created by cxs on 2017/8/30.
 */
var app = angular.module("app", [
    // "ngAnimate",
    "ui.router",
    "oc.lazyLoad",
    "ui.grid",
    "ui.grid.selection",
    "ui.grid.edit",
    "ui.grid.edit",
    "ui.grid.edit",
    "ui.grid.exporter",
    "ui.grid.pagination",
    "ui.grid.resizeColumns",
    "ui.grid.autoResize",
    "ui.bootstrap"
    // "ngSanitize",
    // "toaster"
]);

// controll nav dowm and up
//创建服务，返回一个change函数，函数广播showNav的值（全局）
app.service('navService', function($rootScope) {
    return {
        change: function(showNav) {
            $rootScope.$broadcast("valueChange", showNav);
        }
    }
});


app.controller('appController', ['$scope', '$rootScope', function($scope, $rootScope) {

}]);