Template.players.events({
	'click button': function(evt) {
		var array;
		var randomindex;
		var element;
		var map = {};
		var users = Meteor.users.find().fetch();
		for (i=0; i<users.length; i++) {
			array = Cards.find().fetch();
			randomindex = Math.floor( Math.random() * array.length);
			element = array[randomindex].title;
			map[users[i]._id] = element;
		}
		Session.set('rolemap',map);
	}
});

Template.players.helpers({
	'players': function() {
		var myroom = MafiaRooms.findOne({mod: Meteor.userId()});
		if(myroom!=null) {
			var ids=_.keys(myroom.players);
			var u;
			var r;
			var usersAndRoles = [];
			for (i=0;i<ids.length;i++) {
				console.log(ids[i])
				u=Meteor.users.findOne({_id: ids[i]}).username;
				r="Waiting";
				usersAndRoles[i]={username: u, role: r};
			};
			return usersAndRoles;
		return [];
		};
	}
})

Template.setup.helpers({
	'cards': function() {
		if(Session.get('alignment-filter') === 'all')
			return Cards.find({'alignment': 'success'}).fetch()
				.concat(Cards.find({'alignment': 'danger'}).fetch())
				.concat(Cards.find({'alignment': 'warning'}).fetch());
		else
			return Cards.find({'alignment': Session.get('alignment-filter')}).fetch();
	}
});

Template.setup.events({
	'change #role-count': function(evt) {
		var newSetup = Session.get('setup');
		newSetup[$(evt.target).data("title")] = $(evt.target).val();
		Session.set('setup', newSetup);
	}
});