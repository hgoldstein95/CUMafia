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
	'insert': function(doc) {
		return true;
	}
});