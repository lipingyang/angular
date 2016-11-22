(function() {
	var app = angular.module('calendar', []);
	app.controller('CalendarController', function() {
		this.source = sources;
	});
	var sources= [{
        title: "央行动态",
        subs: [
            { txt: "美国4月29日当周API精炼油库存变动1", front: '102.2',expect:'-8.3',reality:'360.3',clock:'4:30' },
            { txt: "美国4月29日当周API精炼油库存变动2", front: '102.2',expect:'-8.3',reality:'360.3',clock:'4:31' },
            { txt: "美国4月29日当周API精炼油库存变动3", front: '102.2',expect:'-8.3',reality:'360.3',clock:'4:32' },
        ]
    }, {
        title: "财经日历",
        subs: [
            { txt: "美国4月29日当周API精炼油库存变动4", front: '102.2',expect:'-8.3',reality:'360.3',clock:'4:33' },
            { txt: "美国4月29日当周API精炼油库存变动5", front: '102.2',expect:'-8.3',reality:'360.3',clock:'4:34' },
            { txt: "美国4月29日当周API精炼油库存变动6", front: '102.2',expect:'-8.3',reality:'360.3',clock:'4:35' },
        ]
    }, {
        title: "美国数据",
        subs: [
            { txt: "美国4月29日当周API精炼油库存变动7", front: '102.2',expect:'-8.3',reality:'360.3',clock:'4:36' },
            { txt: "美国4月29日当周API精炼油库存变动8", front: '102.2',expect:'-8.3',reality:'360.3',clock:'4:37' },
            { txt: "美国4月29日当周API精炼油库存变动9", front: '102.2',expect:'-8.3',reality:'360.3',clock:'4:38' },
        ]
    }];
    
	
})();