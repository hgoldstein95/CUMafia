Template.room.events ({
	'click a': function(e) {
		var moderatorId = Meteor.users.findOne({username: e.target.textContent})._id;
		var idvalue = Meteor.userId();
		var newPlayers = MafiaRooms.findOne({mod: moderatorId}).players;
		if(!(idvalue in newPlayers)){
			newPlayers[idvalue]=null;
		}
		MafiaRooms.update({_id: MafiaRooms.findOne({mod: moderatorId})._id} ,{
			$set: {players: newPlayers}
		});
		Session.set("myModId",moderatorId);
	}
})

Template.room.helpers ({
	'getmodname': function(room) {
		return Meteor.users.findOne({_id: room.mod}).username;
	}
})