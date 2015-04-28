Template.home.events({
	'click #not-mod': function(evt) {
		MafiaRooms.insert({
			mod: Meteor.userId(),
			players: {},
			visible: true
		});
	},
	'click #mod': function(evt) {
		$("#failure-alert").alert();
			$("#failure-alert").fadeTo(2000, 500).slideUp(500, function(){
			$("#failure-alert").alert('close');
		})
	}
})

Template.home.helpers({
	'isaUser': function(){
		return Meteor.user();
	},
	'isMod': function() {
		if(MafiaRooms.findOne({mod: Meteor.userId()})!=null){
			return true;
		return false;
		}
	}
})