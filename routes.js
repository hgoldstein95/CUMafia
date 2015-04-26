Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'home'
	});

	this.route('cardList', {
		path: '/cardList',
		template: 'cardList'
	});

	this.route('newCard', {
		path: '/newCard',
		template: 'newCard'
	});
});