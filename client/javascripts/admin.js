Template.admin.helpers({
	'cards': function () {
		return Cards.find({'alignment': 'success'}, {sort: {"title": 1}}).fetch()
			.concat(Cards.find({'alignment': 'danger'}, {sort: {"title": 1}}).fetch())
			.concat(Cards.find({'alignment': 'warning'}, {sort: {"title": 1}}).fetch());
	},
	'removing': function(){
		return Session.get('removing');
	}
});

Template.admin.events({
	'click #remove': function(evt) {
		Cards.remove({_id: $(evt.target).parent().data("id")});
	},
	'click .remove-enable': function(evt) {
		Session.set('removing', !Session.get('removing'));
	},
	'change #align-select': function(evt) {
		Session.set('alignment-filter', $(evt.target).val());
	},
	'submit #new-admin': function(evt){
		Meteor.users.update({'_id': Meteor.users.findOne({'username': evt.target.username.value})._id}, {$set: {'profile': {'admin': 1}}});
	},
	'change #secretBox': function(evt) {
		Cards.update({_id: $(evt.target).val()}, {$set: {secret: $(evt.target).is(':checked')}});
	}
});