/**
 * Created by cxs on 2017/8/28.
 */
var navApp=angular.module("navApp",[]);
navApp.controller("navController",function($scope){
    $scope.navList=[
        {
            "name":"产品管理","url":"a","icon":"fa-calendar","flag":"1",


        },
        {
            "name":"仓库管理","url":"a","icon":"fa-home","flag":"2",
            "subNav":[
                {
                    "name":"原料管理","url":"a","icon":"fa-envira"
                },
                {
                    "name":"配件管理","url":"a","icon":"fa-unlock"
                },
                {
                    "name":"工具管理","url":"a","icon":"fa-wrench"
                },
                {
                    "name":"机器管理","url":"a","icon":"fa-rocket"
                }
            ]
        },
        {
            "name":"订单管理","url":"a","icon":"fa-gavel","flag":"3"
        },
        {
            "name":"客户管理","url":"a","icon":"fa-handshake-o","flag":"4"
        },
        {
            "name":"员工管理","url":"a","icon":"fa-user","flag":"5"
        },
        {
            "name":"系统管理","url":"a","icon":"fa-gears","flag":"6"
        }
    ];
});