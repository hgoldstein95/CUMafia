Template.roleassignment.helpers({
	'role': function() {
		var myRoom=MafiaRooms.findOne({mod: Session.get("myModId")});
		var myRole;
		if(myRoom.players){
			myRole=myRoom.players[Meteor.userId()];
		}
		return Cards.findOne({title: myRole});
	},
	'roomDeleted': function() {
		var myModId=Session.get("myModId");
		var myRoom = MafiaRooms.findOne({mod:myModId});
		var deleted = myRoom==null || !(_.keys(myRoom.players).indexOf(Meteor.userId())!=-1);
		if (deleted){
			Session.set("myModId",null);
		}
		return deleted;
	},
	'modName': function() {
		return Meteor.users.findOne({_id: Session.get("myModId")}).username;
	},
	'thirdParty': function(role) {
		return role.alignment == "warning";
	},
	'open': function() {
		if(!Session.get("myModId")){
			return false;
		}
		return MafiaRooms.findOne({mod: Session.get("myModId")}).open;
	},
	'roles': function() {
		var myRoom=MafiaRooms.findOne({mod: Session.get("myModId")});
		var values=_.values(myRoom.initialPlayers);
		var roles=[];
		for(i=0;i<values.length;i++){
			roles[i]=Cards.findOne({title: values[i]});
		}
		return roles;
	}
})

Template.roleassignment.events({
	'click button#leave-game': function(evt) {
		var myModId=Session.get("myModId");
		var myRoom=MafiaRooms.findOne({mod: myModId});
		if(myRoom){
			var newPlayers = myRoom.players;
			delete newPlayers[Meteor.userId()];
		}
		MafiaRooms.update({_id: MafiaRooms.findOne({mod: myModId})._id} ,
		{
			$set: {players: newPlayers}
		});
		Session.set("myModId",null);
	}
})