Template.joinroom.helpers({
	'allRooms': function() {
		return MafiaRooms.find().fetch();
	},
	'getmodname': function(room) {
		return Meteor.users.findOne({_id: room.mod}).username;
	},
	'notMyGameAndVisible': function(room) {
		return Meteor.userId()!=room.mod && room.visible==true;
	},
	'thereAreNoRooms': function(rooms) {
		var allRoomsAreInvisible=true;
		for(i=0;i<rooms.length;i++){
			if(rooms[i].visible && rooms[i].mod!=Meteor.userId()){
				allRoomsAreInvisible=false;
			}
		}
		return allRoomsAreInvisible;
	},
	'notInAGame': function() {
		return !(Session.get("myModId"));
	},
	'isMod': function() {
		return MafiaRooms.findOne({mod: Meteor.userId()});
	}
})

Template.joinroom.events ({
	'click a.room': function(e) {
		var moderatorId = Meteor.users.findOne({username: $(e.target).data("value")})._id;
		var idValue = Meteor.userId();
		var myRoom = MafiaRooms.findOne({mod: moderatorId});
		var newPlayers = myRoom.players;
		if(!(idValue in newPlayers)){
			newPlayers[idValue]=null;
		}
		if(_.keys(myRoom.initialPlayers).indexOf(Meteor.userId())==-1){
			MafiaRooms.update({_id: MafiaRooms.findOne({mod: moderatorId})._id} ,{
				$set: {players: newPlayers, initialPlayers: newPlayers}
			});
		}
		else{
			if(!newPlayers[Meteor.userId()]){
				newPlayers[Meteor.userId()]=myRoom.initialPlayers[Meteor.userId()]
				MafiaRooms.update({_id: MafiaRooms.findOne({mod: moderatorId})._id} ,{
					$set: {players: newPlayers}
				});
			}
		}
		Session.set("myModId",moderatorId);
	},
	'click a.already-in-a-room': function() {
			$("#failure-alert").alert();
			$("#failure-alert").fadeTo(2000, 500).slideUp(500, function(){
		})
	},
	'click .new-game': function(evt) {
		MafiaRooms.insert({
			mod: Meteor.userId(),
			players: {},
			initialPlayers: {},
			visible: true,
			open: false
		});
	}
})