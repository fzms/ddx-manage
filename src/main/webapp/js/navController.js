/**
 * Created by cxs on 2017/8/28.
 */
// var mainApp=angular.module("navApp",[]);
app.controller("navController", function($scope,$http,$rootScope,navService,crumbService) {
    //controll nav dowm and up
    //$接收event和data
    $scope.$on("valueChange",function(e,m){
        $scope.showNav=m;
        // console.log("showNav:"+$scope.showNav);
    });

    //导航的权限管理，当flag为1的时候显示，当flag为0的时候不显示
    $scope.navList = [
        {
            "name": "a管理", "url": "/product", "icon": "fa-calendar", "flag": "0"
        },
        {
            "name": "b管理", "url": "/product", "icon": "fa-calendar", "flag": "0"
        },
        {
            "name": "产品管理", "url": "/product", "icon": "fa-calendar", "flag": "1"
        },
        {
            "name": "仓库管理", "url": "/warehouse", "icon": "fa-home", "flag": "1",
            "subNav": [
                {
                    "name": "原料管理", "url": "/warehouse/material", "icon": "fa-envira"
                },
                {
                    "name": "配件管理", "url": "/warehouse/parts", "icon": "fa-unlock"
                },
                {
                    "name": "工具管理", "url": "/warehouse/tool", "icon": "fa-wrench"
                },
                {
                    "name": "机器管理", "url": "/warehouse/machine", "icon": "fa-rocket"
                }
            ]
        },
        {
            "name": "订单管理", "url": "/order", "icon": "fa-gavel", "flag": "1"
        },
        {
            "name": "客户管理", "url": "/customer", "icon": "fa-handshake-o", "flag": "1"
        },
        {
            "name": "员工管理", "url": "/staff", "icon": "fa-user", "flag": "1"
        },
        {
            "name": "系统管理", "url": "/system", "icon": "fa-gears", "flag": "1",
            "subNav": [
                {
                    "name": "账号管理", "url": "/system/account", "icon": "fa-fort-awesome"
                },
                {
                    "name": "菜单管理", "url": "/system/menu", "icon": "fa-flag"
                }
            ]
        }
    ];
    //第一种写法
    $scope.actionMark={a:$scope.navList[0].name,b:$scope.navList[0].subNav ? $scope.navList[0].subNav[0].name:""};
    // console.log($scope.actionMark);

    // 第二种写法,后面navMenuActive加上判断
    // $scope.actionMark=undefined;

    $scope.changeNavMenu = function (a,b){
        $scope.actionMark={
            a:a,
            b:b
        };
        // console.log($scope.actionMark);
    };
    $scope.navMenuActive = function (a,b){

        // 第二种写法
        // if($scope.actionMark===undefined){
        //     return false;
        // }

        if(b===undefined){
            return $scope.actionMark.a===a;
        }else{
            return $scope.actionMark.a===a &&  $scope.actionMark.b===b;
        }
    };
    $scope.$watch("actionMark",function(actionMark){
        crumbService.change(actionMark);
    });
});