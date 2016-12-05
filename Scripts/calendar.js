(function() {
    var myapp = angular.module('calendar', []);
    myapp.controller('CalendarController', function ($scope, $http, GetCalendar) {
        //获得日历目录列表
	    $http({
	        url: 'http://114.55.146.142:801/api/Data/GetCalendarMeta',
	        method: 'GET',
	    }).success(function (data) {
	        $scope.ListCalendar = data.ListCalendarCategoryAndFormat;
	        console.log(data);
	        $("#datepicker").datepicker({
	            inline: true,
	            showOtherMonths: true,
	            onSelect: function (selectedDate) {//选择日期后执行的操作  
	                var times = (new Date(selectedDate).getTime()) / 1000;
	                //$("#selectDate").val(times);
	                $scope.selectDate = times;
	                $scope.$digest();
	                }
	        });
	        //打开页面执行初始化操作，获得最新日期的的日历事件
	        var timestamp = Date.parse(new Date());
	        GetCalendar.CalendarList(timestamp/1000)
            .success(function (data, status) {

                $scope.ListCalendarDetail = data;
                console.log(data);
            });
	    }).error(function () {
	        console.log("error")
	    });




        //获得GetCalendarDataAndEvent	  
	    //$scope.selectDate = "1479268800";
	   // var strtime = $scope.selectDate;
	    $scope.updated = -1;
	

	    $scope.getCalendar = function () {
	        $scope.updated++;
	        console.log($scope.updated);
	    }

	    $scope.$watch('selectDate', function (newValue, oldValue) {
	        if (newValue === oldValue) { return; } // AKA first run
	        $scope.updated++;
	        console.log($scope.updated);
	        console.log($scope);
	        GetCalendar.CalendarList($scope.selectDate)
	         .success(function (data, status) {

	             $scope.ListCalendarDetail = data;
	             console.log(data);
	         });
	    });
	      
    });

    //创建服务
    myapp.factory('GetCalendar', ['$http',
        function ($http) {
            var doRequest = function (selectetiem, path) {
                var selectetiem = selectetiem.toString();
                 var endtime = (Number(selectetiem) + Number(24 * 3600)).toString();
                //var selectetiem = "1479225600";
                //var endtime = "1479312000";
                console.log(selectetiem, endtime);
                return $http({
                    url: 'http://114.55.146.142:801/api/Data/GetCalendarDataAndEvent',
                    method: 'POST',
                    data: {
                        StartTime: selectetiem,
                        StopTime: endtime,
                        ProductId: null
                    },
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data, status, headers, config) {
                   // console.log("success..");
                   // console.log(data);
                   // $scope.ListCalendarDetail = data;
                }).error(function (data, status, headers, config) {
                    console.log("error...");
                });
            }
            return {
                CalendarList: function (selectetiem) {
                    return doRequest(selectetiem, 'CalendarList');
                }
            }

        }
    ]);



    
	
})();
