

    var app = angular.module('market', ["highcharts-ng"]);

    app.factory("dataModel", function ($http) {
        var factory = {};
        factory.historicalQuote = []
        factory.productList = []
        factory.returnData = function (data, name) {
            if (name == "data") {
                factory.historicalQuote = data;
            }
            else if (name == "productList") {
                factory.productList = data
            }               
        }

        //获取tempList  datamodel
        factory.getProductList = function () {
            $http({
                url: 'http://114.55.146.142:801/api/Data/GetProductMetalist',
                method: 'POST',
                data: {
                    CatagoryId: '',
                    Language: '',
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data) {
                factory.returnData(data, "productList")
            }).error(function () {
                console.log("error")
            });
        }

        factory.getData = function (symbol, interval) {
            $http({
                url: 'http://114.55.146.142:801/api/Data/GetHistoricalQuote',
                method: 'POST',
                data: {
                    "EndTimeUTC": Date.parse(new Date()) / 1000, //Date.parse(new Date()) / 1000  1479261817
                    "Interval": interval,
                    "StartTimeUTC": Date.parse(new Date()) / 1000 - interval*100,
                    "Symbol": symbol
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function (data) {
                var ohlcData = [];
                for (var i = 0; i < data.Close.length; i++) {
                    ohlcData.push([
                        data.Time[i] * 1000,
                        data.Open[i],
                        data.High[i],
                        data.Low[i],
                        data.Close[i]
                    ])
                }
                factory.returnData(ohlcData,"data")
            }).error(function () {
                console.log("error")
            });
        }
        return factory
    })

    app.controller('MarketController', function ($scope, $http, $timeout, dataModel) {

        $scope.dataModel = dataModel;

        $scope.$watch('dataModel.historicalQuote', function (newData, oldData) {
            if (newData.length > 0) {
                drawChart(newData)
            }           
        }, true)

        $scope.$watch('dataModel.productList', function (newData, oldData) {
            getTempList(newData)
        }, true)

        //初始画图   
        $scope.clickAndGetSymbol = function ($event) {
            //传入highstock的symbol
            dataModel.getData(store.products[this.$index].name, 60);
            var symbol = store.products[this.$index].name;
            $scope.interval = function (interval) {
                dataModel.getData(symbol, interval);
            }

            console.log(store)
        }


        //获取tempList  datamodel
        function getTempList(data) {
            var tempList = [];
            symbolToIndex = {};
            for (var i = 0; i < data.length; i++) {
                tempList[i] = { price: "0", name: data[i].Symbol, display: data[i].SymbolDisplay, color: "" };
                getSignalR(data[i].Symbol);
                symbolToIndex[data[i].Symbol] = i;
            }
            console.log(tempList)
            store.products = tempList;
        }
      
        dataModel.getProductList();
        var store = this;


        //获取signalR数据 datamodel
        function getSignalR(symbol) {
            var connection = $.hubConnection('http://114.55.146.142:801/signalr', {
                useDefaultPath: false
            });
            var proxy = connection.createHubProxy('forexHub');
            proxy.on("onNewBasicProductInfoStr", function (symbol,data) {
                if (data !== "*") {
                    data = data.split("-");
                    var oldprice = store.products[symbolToIndex[symbol]].price;
                    store.products[symbolToIndex[symbol]].price = data[7];
                    var newprice = store.products[symbolToIndex[symbol]].price;
                    if (oldprice == newprice) {

                    } else if (oldprice > newprice) {
                        store.products[symbolToIndex[symbol]].color = "blue"
                    } else {
                        store.products[symbolToIndex[symbol]].color = "red"
                    }
                    $timeout(
                        function () {
                            store.products[symbolToIndex[symbol]].color = ""
                        },
                        2000
                    );
                    $scope.$digest();
                }
            });
            connection.start().done(function () {
                proxy.invoke("subscribe", symbol, true);
            }).fail(function () {
                console.log('Could not connect');
            });

        }

        //获取数据后画图  viewmodel
        function drawChart(data) {
            $scope.chartConfig = {
                options: {
                    chart: {
                        zoomType: 'x'
                    },

                    rangeSelector:{
                        inputEnabled: false
                    },
                    navigator: {
                        enabled: true
                    },

                },
                series: [{
                    data: data,
                    type: 'candlestick',
                }],
                credits: {
                    enabled: false
                },
                useHighStocks: true
            }
        }

    });


