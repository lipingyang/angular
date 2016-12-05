(function() {
    var message = angular.module('Message', []);
    message.factory('MessageModel', function ($http) {
      
        //获得菜单目录
        var factory = {};
        factory.GetMenulist = function () {
           return $http({
                url: 'http://114.55.146.142:801/api/Data/GetNewsMeta',
                method: 'GET',
           }).success(function (data) {
               return data;
                }).error(function () {
                    console.log("error")
                });
        }

        //获得列表内容目录
        factory.ListData = function (CateId = 'USA') {
            console.log(CateId);
            var stattime = (Date.parse(new Date()))/1000;
            var begintime = (Number(stattime) - Number(48 * 3600)).toString();
            var endtime = stattime.toString();
            
            console.log(begintime, endtime);
            return $http({
                url: 'http://114.55.146.142:801/api/Data/GetNewsBaseList',
                method: 'POST',
                data: {
                    CategoryId: CateId,
                    StartTime: begintime,
                    EndTime: endtime,
                    MaxCount: 20
                },
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data, status, headers, config) {
               
            }).error(function (data, status, headers, config) {
                console.log("error...");
            });
        }

        return factory;

       
    });
   
    //控制器模块，实现数据绑定
    message.controller('MessageController',function($scope,$http,MessageModel){
        //绑定menu
        console.log(MessageModel.GetMenulist());
         MessageModel.GetMenulist().success(function (data,status) {
             $scope.Menu = data;
             console.log(data)
             console.log(status);
         });
        //新闻列表模块获得数据并实现绑定
         $scope.ListData = MessageModel.ListData().success(function (data) {
             $scope.ListData = data;
             // console.log(data);
         });
         
         $scope.GetList = function (CateId) {
             MessageModel.ListData(CateId).success(function (data) {
                 $scope.ListData = data;
                 console.log(data);
             });
         };
        
    
    });



	
})();
