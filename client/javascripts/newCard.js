Template.newCard.events({
	'submit form#new-card-form': function(evt) {
		evt.preventDefault();

		var title = evt.target.title.value;
		var description = evt.target.description.value;
		var alignment = evt.target.alignment.value;
		var win = evt.target.win.value;

		Cards.insert({
			title: title,
			description: description,
			alignment: alignment,
			win: win
		});

		$('#new-card-form')[0].reset();
	}
});