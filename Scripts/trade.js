(function () {
    var app = angular.module('trade', []);
    app.controller('TradeController', function () {
        this.tableTitle = tableTitles;
        this.tableList = tableLists;
        this.virtualTitle = virtualTitles;
        this.virtualList = virtualLists;
        this.rule = rules;
        this.time = times;
        this.nav = navs;
    });
    var tableTitles = ['序号', '交易日期', '股票代码', '股票简称', '最新价', '成交价格', '持有量', '溢价率'];
    var virtualTitles = ['排名', '用户', '总收益榜', '日收益榜', '昨日排名', '总资产', '最新操作'];
    var rules = ['模拟盘起始资金100万元人民币；',
	            '单只个股最高仓位不得超过前一交易日总资产的30%,系统在买入时做限制;',
	            '交易品种仅限于A股；',
	            '本次比赛不考虑配股、增发因素，选手请勿参与上述股权登记，以免对您的成绩造成影响。本次比赛支持分红、送转股，R+1日（R：股权登记日）自动划到投资者账上；',
	            '不能申购新股，首个交易日无价格涨跌幅限制的股票不能买入，如首次公开发行上市的股票、暂停上市后恢复上市的股票、增发上市的股票等；',
	            '模拟交易系统与真实股市行情不完全一致，相关数据以模拟交易系统行情为准。']

    var times = ['系统接受24小时委托（系统清算时间除外），当日清算后的委托为第二天的委托；',
                '清算时间：每日15：00—17：00，在清算时间内的委托单可能无效，请尽量不要在该时间段内下单；',
                '交易时间为正常交易日的交易时间：9：30—11：30，13：00—15：00。']
    var tableLists = [
	{ number: '1', date: '2016-07-02', code: '00001', short: '平安银行', new: '8.88', price: '7.9', hold: '40.00', premiun: '-11.04' },
	{ number: '2', date: '2016-07-02', code: '00001', short: '平安银行', new: '8.88', price: '7.9', hold: '40.00', premiun: '-11.04' },
	{ number: '3', date: '2016-07-02', code: '00001', short: '平安银行', new: '8.88', price: '7.9', hold: '40.00', premiun: '-11.04' },
	{ number: '4', date: '2016-07-02', code: '00001', short: '平安银行', new: '8.88', price: '7.9', hold: '40.00', premiun: '-11.04' },
	{ number: '5', date: '2016-07-02', code: '00001', short: '平安银行', new: '8.88', price: '7.9', hold: '40.00', premiun: '-11.04' },
	{ number: '6', date: '2016-07-02', code: '00001', short: '平安银行', new: '8.88', price: '7.9', hold: '40.00', premiun: '-11.04' },
	{ number: '7', date: '2016-07-02', code: '00001', short: '平安银行', new: '8.88', price: '7.9', hold: '40.00', premiun: '-11.04' },
	{ number: '8', date: '2016-07-02', code: '00001', short: '平安银行', new: '8.88', price: '7.9', hold: '40.00', premiun: '-11.04' },
	{ number: '9', date: '2016-07-02', code: '00001', short: '平安银行', new: '8.88', price: '7.9', hold: '40.00', premiun: '-11.04' }
    ];
    var virtualLists = [
	{ number: '1', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' },
	{ number: '2', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' },
	{ number: '3', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' },
	{ number: '4', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' },
	{ number: '5', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' },
	{ number: '6', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' },
	{ number: '7', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' },
	{ number: '8', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' },
	{ number: '9', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' },
	{ number: '10', name: '张三', total: '333.31%', oneday: '3.45%', rank: '1', asset: '319840', operate: '福泰隆' }
    ];
    var navs = [{
        title: "首页111",
        href: "index.html"
    }, {
        title: "行情中心",
        href: "marketCenter.html"
    }, {
        title: "定制服务",
        href: "#"
    }, {
        title: "交易",
        href: "trade.html"
    }, {
        title: "资讯",
        href: "message.html"
    }, {
        title: "日历",
        href: "calendar.html"
    }, {
        title: "教学中心",
        href: "#"
    }]

    app.controller('PanelController', function () {
        this.tab = 1;
        this.selectTab = function (setTab) {
            this.tab = setTab;
        }
        this.isSelected = function (checkTab) {
            return this.tab === checkTab;
        }
    })
})();