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
app.service("navService", function($rootScope) {
    return {
        change: function(showNav) {
            $rootScope.$broadcast("valueChange", showNav);
        }
    }
});

//路由配置
app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/product");
    $stateProvider
        .state("/product",{
            url:"/product",
            controller:"productController",
            templateUrl:"tpl/tablePage.html"
        })
        .state("/warehouse",{
            url:"/warehouse",
            controller:"warehouseController",
            templateUrl:"tpl/tablePage.html"
        })
        .state("/warehouse/material",{
            url:"/warehouse/material",
            controller:"materialController",
            templateUrl:"tpl/tablePage.html"
        })
        .state("/warehouse/parts",{
            url:"/warehouse/parts",
            controller:"partsController",
            templateUrl:"tpl/tablePage.html"
        })
        .state("/warehouse/tool",{
            url:"/warehouse/tool",
            controller:"toolController",
            templateUrl:"tpl/tablePage.html"
        })
        .state("/warehouse/machine",{
            url:"/warehouse/machine",
            controller:"machineController",
            templateUrl:"tpl/tablePage.html"
        })
});


app.controller("appController", ["$scope", "$rootScope", function($scope, $rootScope) {
    console.log("main");
}]);