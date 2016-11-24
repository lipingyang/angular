
var app = angular.module('market', ["highcharts-ng"]);

app.factory("dataModel", function ($http) {
    var factory = {};
    factory.historicalQuote = [];
    factory.productList = [];
    factory.signalRDat = [];
    factory.returnData = function (data, name) {
        if (name == "data") {
            factory.historicalQuote = data;
        }
        else if (name == "productList") {
            factory.productList = data
        }
        else if (name == "signalRData") {
            factory.signalRData = data 
            console.log(factory.signalRData)
        }
    }
    
    factory.getSignalR = function (symbol) {
        var connection = $.hubConnection('http://114.55.146.142:801/signalr', {
            useDefaultPath: false
        });
        var proxy = connection.createHubProxy('forexHub');
        proxy.on("onNewBasicProductInfoStr", function (symbol, data) {
            if (data != '*') {
                setTimeout(function () {
                    factory.signalRData = data
                },1000)
                
            }
        });
        connection.start().done(function () {
            proxy.invoke("subscribe", symbol, true);
        }).fail(function () {
            console.log('Could not connect');
        });

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
                "StartTimeUTC": Date.parse(new Date()) / 1000 - interval * 100,
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
            factory.returnData(ohlcData, "data")
        }).error(function () {
            console.log("error")
        });
    }
    return factory
})

app.controller('MarketController', function ($scope, $http, $timeout, dataModel) {

    $scope.dataModel = dataModel;

    dataModel.getProductList();
    var store = this;
    $scope.$watch('dataModel.productList', function (newData, oldData) {
        if (newData.length != 0) {
            console.log('getProductList is successed')
            var tempList = [];
            symbolToIndex = {};
            for (var i = 0; i < newData.length; i++) {
                tempList[i] = { price: "0", name: newData[i].Symbol, display: newData[i].SymbolDisplay, color: "" };
                symbolToIndex[newData[i].Symbol] = i;
            }
            store.products = tempList;

            var signalRSymbol = [];
            for (var i = 0; i < tempList.length; i++) {
                signalRSymbol.push(tempList[i].name)
            }
            console.log(signalRSymbol)
            signalRSymbol = signalRSymbol.join(";")
            console.log(signalRSymbol)
            dataModel.getSignalR(signalRSymbol);
        } else {
            console.log('getProductList is falied')
        }

    }, true)
    //获取signalR数据 datamodel
    $scope.$watch('dataModel.signalRData', function (newData, oldData) {
        if (newData != undefined) {
            data = newData;
            data = data.split("-");
            var symbol = data[0];
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
        } else {
            console.log('signalRData is failed')
        }

    }, true)

    setInterval(function () {
        $scope.$digest();
    }, 1)

    $scope.clickAndGetSymbol = function ($event) {
        //传入highstock的symbol
        dataModel.getData(store.products[this.$index].name, 60);
        var symbol = store.products[this.$index].name;
        $scope.interval = function (interval) {
            dataModel.getData(symbol, interval);
        }
    }
    $scope.$watch('dataModel.historicalQuote', function (newData, oldData) {
        if (newData.length > 0) {
            drawChart(newData)
        }
    }, true)
    //获取数据后画图  viewmodel
    function drawChart(data) {
        $scope.chartConfig = {
            options: {
                rangeSelector: {
                    inputEnabled: false,
                    enabled: false
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
