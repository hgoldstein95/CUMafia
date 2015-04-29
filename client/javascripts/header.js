Template.header.helpers({
	'isAdmin': function() {
		var usr = Meteor.user();
		if(usr)
			return usr.profile.admin;
	},
	'isMod': function() {
		if(MafiaRooms.findOne({mod: Meteor.userId()})!=null){
			return true;
		return false;
		}
	},
	'isPlayer': function() {
		if(Session.get("myModId")!=null){
			return true;
		return false;
		}
	},
	'myMod': function() {
		myModId=Session.get("myModId");
		if(Meteor.users.findOne({_id: myModId})!=null){
			return Meteor.users.findOne({_id: myModId}).username;
		}
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
	'gameActive': function() {
		if(Session.get('current-page') === 'moderator')
			return 'active';
		else
			return '';
	},
	'playerActive': function() {
		if(Session.get('current-page') === 'roleassignment')
			return 'active';
		else
			return '';
	},
	'adminActive': function() {
		if(Session.get('current-page') === 'admin')
			return 'active';
		else
			return '';
	},
	'isCordova': function () {
		return Meteor.isCordova;
	}
});

Template.header.events({
	'click .navbar-nav li a': function() {
		$(".navbar-collapse").collapse('hide');
	},
	'click .navbar-nav li a': function() {
		$(".navbar-collapse").collapse('hide');
	}
});