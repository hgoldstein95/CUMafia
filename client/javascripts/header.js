Template.header.helpers({
	'isAdmin': function() {
		var current = Meteor.user();
		return current.profile.admin;
	},
	'cardsActive': function() {
		if(Session.get('current-page') === 'cards')
			return 'active';
		else
			return '';
	},
	'rulesActive': function() {
		if(Session.get('current-page') === 'rules')
			return 'active';
		else
			return '';
	},
	'adminActive': function() {
		if(Session.get('current-page') === 'admin')
			return 'active';
		else
			return '';
	}
});