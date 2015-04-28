Template.home.events({
	'click .new-game': function(evt) {
		console.log(MafiaRooms.find({mod: Meteor.userId()}).fetch().length);
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