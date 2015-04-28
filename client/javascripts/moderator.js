Template.players.events({
	'click button#assign-roles': function(evt) {
		var moderatorId = Meteor.userId();
		var myroom = MafiaRooms.findOne({mod: moderatorId});
		var newPlayers = myroom.players;
		var ids = _.keys(newPlayers);
		var array = Session.get("setup");
		var keys = _.keys(array);
		var listofallroles=[];
		var randomindex;
		var element;
		for (r=0; r<keys.length; r++) {
			while (array[keys[r]]>0){
				listofallroles[listofallroles.length]=keys[r];
				array[keys[r]]=array[keys[r]]-1;
			}
		}
		var length=listofallroles.length;
		if(listofallroles.length==ids.length){
			for (i=0; i<length; i++) {
				randomindex = Math.floor( Math.random() * listofallroles.length);
				element = listofallroles[randomindex];
				newPlayers[ids[i]] = element;
				listofallroles.splice(randomindex,1);
			}
			MafiaRooms.update({_id: MafiaRooms.findOne({mod: moderatorId})._id} ,{
				$set: {players: newPlayers}
			});
		}
		else {
				$("#failure-alert").alert();
				$("#failure-alert").fadeTo(2000, 500).slideUp(500, function(){
				$("#failure-alert").alert('close');
			})
		}
	}
})

Template.players.helpers({
	'players': function() {
		var myroom = MafiaRooms.findOne({mod: Meteor.userId()});
		if(myroom!=null) {
			var ids=_.keys(myroom.players);
			var vals=_.values(myroom.players);
			var u;
			var r;
			var usersAndRoles = [];
			for (i=0;i<ids.length;i++) {
				u=Meteor.users.findOne({_id: ids[i]}).username;
				if(!vals[i]){
					r="Waiting";
				}
				else{
					r=vals[i];
				}
				usersAndRoles[i]={username: u, role: r};
			};
			return usersAndRoles;
		return [];
		};
	},
	'numPlayers': function() {
		var myroom = MafiaRooms.findOne({mod: Meteor.userId()});
		if(myroom!=null) {
			var players = _.keys(myroom.players);
			console.log(players.length);
			for (i=0;i<players.length;i++){
			}
			return i;
		}
	}
})

Template.setup.helpers({
	'cards': function() {
		return Cards.find({'alignment': 'success'}).fetch()
			.concat(Cards.find({'alignment': 'danger'}).fetch())
			.concat(Cards.find({'alignment': 'warning'}).fetch());
	}
});

Template.setup.events({
	'change #role-count': function(evt) {
		var newSetup = Session.get('setup');
		newSetup[$(evt.target).data("title")] = $(evt.target).val();
		Session.set('setup', newSetup);
	}
});