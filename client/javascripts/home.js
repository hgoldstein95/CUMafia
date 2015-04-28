Template.home.events({
	'click .new-game': function(evt) {
		console.log(MafiaRooms.find({mod: Meteor.user()}).fetch().length);
		MafiaRooms.insert({
			mod: Meteor.user(),
			players: {}
		});
	}
})