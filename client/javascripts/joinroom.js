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
		allRoomsAreInvisible=true;
		for(i=0;i<rooms.length;i++){
			if(rooms[i].visible==true && rooms[i].mod!=Meteor.userId()){
				allRoomsAreInvisible=false;
			}
		}
		console.log(allRoomsAreInvisible);
		return rooms.length==0 || (rooms.length==1 && rooms[0].mod==Meteor.userId()) || allRoomsAreInvisible;
	},
	'notInAGame': function() {
		return Session.get("myModId")==null;
	},
	'isMod': function() {
		if(MafiaRooms.findOne({mod: Meteor.userId()})!=null){
			return true;
		return false;
		}
	}
})

Template.joinroom.events ({
	'click a.room': function(e) {
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
	},
	'click a.already-in-a-room': function() {
			$("#failure-alert").alert();
			$("#failure-alert").fadeTo(2000, 500).slideUp(500, function(){
			$("#failure-alert").alert('close');
		})
	},
	'click .new-game': function(evt) {
		MafiaRooms.insert({
			mod: Meteor.userId(),
			players: {}
		});
	}
})