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
		var townTitles=[];
		var mafiaTitles=[];
		var thirdPartyTitles=[];
		var towns=[];
		var mafias=[];
		var thirdParties=[];
		var countTowns=0;
		var countMafias=0;
		var countThirdParties=0;
		for(i=0;i<values.length;i++){
			if(values[i] && Cards.findOne({title: values[i]}).alignment == 'success'){
				townTitles[countTowns]=values[i];
				countTowns=countTowns+1;
			}
			if(values[i] && Cards.findOne({title: values[i]}).alignment == 'danger'){
				mafiaTitles[countMafias]=values[i];
				countMafias=countMafias+1;
			}
			if(values[i] && Cards.findOne({title: values[i]}).alignment == 'warning'){
				thirdPartyTitles[countThirdParties]=values[i];;
				countThirdParties=countThirdParties+1;
			}
		}

		townTitles=townTitles.sort();
		mafiaTitles=mafiaTitles.sort();
		thirdPartyTitles=thirdPartyTitles.sort();
		for(i=0;i<townTitles.length;i++){
			towns[i]=Cards.findOne({title: townTitles[i]});
		}
		for(i=0;i<mafiaTitles.length;i++){
			mafias[i]=Cards.findOne({title: mafiaTitles[i]});
		}
		for(i=0;i<thirdPartyTitles.length;i++){
			thirdParties[i]=Cards.findOne({title: thirdPartyTitles[i]});
		}
		return towns.concat(mafias).concat(thirdParties);
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