Meteor.subscribe('cards');

Session.setDefault('alignment-filter', 'all');
Session.setDefault('current-page', null);

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});