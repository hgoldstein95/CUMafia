Meteor.startup(function() {
	Hooks.init();

	Meteor.subscribe('users');
	Meteor.subscribe('cards');
	Meteor.subscribe('mafiarooms');

	Session.setDefault('current-page', null);
	Session.setDefault('removing', false);
	Session.setDefault('myModId',null);
	Session.setDefault('setup', {});

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
});

Hooks.onLoggedOut = function(userId) {
	Router.go('/');
};


