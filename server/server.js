Meteor.startup(function(){
	Meteor.publish('cards', function() {
		return Cards.find({});
	});

	Meteor.publish('users', function() {
		return Meteor.users.find({});
	});

	Meteor.publish('mafiarooms', function() {
		return MafiaRooms.find({});
	})

	Meteor.publish('messages', function() {
		return Messages.find({});
	})
});

Meteor.methods({ 
	eventsOnHooksInit : function(){} 
});