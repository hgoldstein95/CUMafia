Template.home.events({
    'click #not-mod': function(evt) {
        MafiaRooms.insert({
            mod: Meteor.userId(),
            players: {},
            initialPlayers: {},
            visible: true,
            open: false
        });
    },
    'click #mod': function(evt) {
        $("#failure-alert").alert();
        $("#failure-alert").fadeTo(2000, 500).slideUp(500, function() {})
    }
})

Template.home.helpers({
    'isaUser': function() {
        return Meteor.user();
    },
    'isMod': function() {
        return MafiaRooms.findOne({
            mod: Meteor.userId()
        });
    }
})