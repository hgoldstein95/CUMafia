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