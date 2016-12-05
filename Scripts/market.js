
var app = angular.module('market', ["highcharts-ng"]);

app.factory("dataModel", function ($http) {
    var factory = {};
    factory.historicalQuote = [];
    factory.productList = [];
    factory.TempList = [];
    factory.signalRDat = [];
    factory.symbol = '';
    factory.signalRData = [];
    factory.symbolToIndex = {}; //存储字典
    factory.isSignalRConnected = false;
    //获取getSignalR

    var connection = $.hubConnection('http://114.55.146.142:801/signalr', {
        useDefaultPath: false
    });

    var proxy = connection.createHubProxy('forexHub');
    proxy.on("onNewBasicProductInfoStr", function (symbol, data) {
        if (data != '*') {
            mdata = data.split("-");
            factory.symbol = mdata[0];
            factory.signalRDat[factory.symbolToIndex[mdata[0]]] = factory.TempList[factory.symbolToIndex[mdata[0]]].price;
            factory.TempList[factory.symbolToIndex[mdata[0]]].price = mdata[7];
        }
    });
    
    factory.getSignalR = function () {       
        connection.start().done(function () {
            factory.isSignalRConnected = true
        }).fail(function () {
            factory.isSignalRConnected = false
        });
    }
    factory.subscribe = function (symbol) {
        setTimeout(function () {
            //console.log(factory.isSignalRConnected)
            if (factory.isSignalRConnected) {
                proxy.invoke("subscribe", symbol, true);
            }
        },1000)
        
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

    factory.GenerateSMA = function (data) {
        var temp = [];
        for (var i = 0; i < factory.SMA.length; i++) {
            temp.push([
                factory.SMA[i][0],
                factory.SMA[i][1]+data,
            ])
        }
        factory.sma = temp
    }
    //历史数据
    factory.getData = function (symbol, interval) {
        var newtime = (Date.parse(new Date()) / 1000);
        var endtime = (newtime - interval * 100);
        //console.log(newtime, endtime, interval);
        $http({
            url: 'http://114.55.146.142:801/api/Data/GetHistoricalQuote',
            method: 'POST',
            data: {
                "EndTimeUTC": newtime, //Date.parse(new Date()) / 1000  1479261817
                "Interval": interval,
                "StartTimeUTC": endtime,
                "Symbol": symbol
            },
            cache: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            var ohlcData = [];
            var SMA = [];
            var EMA = [];
            //console.log(data);
            for (var i = 0; i < data.Close.length; i++) {
                ohlcData.push([
                    data.Time[i] * 1000,
                    data.Open[i],
                    data.High[i],
                    data.Low[i],
                    data.Close[i]
                ])
                SMA.push([
                    data.Time[i] * 1000,
                    data.Open[i] + Math.random() * 10+10,
                ])
                EMA.push([
                    data.Time[i] * 1000,
                    data.Open[i] - Math.random() * 7-5,
                ])
            }
            factory.historicalQuote = ohlcData;
            factory.SMA = SMA;
            factory.EMA = EMA;
        }).error(function () {
            console.log("error")
        });
    }
    return factory
})

app.controller('MarketController', function ($scope, $http, $timeout, dataModel) {

    $scope.dataModel = dataModel;

    dataModel.getProductList();
    dataModel.getSignalR();
    //调用服务，获得列表数据，并进行绑定
    dataModel.getProductList().success(function (data) {
        var tempList = dataModel.getTempList(data);
        $scope.products = tempList;
        var signalRSymbol = [];
        for (var i = 0; i < tempList.length; i++) {
            signalRSymbol.push(tempList[i].name)
        }
       // console.log(signalRSymbol)
        signalRSymbol = signalRSymbol.join(";")
        //console.log(signalRSymbol)
        dataModel.subscribe(signalRSymbol);

    });

    //获取signalR数据 datamodel
    $scope.$watch('dataModel.signalRDat', function (newData, oldData) {
        var symbolToIndex = dataModel.symbolToIndex;
        var symbol = dataModel.symbol;
        var num = symbolToIndex[symbol];
        //  console.log(num);
        // console.log(newData);
        if (newData != undefined) {
            data = newData;
            // data = data.split("-");
            var oldprice = oldData[symbolToIndex[symbol]];
            var newprice = newData[symbolToIndex[symbol]];

            if (oldprice == newprice) { }
            else if (oldprice > newprice) {
                $scope.products[symbolToIndex[symbol]].color = "green"
            }
            else {
                $scope.products[symbolToIndex[symbol]].color = "red"
            }

            setTimeout(
                function () {
                    if (symbolToIndex[symbol] != undefined) {
                        //   console.log(symbolToIndex[symbol]);
                        $scope.products[symbolToIndex[symbol]].color = ""
                    }

                },
                2000
            );

        } else {
            console.log('signalRData is failed')
        }

    }, true)

    setInterval(function () { $scope.$digest(); }, 10);


    $scope.clickAndGetSymbol = function ($event) {
        //传入highstock的symbol
       // console.log(this.$index);

        var symbol = $scope.products[this.$index].name;
        $scope.MySymbol = symbol;
        dataModel.getData(symbol, 60);

    }

    $scope.interval = function (interval) {
        //console.log($scope.MySymbol, interval);
        dataModel.getData($scope.MySymbol, interval);
    }

    $scope.$watch('dataModel.historicalQuote', function (newData, oldData) {
        if (newData.length > 0) {
            drawChart(newData)           
        }
    }, true)
    
    //增加指标线
    var SMAcount = 0;
    var EMAcount = 0;
    $scope.periodshow = false;
    $scope.$watch('dataModel.sma', function (newData, oldData) {
       // console.log(newData)
        if (newData != undefined) {
            $scope.chartConfig.series.unshift({
                data: dataModel.sma,
                yAxis: 0,
                name: 'SMA',
                type: 'line',
                color: 'black',
                lineWidth: 1.5
            })
        }       
    }, true)

    //颜色
    $scope.chartColor = [
        'red',
        'yellow',
        'black',
        'green',
        'purple'
    ]
    $scope.abc = function () {
        var color = this.chartC;
        if (color != undefined) {
            $scope.chartConfig.series[this.$index].color = color;
        }
    }
    $scope.xiugai = function () {
        //console.log(this.$$watchers[1].last);
        console.log($scope.SMAList[0].period);
        if ( $scope.chartConfig.series.length>1) {
            dataModel.GenerateSMA(parseInt(this.$$watchers[1].last));
            $scope.chartConfig.series.splice(this.$index, 1);
        }       
    }
    $scope.SMAList = [];
    $scope.count = 0;
    $scope.addSMA = function () {       
        $scope.periodshow = true;
        $scope.SMAList.unshift({
            period: 30+$scope.count,
            done: false
        })

        dataModel.GenerateSMA(parseInt(this.SMAList[0].period));  
        $scope.count += 10;
    }
    
    //删除行为
    $scope.delete = function (todo) {
        $scope.SMAList.splice(this.$index, 1)
        $scope.chartConfig.series.splice(this.$index,1)
    };
    //改变形状
    $scope.changeStyle = function (shape) {
        console.log(shape)
        var length = $scope.chartConfig.series.length - 1;
        $scope.chartConfig.series[length].type = shape
    }
    //获取数据后画图  viewmodel
    function drawChart(data) {
        
        $scope.chartConfig = {
            options: {
                rangeSelector: {
                    inputEnabled: false,
                    enabled: false,
                },
                navigator: {
                    adaptToUpdatedData: false,
                    margin: -10,
                    enabled:true
                },

            },
            series: [{
                name:'蜡烛图',
                data: data,
                type: 'candlestick',
            }],
            credits: {
                enabled: false
            },
            useHighStocks: true,
        }
    }

});
