Cards = new Meteor.Collection('cards');

Cards.allow({
	'insert': function(doc) {
		return true;
	}
});