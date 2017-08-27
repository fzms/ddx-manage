/**
 * Created by cxs on 2017/8/11.
 */
/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */
var mainApp = angular.module("mainApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
mainApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/
/**
 `$controller` will no longer look for controllers on `window`.
 The old behavior of looking on `window` for controllers was originally intended
 for use in examples, demos, and toy apps. We found that allowing global controller
 functions encouraged poor practices, so we resolved to disable this behavior by
 default.

 To migrate, register your controllers with modules rather than exposing them
 as globals:

 Before:

 ```javascript
 function MyController() {
  // ...
}
 ```

 After:

 ```javascript
 angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

 Although it's not recommended, you can re-enable the old behavior like this:

 ```javascript
 angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
 **/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
/*
 mainApp.config(['$controllerProvider', function($controllerProvider) {
 // this option might be handy for migrating old apps, but please don't use it
 // in new ones!
 $controllerProvider.allowGlobals();
 }]);
 */
/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/

/* Setup global settings */
mainApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout',
    };
    $rootScope.settings = settings;
    return settings;
}]);

/* Setup App Main Controller */
mainApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
}]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Rounting For All Pages */
mainApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    var userAgentInfo = navigator.userAgent;
    var isMobileflag = false;
    if (userAgentInfo.indexOf("Mobile") > 0) {
        isMobileflag = true;
    }
    if(top.mainMenus){
        for(var i=0;i<top.mainMenus.length;i++){
            if(top.mainMenus[i].text == "我的业务" && !isMobileflag){
                $urlRouterProvider.otherwise(top.mainMenus[i].url);
            }
            if(top.mainMenus[i].text == "勘查任务列表" && isMobileflag){
                $urlRouterProvider.otherwise(top.mainMenus[i].url);
            }
        }
    }
    $stateProvider
    // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',
                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/pages/scripts/dashboard.min.js',
                            'js/controllers/DashboardController.js',
                        ]
                    });
                }]
            }
        })
        // AngularJS plugins
        .state('fileupload', {
            url: "/file_upload.html",
            templateUrl: "views/file_upload.html",
            data: {pageTitle: 'AngularJS File Upload'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'angularFileUpload',
                        files: [
                            'assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                        ]
                    }, {
                        name: 'mainApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })
        // UI Select
        .state('uiselect', {
            url: "/ui_select.html",
            templateUrl: "views/ui_select.html",
            data: {pageTitle: 'AngularJS Ui Select'},
            controller: "UISelectController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    }, {
                        name: 'mainApp',
                        files: [
                            'js/controllers/UISelectController.js'
                        ]
                    }]);
                }]
            }
        })
        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "views/ui_bootstrap.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'mainApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })
        // Tree View
        .state('tree', {
            url: "/tree",
            templateUrl: "views/tree.html",
            data: {pageTitle: 'jQuery Tree View'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/jstree/dist/themes/default/style.min.css',
                            'assets/global/plugins/jstree/dist/jstree.min.js',
                            'assets/pages/scripts/ui-tree.min.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })
        // Form Tools
        .state('formtools', {
            url: "/form-tools",
            templateUrl: "views/form_tools.html",
            data: {pageTitle: 'Form Tools'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                            'assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                            'assets/global/plugins/typeahead/typeahead.css',
                            'assets/global/plugins/fuelux/js/spinner.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                            'assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                            'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                            'assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                            'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                            'assets/global/plugins/typeahead/handlebars.min.js',
                            'assets/global/plugins/typeahead/typeahead.bundle.min.js',
                            'assets/pages/scripts/components-form-tools-2.min.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })
        // Date & Time Pickers
        .state('pickers', {
            url: "/pickers",
            templateUrl: "views/pickers.html",
            data: {pageTitle: 'Date & Time Pickers'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/clockface/css/clockface.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            'assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                            'assets/global/plugins/clockface/js/clockface.js',
                            'assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
                            'assets/pages/scripts/components-date-time-pickers.min.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })
        // Custom Dropdowns
        .state('dropdowns', {
            url: "/dropdowns",
            templateUrl: "views/dropdowns.html",
            data: {pageTitle: 'Custom Dropdowns'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
                            'assets/global/plugins/select2/css/select2.min.css',
                            'assets/global/plugins/select2/css/select2-bootstrap.min.css',
                            'assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                            'assets/global/plugins/select2/js/select2.full.min.js',
                            'assets/pages/scripts/components-bootstrap-select.min.js',
                            'assets/pages/scripts/components-select2.min.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })
        // Advanced Datatables
        .state('datatablesAdvanced', {
            url: "/datatables/managed.html",
            templateUrl: "views/datatables/managed.html",
            data: {pageTitle: 'Advanced Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/datatables/datatables.min.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            'assets/global/plugins/datatables/datatables.all.min.js',
                            'assets/pages/scripts/table-datatables-managed.min.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })
        // Ajax Datetables
        .state('datatablesAjax', {
            url: "/datatables/ajax.html",
            templateUrl: "views/datatables/ajax.html",
            data: {pageTitle: 'Ajax Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/datatables/datatables.min.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/global/plugins/datatables/datatables.all.min.js',
                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/scripts/datatable.js',
                            'js/scripts/table-ajax.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })
        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main.html",
            data: {pageTitle: 'User Profile'},
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/pages/css/profile.css',
                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            'assets/pages/scripts/profile.min.js',
                            'js/controllers/UserProfileController.js'
                        ]
                    });
                }]
            }
        })
        // User Profile Dashboard
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "views/profile/dashboard.html",
            data: {pageTitle: 'User Profile'}
        })
        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account.html",
            data: {pageTitle: 'User Account'}
        })
        // User Profile Help
        .state("profile.help", {
            url: "/help",
            templateUrl: "views/profile/help.html",
            data: {pageTitle: 'User Help'}
        })
        // Todo
        .state('todo', {
            url: "/todo",
            templateUrl: "views/todo.html",
            data: {pageTitle: 'Todo'},
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/apps/css/todo-2.css',
                            'assets/global/plugins/select2/css/select2.min.css',
                            'assets/global/plugins/select2/css/select2-bootstrap.min.css',
                            'assets/global/plugins/select2/js/select2.full.min.js',
                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/apps/scripts/todo-2.min.js',
                            'js/controllers/TodoController.js'
                        ]
                    });
                }]
            }
        })
        // processEdit
        .state('processEdit', {
            url: "/processEdit?id",
            templateUrl: "views/modal/process/ProcessEdit.html",
            controller: "processEditController",
            controller: "projectPointController",
            controller: "processVariableController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/scripts/insertsome.js',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js',
                            'js/controllers/process/ProcessEditController.js',
                            'js/controllers/process/ProjectPointController.js',
                            'js/controllers/process/ProcessVariableController.js'
                        ]
                    });
                }]
            }
        })
        // pctivitiProcessEdit
        .state('activitiProcessEdit', {
            url: "/activitiProcessEdit?id",
            templateUrl: "views/modal/activiti/ActivitiProcessEdit.html",
            controller: "activitiProcessSeqFlowController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/scripts/insertsome.js',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js',
                            'js/controllers/activiti/ActivitiProcessController.js',
                            'js/controllers/activiti/ActivitiProcessEditController.js',
                            'js/controllers/activiti/ActivitiProcessPointController.js',
                            'js/controllers/activiti/ActivitiProcessSeqFlowController.js'
                        ]
                    });
                }]
            }
        })
        //测算方法
        .state('appraisalMethod', {
            params:{'parentId':null,'parentType':null,back:null,onlyRead:null,'type':null},
            url:'/appraisalMethod?parentId&parentType&back&onlyRead',
            cache:true,
            templateUrl: "views/modal/appraisal/AppraisalMethod.html",
            controller: "AppraisalMethodController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/controllers/appraisal/AppraisalMethodController.js'
                        ]
                    });
                }]
            }
        })
        //测算方法默认界面
        .state("appraisalMethod.default", {
            params:{'projectid':null,'cellNodeInstanceid':null,'processid':null,'appraisalFormulaValueid':null,'paramid':null,'formulaid':null,'changecallback':null},
            templateUrl: "views/modal/appraisal/appraisalMethodDefault.html"
        })
        //调查任务跳转
        .state('surveyTemplateInstance', {
            params:{'taskId':null,'onlyRead':null,'type':null},
            url:'/surveyTemplateInstance?taskId&onlyRead&type',
            templateUrl: "views/survey/surveyTemplateInstance.html",
            controller: "SurveyTemplateInstanceController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/controllers/survey/SurveyTemplateInstance.js',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    });
                }]
            }
        })
        //测算过程
        .state('appraisalMain',{
            params:{'projectid':null},
            url:'/appraisalMain?projectid',
            templateUrl:'views/modal/appraisal/appraisalMainDemo.html',
            controller:'appraisalMainControllerDemo',
            resolve:{
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/controllers/appraisal/AppraisalMainControllerDemo.js'
                        ]
                    });
                }]
            }
        })
        .state("testMessage", {
            url:'/testMessage',
            templateUrl: "views/template/paginglist.html",
            controller:'testMessageController',
            resolve:{
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/controllers/TestMessageController.js',
                            'assets/global/plugins/bootstrap-select/css/bootstrap-select.css',
                            'assets/global/plugins/bootstrap-select/js/bootstrap-select.js'
                        ]
                    });
                }]
            }
        })
        .state('business',{
            params:{'projectPage':null},
            url:'/business',
            templateUrl:'views/modal/appraisal/Business.html',
            controller:'BusinessController',
            resolve:{
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/controllers/appraisal/BusinessController.js',
                            'js/controllers/ProjectRegisterController.js',
                            'js/controllers/ProjectEntrustController.js',
                            'js/controllers/ProjectCompleteController.js',
                            'js/controllers/ProjectCheckController.js'
                        ]
                    });
                }]
            }
        })
        .state('businessClaim',{
            params:{'projectPage':null},
            url:'/businessClaim',
            templateUrl:'views/modal/appraisal/BusinessClaim.html',
            controller:'BusinessClaimController',
            resolve:{
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mainApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/controllers/BusinessClaimController.js'
                        ]
                    });
                }]
            }
        })


        /*假开法开发模式表路由*/
        .state('appraisalMethod.DevelopmentMethod',{
            params:{'appraisalFormulaValue':null},
            url:'/DevelopmentMethod',
            templateUrl:'views/modal/appraisal/DevelopmentMethod.html',
            controller:'DevelopmentMethodController',
            resolve:{
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            'js/controllers/appraisal/DevelopmentMethodController.js'
                        ]
                    });
                }]
            }
        })
        /*剩余法开发模式表路由*/
        .state('appraisalMethod.ResidueMethod',{
            params:{'appraisalFormulaValue':null},
            url:'/ResidueMethod',
            templateUrl:'views/modal/appraisal/ResidueMethodModal.html',
            controller:'DevelopmentMethodController',
            resolve:{
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            'js/controllers/appraisal/DevelopmentMethodController.js'
                        ]
                    });
                }]
            }
        })
    //动态加载菜单路由
    if(top.mainMenus)
    {
        for(var i=0;i<top.mainMenus.length;i++){
            var mainMenu=top.mainMenus[i];
            (function(mainMenu){
                $stateProvider.state(mainMenu.url,{
                    url : mainMenu.url,
                    templateUrl : mainMenu.templateUrl,
                    controller:mainMenu.controller,
                    resolve : {
                        loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load(mainMenu.controllers.split(','));
                        }]
                    }
                });
            })(mainMenu);
        }
    }
    //动态加载调查表路由
    if(top.surveyTemplateIds)
    {
        for(var i=0;i<top.surveyTemplateIds.length;i++){
            var surveyTemplateId=top.surveyTemplateIds[i].id;
            (function(surveyTemplateId){
                $stateProvider.state(surveyTemplateId,{
                    url : '/'+surveyTemplateId+'?id&taskId&onlyRead',
                    params:{'id':null,'taskId':null,'onlyRead':null},
                    templateUrl : 'views/modal/appraisal/' + surveyTemplateId + '.html',
                    controller:surveyTemplateId,
                    resolve : {
                        loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('js/controllers/appraisal/' + surveyTemplateId + '.js');
                        }]
                    }
                });
            })(surveyTemplateId);
        }
    }
    //动态加载评估方法路由
    if(top.appraisalApproaches)
    {
        for(var i=0;i<top.appraisalApproaches.length;i++) {
            var appraisalApproach = top.appraisalApproaches[i];
            (function (appraisalApproach) {
                $stateProvider.state("appraisalMethod." + appraisalApproach.id, {
                    params:{'projectid':null,'cellNodeInstanceid':null,'processid':null,'appraisalFormulaValueid':null,
                        'paramid':null,'formulaid':null,'changecallback':null},
                    templateUrl: appraisalApproach.viewclass,
                    controller: appraisalApproach.controller,
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(appraisalApproach.controllers.split(','));
                        }]
                    }
                });
            })(appraisalApproach);
        }
    }
}]);

/* Init global settings and run the app */
mainApp.run(["$rootScope", "settings", "$state","$location","$http", function($rootScope, settings, $state,$location,$http) {
    console.log("mainApp run");
    var protocol=$location.$$protocol;
    var host=$location.$$host;
    var port=$location.$$port;
    var absUrl=$location.$$absUrl;
    var url=protocol + "://" + host + (port?":":"") + port;
    var tag="#";
    var root=absUrl.replace(url,"");
    root=root.split(tag)[0];
    var index=root.lastIndexOf("/");
    root=root.substr(0,index);
    //这里修改了angularJs源码，给$http服务增加了root属性，当用$http请求资源时，如果是.do类型，将自动在url前加上root
    $http.root=root;
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
    $rootScope.mainMenus=top.mainMenus;
}]);