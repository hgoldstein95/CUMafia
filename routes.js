Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'home',
		data: function() {
			Session.set('current-page', null);
		}
	});

	this.route('cards', {
		path: '/cards',
		template: 'cards',
		data: function() {
			Session.set('current-page', 'cards');
		}
	});

	this.route('newCard', {
		path: '/newCard',
		template: 'newCard',
		data: function() {
			Session.set('current-page', 'newCard');
		}
	});

	this.route('rules', {
		path: '/rules',
		template: 'rules',
		data: function() {
			Session.set('current-page', 'rules');
		}
	});

	this.route('admin', {
		path: '/admin',
		template: 'admin',
		data: function() {
			Session.set('current-page', 'admin');
		}
	});

	this.route('moderator', {
		path: '/moderator',
		template: 'moderator',
		data: function() {
			Session.set('current-page', 'moderator');
		}
	});

	this.route('joinroom', {
		path: '/joinroom',
		template: 'joinroom',
		data: function() {
			Session.set('current-page', 'joinroom');
		}
	});

	this.route('roleassignment', {
		path: '/roleassignment',
		template: 'roleassignment',
		data: function() {
			Session.set('current-page', 'roleassignment');
		}
	});
});