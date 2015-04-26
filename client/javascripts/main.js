Meteor.subscribe('cards');
Meteor.subscribe('users');

Session.setDefault('alignment-filter', "all");
Session.setDefault('current-page', null);
Session.setDefault('removing', false);
Session.setDefault('current-setup', {});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});