Cards = new Meteor.Collection('cards');

Cards.allow({
	'insert': function(userId, doc) {
		var usr = Meteor.user();
		if(usr && usr.profile.admin)
			return true;
		return false;
	},
	'remove': function(userId, doc) {
		var usr = Meteor.user();
		if(usr && usr.profile.admin)
			return true;
		return false;
	},
	'update': function(userId, doc) {
		var usr = Meteor.user();
		if(usr && usr.profile.admin)
			return true;
		return false;
	}
});

Meteor.users.allow({
	'insert': function() {
		return false;
	},
	'remove': function() {
		return false;
	},
	'update': function(userId, doc) {
		var usr = Meteor.user();
		if(usr && usr.profile.admin)
			return true;
		return false;
	}
});