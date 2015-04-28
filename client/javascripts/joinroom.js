Template.joinroom.helpers({
	'allRooms': function() {
		return MafiaRooms.find().fetch();
	},
	'getmodname': function(room) {
		return Meteor.users.findOne({_id: room.mod}).username;
	}
})

Template.joinroom.events ({
	'click a': function(e) {
		var moderatorId = Meteor.users.findOne({username: $(e.target).data("value")})._id;
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