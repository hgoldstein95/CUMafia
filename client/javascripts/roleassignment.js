Template.roleassignment.helpers({
	'role': function() {
		var myId=Meteor.userId();
		var myModId=Session.get("myModId");
		var myroom=MafiaRooms.findOne({mod: myModId});
		var players=myroom.players;
		var myrole=null;
		if(myroom.players!=null){
			myrole=myroom.players[myId];
		}
		return Cards.findOne({title: myrole});
	},
	'roomDeleted': function() {
		var myModId=Session.get("myModId");
		var myId=Meteor.userId();
		var myroom = MafiaRooms.findOne({mod:myModId});
		var deleted = myroom==null || !(_.keys(myroom.players).indexOf(myId)!=-1);
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
		var myModId=Session.get("myModId");
		var myroom=MafiaRooms.findOne({mod: myModId});
		if(myroom){
			return myroom.open;
		}
	},
	'roles': function() {
		var myId=Meteor.userId();
		var myModId=Session.get("myModId");
		var myroom=MafiaRooms.findOne({mod: myModId});
		var players=myroom.players;
		var values=_.values(players);
		var roles=[];
		for(i=0;i<values.length;i++){
			roles[i]=Cards.findOne({title: values[i]});
		}d
		return roles;
	}
})

Template.roleassignment.events({
	'click button#leave-game': function(evt) {
		var myId=Meteor.userId();
		var myModId=Session.get("myModId");
		var myroom=MafiaRooms.findOne({mod: myModId});
		var newPlayers=[];
		if(myroom!=null){
			newPlayers = myroom.players;
			delete newPlayers[myId];
		}
		MafiaRooms.update({_id: MafiaRooms.findOne({mod: myModId})._id} ,
		{
			$set: {players: newPlayers}
		});
		Session.set("myModId",null);
	}
})