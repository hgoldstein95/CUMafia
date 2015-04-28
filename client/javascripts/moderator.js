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
	'randomrole': function() {
		var array = Cards.find().fetch();
		var randomindex = Math.floor( Math.random() * array.length);
		var element = array[randomindex];
		return element.title;
	},
	/*'assignroles': function() {
		var array;
		var randomindex;
		var element;
		var currentmap;
		var newmap;
		for user in Meteor.user.find().fetch() {
			array = Cards.find().fetch();
			randomindex = Math.floor( Math.random() * array.length);
			element = array[randomindex];
			currentmap=Session.get('rolemap');
			newmap=currentmap;
			newmap.set(user,element);
			Session.set('rolemap',newmap)
		}
		return Session.get('rolemap');
	},*/
	'getrole': function(name) {
		console.log(Meteor.users.findOne({username: name})._id);
		return Session.get('rolemap')[Meteor.users.findOne({username: name})._id];
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