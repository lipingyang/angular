(function() {
	var app = angular.module('store', []);
	app.controller('StoreController', function() {
		this.images = imgs;
		this.texts = txt;
	});
	var imgs = ['../images/pic1.png', '../images/bg-2.png', '../images/bg-3.png', '../images/bg-4.png', '../images/bg-5.png'];
	var txt = [{
		p1: '高新技术企业',
		p2: '核心自主知识产权企业，国家级资质认证'
	}, {
		p1: '高新技术企业',
		p2: '核心自主知识产权企业，国家级资质认证'
	}, {
		p1: '高新技术企业',
		p2: '核心自主知识产权企业，国家级资质认证'
	}];
	
})();