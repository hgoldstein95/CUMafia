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
		}, function(err, id) {
			if(!err) {
				$("#success-alert").alert();
				$("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
					$("#success-alert").alert('close');
				});
			}
			else {
				$("#failure-alert").alert();
				$("#failure-alert").fadeTo(2000, 500).slideUp(500, function(){
					$("#failure-alert").alert('close');
				});	
			}
		});

		$('#new-card-form')[0].reset();

	}
});