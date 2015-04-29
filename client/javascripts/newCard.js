Template.newCard.events({
	'submit form#new-card-form': function(evt) {
		evt.preventDefault();

		var title = evt.target.title.value;
		var description = evt.target.description.value;
		var alignment = evt.target.alignment.value;
		var win = evt.target.win.value;
		var secret = $('#secret').is(':checked');

		Cards.insert({
			title: title,
			description: description,
			alignment: alignment,
			win: win,
			secret: secret
		}, function(err, id) {
			if(!err) {
				$("#success-alert").alert();
				$("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
				});
			}
			else {
				$("#failure-alert").alert();
				$("#failure-alert").fadeTo(2000, 500).slideUp(500, function(){
				});	
			}
		});

		$('#new-card-form')[0].reset();

	}
});