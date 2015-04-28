Template.home.events({
	'click .new-game': function(evt) {
		MafiaRooms.insert({
			mod: Meteor.userId(),
			players: {}
		});
	}
})

Template.home.helpers({
	'isaUser': function(){
		return Meteor.user();
	}
})