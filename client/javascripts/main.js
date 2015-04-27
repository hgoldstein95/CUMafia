Meteor.subscribe("rooms");
Meteor.subscribe("messages");
Meteor.subscribe('cards');
Meteor.subscribe('users');

Session.setDefault('alignment-filter', "all");
Session.setDefault('current-page', null);
Session.setDefault('removing', false);

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});