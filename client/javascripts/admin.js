Template.admin.helpers({
	'cards': function () {
		if(Session.get('alignment-filter') === 'all')
			return Cards.find({}, {sort: {'title': 1}}).fetch();
		else
			return Cards.find({'alignment': Session.get('alignment-filter')}).fetch();
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
	}
});