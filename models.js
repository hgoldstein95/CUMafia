Messages = new Meteor.Collection("messages");
Rooms = new Meteor.Collection("rooms");
Cards = new Meteor.Collection('cards');

Messages.allow({
	'insert': function(doc) {
		return true;
	}
});

Rooms.allow({
	'insert': function(doc) {
		return true;
	}
});

Cards.allow({
	'insert': function(userId, doc) {
		var usr = Meteor.user();
		if(usr && usr.profile.admin && Cards.find({'title': doc.title}).fetch().length == 0)
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

Meteor.users.deny({
	'insert': function() {
		return true;
	},
	'remove': function() {
		return true
	},
	'update': function(userId, doc) {
		var usr = Meteor.user();
		if(usr && usr.profile.admin)
			return false;
		return true;
	}
});