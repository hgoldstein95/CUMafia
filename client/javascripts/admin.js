Template.admin.helpers({
	'cards': function () {
		if(Session.get('alignment-filter') === 'all')
			return Cards.find({}).fetch();
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
	}
});