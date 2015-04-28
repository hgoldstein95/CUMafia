Template.cards.events({
	'click #expand-role': function(evt) {
		$(evt.target).parent().parent().next('.panel-body').toggle();
	},
	'click #expand-all': function(evt) {
		$('.panel-body').toggle();
	}
});

Template.cards.helpers({
	'cards': function() {
		return Cards.find({'alignment': 'success', 'secret': false}, {sort: {"title": 1}}).fetch()
			.concat(Cards.find({'alignment': 'danger', 'secret': false}, {sort: {"title": 1}}).fetch())
			.concat(Cards.find({'alignment': 'warning', 'secret': false}, {sort: {"title": 1}}).fetch());
	},
	'thirdParty': function(card) {
		return card.alignment == "warning";
	}
});