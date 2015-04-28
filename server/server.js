Meteor.startup(function(){
	MafiaRooms.remove({});
	Meteor.publish('cards', function() {
		return Cards.find({});
	});

	Meteor.publish('users', function() {
		return Meteor.users.find({});
	});

	Meteor.publish('mafiarooms', function() {
		return MafiaRooms.find({});
	});
});

Meteor.methods({ 
	eventsOnHooksInit : function(){} 
});