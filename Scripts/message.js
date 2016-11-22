(function() {
    var message = angular.module('message', ['ngRoute']);
    message.config(function ($routeProvider) {
        $routeProvider.when('/important', {
            templateUrl: '/App/news/important.html'
        }).when('/push', {
            templateUrl: '/App/news/push.html'
        }).when('/live', {
            templateUrl: '/App/news/live.html',
        }).when('/foreign', {
            templateUrl: '/App/news/foreign.html',
        }).when('/',{
            templateUrl: '/App/news/important.html'
        })
            
    });
	message.controller('MessageController', function(){
		this.newlist = newlists;
		this.rightlist = rightlists;
	});
	
	var newlists = [
	    {four:'商业银行到了最危险的时候1',five:'什么是“资产脱媒”？“资产脱媒”过程，是指商业银行资产配置已经开始 脱离商业银行传统1',six:'阅读全文1',read:'121',data:'2015-7-061',img:'../images/list-img.png'},
	    {four:'商业银行到了最危险的时候2',five:'什么是“资产脱媒”？“资产脱媒”过程，是指商业银行资产配置已经开始 脱离商业银行传统2',six:'阅读全文1',read:'121',data:'2015-7-061',img:'../images/list-img.png'},
	    {four:'商业银行到了最危险的时候3',five:'什么是“资产脱媒”？“资产脱媒”过程，是指商业银行资产配置已经开始 脱离商业银行传统3',six:'阅读全文1',read:'121',data:'2015-7-061',img:'../images/list-img.png'},
	    {four:'商业银行到了最危险的时候4',five:'什么是“资产脱媒”？“资产脱媒”过程，是指商业银行资产配置已经开始 脱离商业银行传统4',six:'阅读全文1',read:'121',data:'2015-7-061',img:'../images/list-img.png'}
	    ];
	
	var rightlists=[
	   {img:'../images/hotNews.png',txt:'中国债务问题或许没你想的这么'},
	   {img:'../images/hotNews.png',txt:'中国债务问题或许没你想的这么'},
	   {img:'../images/hotNews.png', txt: '中国债务问题或许没你想的这么' },
	   {img: '../images/hotNews.png', txt: '中国债务问题或许没你想的这么' },
	   {img: '../images/hotNews.png', txt: '中国债务问题或许没你想的这么' },
	   {img: '../images/hotNews.png', txt: '中国债务问题或许没你想的这么' }
	];


	
})();