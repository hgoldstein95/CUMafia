Template.roleassignment.helpers({
	'role': function() {
		myId=Meteor.userId();
		myModId=Session.get("myModId");
		myroom=MafiaRooms.findOne({mod: myModId});
		players=myroom.players;
		myrole=null;
		if(myroom.players!=null){
			myrole=myroom.players[myId];
		}
		return Cards.findOne({title: myrole});
	},
	'thirdParty': function(role) {
		return role.alignment == "warning";
	}
})