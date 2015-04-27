Meteor.subscribe("rooms");
Meteor.subscribe("messages");
Meteor.subscribe('cards');

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});