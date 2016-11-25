
var app = angular.module('market', ["highcharts-ng"]);

app.factory("dataModel", function ($http) {
    var factory = {};
    factory.historicalQuote = [];
    factory.productList = [];
    factory.TempList = [];
    factory.signalRDat = [];
    factory.symbolToIndex = {}; //存储字典
    //获取getSignalR
    factory.getSignalR = function (symbol) {
        var connection = $.hubConnection('http://114.55.146.142:801/signalr', {
            useDefaultPath: false
        });
        var proxy = connection.createHubProxy('forexHub');
        proxy.on("onNewBasicProductInfoStr", function (symbol, data) {
            if (data != '*') {

                mdata = data.split("-");
                // console.log(data);
                //console.log(factory.symbolToIndex[mdata[0]]);
                //console.log(factory.TempList);
                factory.TempList[factory.symbolToIndex[mdata[0]]].price = mdata[7];
                factory.signalRData = data
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
        return $http({
            url: 'http://114.55.146.142:801/api/Data/GetProductMetalist',
            method: 'POST',
            data: {
                CatagoryId: '',
                Language: '',
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data) {
            factory.productList = data;
        }).error(function () {
            console.log("error")
        });
    }

    //获取tempList  组建下标字典,并循环订阅一次
    factory.getTempList = function (data) {
        var tempList = [];
        // symbolToIndex = {};
        for (var i = 0; i < data.length; i++) {
            // console.log(i);
            tempList[i] = { price: "0", name: data[i].Symbol, display: data[i].SymbolDisplay, color: "" };
            factory.symbolToIndex[data[i].Symbol] = i;
            //和服务端建立连接，通过SignalR有数据是给予推送
            // factory.getSignalR(data[i].Symbol);
        }
        factory.TempList = tempList;
        return tempList;
    }
    //历史数据
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
            factory.historicalQuote = ohlcData;
        }).error(function () {
            console.log("error")
        });
    }
    return factory
})

app.controller('MarketController', function ($scope, $http, $timeout, dataModel) {

    $scope.dataModel = dataModel;

    dataModel.getProductList();

    //调用服务，获得列表数据，并进行绑定
    dataModel.getProductList().success(function (data) {
        var tempList = dataModel.getTempList(data);
        $scope.products = tempList;
        var signalRSymbol = [];
        for (var i = 0; i < tempList.length; i++) {
            signalRSymbol.push(tempList[i].name)
        }
        console.log(signalRSymbol)
        signalRSymbol = signalRSymbol.join(";")
        console.log(signalRSymbol)
        dataModel.getSignalR(signalRSymbol);

    });

    $scope.$watch('$scope.price', function (n, o) {
        if (n > o) {
            console.log('big')
        } else {
            console.log('small')
        }
    })

    //获取signalR数据 datamodel
    $scope.$watch('dataModel.signalRData', function (newData, oldData) {
        var symbolToIndex = dataModel.symbolToIndex;
        if (newData > oldData) {
            console.log('big')
        }



        if (newData != undefined) {
            data = newData;
            data = data.split("-");
            console.log(data);
            var symbol = data[0];
            var oldprice = $scope.products[symbolToIndex[symbol]].price;
            console.log(oldprice)
            $scope.products[symbolToIndex[symbol]].price = data[7];
            var newprice = $scope.products[symbolToIndex[symbol]].price;
            console.log(newprice)
            if (oldprice == newprice) {

            } else if (oldprice > newprice) {
                $scope.products[symbolToIndex[symbol]].color = "blue"
            } else {
                $scope.products[symbolToIndex[symbol]].color = "red"
            }
            $timeout(
                function () {
                    $scope.products[symbolToIndex[symbol]].color = ""
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
