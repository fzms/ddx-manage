var app = angular.module('myApp', ['ui.grid', 'ui.grid.selection', 'ui.grid.edit',
    'ui.grid.exporter', 'ui.grid.pagination', 'ui.grid.resizeColumns', 'ui.grid.autoResize']);

app.controller('MyCtrl', function ($scope, i18nService, $http) {
    // 国际化；
    i18nService.setCurrentLang("zh-cn");

    // 初始每页显示多少个数据
    $scope.size = 10;

    //分页的传参
    $scope.params = {
        filter: '',
        pageNum: 1,  //初始页数
        pageSize: $scope.size,  //显示多少条数据
        sorts: [{field: "stuId", direction: "asc"}, {field: "name", direction: "asc"}],
        name: ""
    };

    //调取数据
    $scope.getAll = function () {
        $http.post("/stu/info/query", $scope.params).success(function (data) {
            // $scope.gridOptions.totalItems = data.totalElements;
            $scope.gridOptions.totalItems = data.data.total;
            $scope.roundSortIndexes = data.data.list;
            $scope.gridOptions.data = data.data.list;
        });
    };

    // $http.get(URL,{params: {"id":id}}).success(function(response, status, headers, config){})

    $scope.getAll();

    $scope.gridOptions = {
        columnDefs: [{
            field: 'stuId',
            displayName: '学号',
            width: '15%',
            enableColumnMenu: false,// 是否显示列头部菜单按钮
            enableHiding: false,
            suppressRemoveSort: true,
            enableCellEdit: false // 是否可编辑
        },
            {field: "name", displayName: '名字', enableCellEdit: false},
            {field: "sex", displayName: '性别', enableCellEdit: false},
            {field: "address", displayName: '地址', enableCellEdit: false},
            {field: "phone", displayName: '电话', enableCellEdit: false},
            {
                field: 'edit',
                displayName: '操 作',
                width: '150',
                enableCellEdit: false,
                fixed: true,
                pinnedRight: false,
                enableColumnMenu: false,
                enableSorting: false,
                cellTemplate: '<div class="ui-grid-cell-contents text-center"><button type="button" class="btn blue-madison btn-xs" ng-click="grid.appScope.edit(row)" ><i class="fa fa-edit"></i><span style="padding-left: 2px;">编辑</span></button>&nbsp;<button type="button" class="btn blue-madison btn-xs" ng-click="grid.appScope.delete(row)" ><i class="fa fa-remove"></i><span style="padding-left: 2px;">删除</span></button></div> '
            }
        ],


        showGroupPanel: true,
        paginationPageSizes: [5, 10, 15],
        paginationPageSize: $scope.size,
        //使用服务端分页
        useExternalPagination: true,//是否使用分页按钮
        useExternalSorting: true,  //是否使用自定义排序规则
        enableHorizontalScrollbar: 1, //grid水平滚动条是否显示, 0-不显示  1-显示
        enableVerticalScrollbar: 1,   //grid垂直滚动条是否显示, 0-不显示  1-显示
        exporterOlderExcelCompatibility: true,
        enableFullRowSelection: true,
        enableSelectAll: false,
        multiSelect: false,


        //----------- 选中 ----------------------
        enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
        enableFullRowSelection: true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
        enableRowHeaderSelection: true, //是否显示选中checkbox框 ,默认为true
        enableRowSelection: false, // 行选择是否可用，默认为true;
        enableSelectAll: true, // 选择所有checkbox是否可用，默认为true;
        enableSelectionBatchEvent: true, //默认true
        isRowSelectable: function (row) { //GridRow
            if (row.entity.age > 45) {
                row.grid.api.selection.selectRow(row.entity); // 选中行
            }
        },
        modifierKeysToMultiSelect: false,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
        multiSelect: true,// 是否可以选择多个,默认为true;
        noUnselect: false,//默认false,选中后是否可以取消选中
        selectionRowHeaderWidth: 30,//默认30 ，设置选择列的宽度；

        //--------------导出----------------------------------
        exporterAllDataFn: function () {
            //cxs备注
            // return getPage(1, $scope.gridOptions.totalItems);
        },
        exporterCsvColumnSeparator: ',',
        exporterCsvFilename: 'download.csv',
        exporterHeaderFilterUseName: true,
        exporterMenuCsv: true,
        exporterMenuLabel: "Export",
        exporterMenuPdf: true,
        exporterOlderExcelCompatibility: false,
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.footerStyle = {bold: true, fontSize: 10};
            return docDefinition;
        },
        exporterPdfFooter: {
            text: 'My footer',
            style: 'footerStyle'
        },
        exporterPdfDefaultStyle: {
            fontSize: 11, font: 'simblack' //font 设置自定义字体
        },
        exporterPdfFilename: 'download.pdf',

        exporterPdfFooter: function (currentPage, pageCount) {
            return currentPage.toString() + ' of ' + pageCount;
        },
        exporterPdfHeader: function (currentPage, pageCount) {
            return currentPage.toString() + ' of ' + pageCount;
        },
        exporterPdfMaxGridWidth: 720,
        exporterPdfOrientation: 'landscape',//  'landscape' 或 'portrait' pdf横向或纵向
        exporterPdfPageSize: 'A4',// 'A4' or 'LETTER'
        exporterPdfTableHeaderStyle: {
            bold: true,
            fontSize: 12,
            color: 'black'
        },
        exporterPdfTableLayout: null,
        exporterPdfTableStyle: {
            margin: [0, 5, 0, 15]
        },
        exporterSuppressColumns: ['buttons'],
        exporterSuppressMenu: false,

        //---------------api---------------------
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            //分页按钮事件
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.params.pageNum = newPage;
                $scope.params.pageSize = pageSize;
                $scope.getAll();
            });
            //行选中事件
            // $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
            //     if (row) {
            //         $scope.testRow = row.entity;
            //     }
            // });


        }
    };


    var getPage = function (curPage, pageSize) {
        var firstRow = (curPage - 1) * pageSize;
        $scope.gridOptions.totalItems = $scope.mydefalutData.length;
        console.log($scope.gridOptions.totalItems);
        $scope.gridOptions.data = $scope.mydefalutData.slice(firstRow, firstRow + pageSize);
        //或者像下面这种写法
        //$scope.myData = mydefalutData.slice(firstRow, firstRow + pageSize);
    };


    //表单清空
    $scope.allNull = function () {
        $scope.testRow.stuId = "";
        $scope.testRow.sex = "";
        $scope.testRow.name = "";
        $scope.testRow.address = "";
        $scope.testRow.phone = "";
    };

    //查询
    $scope.searchSec = function () {
        $scope.params.name = $('#q-name').val();
        $scope.getAll();
    };


    //新增
    $scope.addNew = function () {
        $scope.state = "add";
        $scope.myDis = false;
        $scope.myVar = true;
        //$scope.allNull();

    };

    //编辑
    $scope.edit = function (row, event) {
        $scope.state = "edit";
        $scope.myDis = true;//学号不可点击
        $scope.myVar = true;
        if (row) {
            $scope.testRow = row.entity;
        }
    };

    // 提交
    $scope.submitForm = function () {
        if ($scope.state == "edit") {
            //编辑
            $http.post("/stu/info/edit", $scope.testRow).success(function (data) {
                //刷新表格
                $scope.getAll();
            });

            $scope.myVar = false;
            $scope.myDis = false;
        } else if ($scope.state == "add") {
            if ($("#stuId").val() == "") {
                alert("学号不可为空");
            } else {
                //新增
                $http.post("/stu/info/add", $scope.testRow).success(function (data) {
                    if (data.status == 100) {
                        alert(data.subMsg);
                    }
                    //刷新表格
                    $scope.getAll();
                });
                $scope.myVar = false;
            }
        }
        else {
            alert("提交失败！");
        }

    };

    $scope.myVar = false;
    $scope.cancel = function () {
        $scope.myVar = false;
    };


    //删除
    $scope.delete = function (row) {
        $http.post(" /stu/info/delete/" + row.entity.stuId).success(function (data) {
            if (data) {
                $scope.getAll();
            }
            else {
                alert("删除失败！");
            }
        });
    }

});


angular.bootstrap(document.getElementById("tableBox"), ['myApp']);

// angular.bootstrap(document.getElementById("modelBox"), ['moderApp']);


// app.controller('editController', function ($scope,$uibModalInstance,$http,roundSortIndex,addNew,MessageBox) {
//     $scope.departments = [];
//     $scope.users = [];
//     $scope.roundSortGroups=[];
//     $scope.roundSortIndex = roundSortIndex;
//     //console.log(roundSortIndex);
//     /**
//      * 查找现有的所有roundSortGroups
//      * @param
//      */
//     $scope.findAllRoundSortGroups = function(){
//         $http.post("roundSortGroupController/getRoundSortGroups.do").success(function (data) {
//             $scope.roundSortGroups = data;
//         }).error(function(data){
//             MessageBox.alert("查询失败");
//         });
//     };
//     $scope.findAllRoundSortGroups();
//
//     //此处备注为cxs测试
//     // $scope.getRoundSortIndex=function(roundSortIndex){
//     //     $http.post("roundSortIndexController/findById.do?id=" + roundSortIndex.id).success(function(roundSortIndex){
//     //         $scope.roundSortIndex=roundSortIndex;
//     //     });
//     // };
//     $scope.getRoundSortIndex=function(roundSortIndex){
//         $scope.roundSortIndex=roundSortIndex;
//         //console.log(roundSortIndex);
//     };
//
//
//     $scope.findAllUsers = function(){
//         $http.post("userController/getAllAppraisals.do").success(function(users){
//             $scope.users=users;
//         });
//     }
//
//     //此处备注为cxs测试
//     // $scope.ok = function () {
//     //     console.log($scope.roundSortIndex);
//     //     $http.post("roundSortIndexController/saveRoundSortIndex.do",$scope.roundSortIndex).success(function(data){
//     //         if(data)
//     //             $uibModalInstance.close(true);
//     //         else
//     //         {
//     //             MessageBox.alert("保存失败！");
//     //         }
//     //     });
//     // };
//
//
//     $scope.cancel = function () {
//         $uibModalInstance.dismiss('cancel');
//     };
//
//
//     //表单验证
//     $scope.formRequired = function(){
//         $("#text").parent().removeClass('has-error');
//         $("#shape").parent().removeClass('has-error');
//         $("#remark").parent().removeClass('has-error');
//         if($("#text").val() == "")
//             $("#text").parent().addClass('has-error');
//         else if($("#shape").val() == "?")
//             $("#shape").parent().addClass('has-error');
//         else if($("#remark").val() == "?")
//             $("#remark").parent().addClass('has-error');
//         else
//             $scope.ok();
//         //console.log("ok");
//     }
//
//     //此处备注为cxs测试
//     // $scope.findAllDepartments = function(){
//     //     $http.post("departmentController/findAllDepartments.do").success(function (departments) {
//     //         $scope.departments = departments;
//     //     }).error(function(data){
//     //         MessageBox.alert("查询失败");
//     //     });
//     // };
//
//     $scope.findAllUsers();
//     if(addNew)
//         $scope.roundSortIndex = roundSortIndex;
//     else
//         $scope.getRoundSortIndex(roundSortIndex);
//
//
// });