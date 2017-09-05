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

//懒加载配置
app.config(function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
    });
// 按模块化加载其他的脚本文件
app.constant('Modules_Config', [
    {
        name: 'treeControl',
        serie: true,
        files: []
    }
]);
app.config(["$ocLazyLoadProvider","Modules_Config",routeFn]);
function routeFn($ocLazyLoadProvider,Modules_Config){
    $ocLazyLoadProvider.config({
        debug:false,
        events:false,
        modules:Modules_Config
    });
};

//路由配置
app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/product");
    $stateProvider
        .state("/product",{
            url:"/product",
            controller:"productController",
            templateUrl:"tpl/tablePage.html",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("../js/controller/productController.js");
                }]
            }
        })
        .state("/warehouse",{
            url:"/warehouse",
            controller:"warehouseController",
            templateUrl:"tpl/tablePage.html",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("../js/controller/materialController.js");
                }]
            }
        })
        .state("/warehouse/material",{
            url:"/warehouse/material",
            controller:"materialController",
            templateUrl:"tpl/tablePage.html",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("../js/controller/materialController.js");
                }]
            }
        })
        .state("/warehouse/parts",{
            url:"/warehouse/parts",
            controller:"partsController",
            templateUrl:"tpl/tablePage.html",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("../js/controller/partsController.js");
                }]
            }
        })
        .state("/warehouse/tool",{
            url:"/warehouse/tool",
            controller:"toolController",
            templateUrl:"tpl/tablePage.html",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("../js/controller/toolController.js");
                }]
            }
        })
        .state("/warehouse/machine",{
            url:"/warehouse/machine",
            controller:"machineController",
            templateUrl:"tpl/tablePage.html",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("../js/controller/machineController.js");
                }]
            }
        })
});


app.controller("appController", ["$scope", "$rootScope", function($scope, $rootScope) {
    console.log("main");
}]);