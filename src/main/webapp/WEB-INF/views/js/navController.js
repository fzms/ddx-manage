/**
 * Created by cxs on 2017/8/28.
 */
// var mainApp=angular.module("navApp",[]);
mainApp.controller("navController",['$scope','$http', function($scope,$http) {

        $scope.$on('to-parent', function(d,data) {
            console.log(data);        //平级得不到值
        });
        $scope.$on('to-child', function(d,data) {
            console.log(data);        //平级得不到值
        });


        $scope.navList = [
        {
            "name": "产品管理", "url": "a", "icon": "fa-calendar", "flag": "1"
        },
        {
            "name": "仓库管理", "url": "a", "icon": "fa-home", "flag": "2",
            "subNav": [
                {
                    "name": "原料管理", "url": "a", "icon": "fa-envira"
                },
                {
                    "name": "配件管理", "url": "a", "icon": "fa-unlock"
                },
                {
                    "name": "工具管理", "url": "a", "icon": "fa-wrench"
                },
                {
                    "name": "机器管理", "url": "a", "icon": "fa-rocket"
                }
            ]
        },
        {
            "name": "订单管理", "url": "a", "icon": "fa-gavel", "flag": "3"
        },
        {
            "name": "客户管理", "url": "a", "icon": "fa-handshake-o", "flag": "4"
        },
        {
            "name": "员工管理", "url": "a", "icon": "fa-user", "flag": "5"
        },
        {
            "name": "系统管理", "url": "a", "icon": "fa-gears", "flag": "6",
            "subNav": [
                {
                    "name": "账号管理", "url": "a", "icon": "fa-fort-awesome"
                },
                {
                    "name": "导航管理", "url": "a", "icon": "fa-flag"
                }
            ]
        }
    ];
    //第一种写法
    $scope.actionMark={a:$scope.navList[0].name,b:$scope.navList[0].subNav ? $scope.navList[0].subNav[0].name:""};
    console.log($scope.actionMark);

    // 第二种写法,后面navMenuActive加上判断
    // $scope.actionMark=undefined;

    $scope.changeNavMenu = function (a,b){
        // if(b===undefined){
        //
        //     // b=$scope.actionMark.find(m => m.name===a).subNav[0].name;
        //
        //     b=$scope.navList.find(function(m){
        //         return m.name===a;
        //     }).subNav[0].name;
        // };
        $scope.actionMark={
            a:a,
            b:b
        };
        console.log($scope.actionMark);
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

}]
);