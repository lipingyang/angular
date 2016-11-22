////See: https://github.com/pablojim/highcharts-ng
//var mychart = angular.module('mychart', ["highcharts-ng"]);

//mychart.controller('myctrl', function ($http, $scope) {

//    $scope.brandFnc = function ($event) {
//        console.log(this.$index)
        
//    }


//    var groupingUnits = [
//		[
//			'week', // unit name
//			[1] // allowed multiples
//		],
//		[
//			'month', [1, 2, 3, 4, 6]
//		]
//	]
//	var volume = [];
//	var ohlc = [];
//	var test = [];
//	var test_one = [];
//	var test_two = [];
//	var test_three = [];
//	var test_four = [];
	

//	$http.get('/App/json/product.json').success(function(data) {
//		//数据处理
//		for(var i = 0; i < data.length; i++) {
//			ohlc.push([
//				data[i][0], // the date
//				data[i][1], // open
//				data[i][2], // high
//				data[i][3], // low
//				data[i][4] // close
//			]);
//			volume.push([
//				data[i][0], // the date
//				data[i][5] // the volume
//			]);
//			test_one.push([
//				data[i][0],
//				data[i][1]
//			]);
//			test_two.push([
//				data[i][0],
//				data[i][2]
//			]);
//			test_three.push([
//				data[i][0],
//				data[i][3]
//			]);
//			test_four.push([
//				data[i][0],
//				data[i][4]
//			]);
//		}
//        //console.log(ohlc)
//		//数据处理结束
//		$scope.chartConfig = {
//			options: {
//				chart: {
//					zoomType: 'x'
//				},
//				rangeSelector: {
//					enabled: true,
//					selected: 0,
//				},
//				navigator: {
//					enabled: true
//				}
//			},
//			xAxis: {
//				dateTimeLabelFormats: {
//					millisecond: '%H:%M:%S.%L',
//					second: '%H:%M:%S',
//					minute: '%H:%M',
//					hour: '%H:%M',
//					day: '%m-%d',
//					week: '%m-%d',
//					month: '%y-%m',
//					year: '%Y'
//				}
//			},
//			yAxis: [{
//				labels: {
//					align: 'right',
//					x: -3
//				},
//				title: {
//					text: '股价'
//				},
//				top: '0%',
//				height: '60%',
//			}, {
//				labels: {
//					align: 'right',
//					x: -3
//				},
//				title: {
//					text: '成交量'
//				},
//				top: '65%',
//				height: '35%',
//				offset: 0,
//				lineWidth: 2
//			}, {
//				labels: {
//					align: 'right',
//					x: -3
//				},
//				top: '65%',
//				height: '35%',
//				offset: 0,
//				lineWidth: 2
//			}],
//			series: [{
//				data: ohlc,
//				name: '今日股价',
//				type: 'candlestick',
//				color: '#d00030',
//				upColor: '#fff',
//				dataGrouping: {
//					units: groupingUnits
//				}
//			},{
//				data: volume,
//				name: '成交量',
//				yAxis: 1,
//				color: '#e8b8c0',
//				type: 'column',
//				dataGrouping: {
//					units: groupingUnits
//				}
//			}],
//		  	credits: {
//		 		enabled: false
//		  	},
//			title: {
//				text: 'HighStock'
//			},
//			useHighStocks: true
//		}
		
//		$scope.daycount = "1";
		
//		$scope.removeSeries = function() {
//			var seriesArray = $scope.chartConfig.series;
//			seriesArray.splice(-2, 1)
//		}

//		$scope.addSeries = function() {
//			if($scope.daycount < 3 && $scope.daycount > 0) {
//				var seriesData = test_one
//			}
//			if($scope.daycount > 3) {
//				var seriesData = test_two
//			}
//			$scope.chartConfig.series.unshift({
//				data: seriesData,
//				yAxis: 0,
//				name: $scope.daycount + "日均线",
//				type: 'line',
//				dataGrouping: {
//					units: groupingUnits
//				}
//			})
//			$scope.daycount = "";
//		}

//		$scope.addPoints = function() {
//			if($scope.daycount < 3) {
//				var seriesData = test_three
//			}
//			if($scope.daycount > 3) {
//				var seriesData = test_four
//			}
//			$scope.chartConfig.series.unshift({
//				data: seriesData,
//				yAxis: 0,
//				name: $scope.daycount + "日M线",
//				type: 'line',
//				dataGrouping: {
//					units: groupingUnits
//				}
//			})
//			$scope.daycount = "";
//		};

//		$scope.addEMA = function() {
//			if($scope.daycount < 3) {
//				var seriesData = test_three
//			}
//			if($scope.daycount > 3) {
//				var seriesData = test_one
//			}
//			$scope.chartConfig.series.unshift({
//				data: seriesData,
//				yAxis: 2,
//				name: $scope.daycount + "日EMA线",
//				type: 'line',
//				dataGrouping: {
//					units: groupingUnits
//				}
//			})
//			$scope.daycount = "";
//		};

//	}); /*$http*/
//}); /*myapp*/