Template.setup.helpers({
	'cards': function() {
		if(Session.get('alignment-filter') === 'all')
			return Cards.find({'alignment': 'success'}).fetch()
				.concat(Cards.find({'alignment': 'danger'}).fetch())
				.concat(Cards.find({'alignment': 'warning'}).fetch());
		else
			return Cards.find({'alignment': Session.get('alignment-filter')}).fetch();
	},
	'totalTown': function() {

	},
	'totalMafia': function() {
		
	},
	'totalOther': function() {
		
	}
});