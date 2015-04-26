Template.cards.events({
	'click #expand-role': function(evt) {
		$(evt.target).parent().parent().next('.panel-body').toggle();
	},
	'click #expand-all': function(evt) {
		$('.panel-body').toggle();
	},
	'change #align-select': function(evt) {
		Session.set('alignment-filter', $(evt.target).val());
	}
});

Template.cards.helpers({
	'cards': function() {
		if(Session.get('alignment-filter') === 'all')
			return Cards.find({}, {sort: {'title': 1}}).fetch();
		else
			return Cards.find({'alignment': Session.get('alignment-filter')}).fetch();
	},
	'thirdParty': function(card) {
		return card.alignment == "warning";
	}
});