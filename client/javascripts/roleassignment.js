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
		console.log(myrole);
		return myrole;
	},
	'getDescription': function(role) {
		return Cards.findOne({title: role}).description;
	},
	'getWin': function(role) {
		return Cards.findOne({title: role}).win;
	},
	'thirdParty': function(role) {
		return Cards.findOne({title: role}).alignment == "warning";
	}
})