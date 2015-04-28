Template.joinroom.helpers({
	'allRooms': function() {
		return MafiaRooms.find().fetch();
	}
})