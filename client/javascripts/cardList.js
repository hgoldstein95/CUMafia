Template.cardList.events({
	'click .panel': function(evt) {
		$(evt.target).parent().next('.panel-body').toggle();
	}
});

Template.cardList.helpers({
	'cards': function() {
		return Cards.find().fetch();
	},
	'thirdParty': function(card) {
		return card.alignment == "warning";
	}
});