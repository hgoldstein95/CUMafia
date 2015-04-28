Template.room.events ({
	'click a': function(e) {
		var moderatorId = Meteor.users.findOne({username: e.target.textContent})._id;
		var idvalue = Meteor.userId();
		var newPlayers = MafiaRooms.findOne({mod: moderatorId}).players;
		newPlayers[idvalue]=null;
		MafiaRooms.update({_id: MafiaRooms.findOne({mod: moderatorId})._id} ,{
			$set: {players: newPlayers}
		});
		console.log(MafiaRooms.findOne({mod: moderatorId}));
	}
})

Template.room.helpers ({
	'getmodname': function(room) {
		return Meteor.users.findOne({_id: room.mod}).username;
	}
})