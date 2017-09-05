/**
 * Created by cxs on 2017/9/4.
 */
app.controller("machineController", function($scope,$http,$rootScope,i18nService) {
        console.log("machine page");
    // 国际化；
    i18nService.setCurrentLang("zh-cn");

    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{ field: 'name',
            displayName: '名字',
            width: '10%',
            enableColumnMenu: false,// 是否显示列头部菜单按钮
            enableHiding: false,
            suppressRemoveSort: true,
            enableCellEdit: false // 是否可编辑
        },
            { field: "age",displayName: '操 作1'},
            { field: "birthday",displayName: '操 作2'},
            { field: "salary",displayName: '操 作3'},
            {
                field: 'edit',
                displayName: '操 作',
                width: '120',
                fixed: true,
                pinnedRight: false,
                enableColumnMenu: false,
                enableSorting: false,
                cellTemplate: '<div class="ui-grid-cell-contents text-center"><a class="btn-xs btn-blue" data-ng-click="grid.appScope.edit(row)" ><i class="fa fa-edit"></i><span style="padding-left: 2px;">编辑</span></a>&nbsp;<a type="button" class="btn-xs btn-blue" data-ng-click="grid.appScope.delete(row)" ><i class="fa fa-remove"></i><span style="padding-left: 2px;">删除</span></a></div> '
            }
        ],

        enableCellEdit: false,//是否可编辑cell
        enableSorting: true, //是否排序
        useExternalSorting: false, //是否使用自定义排序规则
        enableGridMenu: true, //是否显示grid 菜单
        showGridFooter: true, //是否显示grid footer
        enableHorizontalScrollbar :  1, //grid水平滚动条是否显示, 0-不显示  1-显示
        enableVerticalScrollbar : 0, //grid垂直滚动条是否显示, 0-不显示  1-显示

        //-------- 分页属性 ----------------
        enablePagination: true, //是否分页，默认为true
        enablePaginationControls: true, //使用默认的底部分页
        paginationPageSizes: [10, 15, 20], //每页显示个数可选项
        paginationCurrentPage:1, //当前页码
        paginationPageSize: 10, //每页显示个数
        //paginationTemplate:"<div></div>", //自定义底部分页代码
        totalItems : 0, // 总数量
        useExternalPagination: true,//是否使用分页按钮


        //----------- 选中 ----------------------
        enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
        enableFullRowSelection : false, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
        enableRowHeaderSelection : true, //是否显示选中checkbox框 ,默认为true
        enableRowSelection : true, // 行选择是否可用，默认为true;
        enableSelectAll : true, // 选择所有checkbox是否可用，默认为true;
        enableSelectionBatchEvent : true, //默认true
        modifierKeysToMultiSelect: false ,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
        multiSelect: true ,// 是否可以选择多个,默认为true;
        noUnselect: false,//默认false,选中后是否可以取消选中
        selectionRowHeaderWidth:30 ,//默认30 ，设置选择列的宽度；



        //---------------api---------------------
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            //分页按钮事件
            gridApi.pagination.on.paginationChanged($scope,function(newPage, pageSize) {
                if(getPage) {
                    getPage(newPage, pageSize);
                }
            });
            //行选中事件
            $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row,event){
                if(row){
                    $scope.testRow = row.entity;
                }
            });
        }
    };

    var getPage = function(curPage, pageSize) {
        var firstRow = (curPage - 1) * pageSize;
        $scope.gridOptions.totalItems = mydefalutData.length;
        $scope.gridOptions.data = mydefalutData.slice(firstRow, firstRow + pageSize);
        //或者像下面这种写法
        //$scope.myData = mydefalutData.slice(firstRow, firstRow + pageSize);
    };

    var mydefalutData = [{ name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000" },
        { name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000" },
        { name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "50,000" },
        { name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "40,000" },
        { name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000" },
        { name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000" },
        { name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000" },
        { name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "40,000" },
        { name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "50,000" },
        { name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000" },
        { name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000" },
        { name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000" },
        { name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "40,000" },
        { name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "50,000" },
        { name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000" }];

    getPage(1, $scope.gridOptions.paginationPageSize);
    }
);