Template.moderator.events({
    'click button#assign-roles': function(evt) {
        var moderatorId = Meteor.userId();
        var myroom = MafiaRooms.findOne({
            mod: moderatorId
        });
        var newPlayers = myroom.players;
        var ids = _.keys(newPlayers);
        var array = Session.get("setup");
        var keys = _.keys(array);
        var listofallroles = [];
        var randomindex;
        var element;
        for (r = 0; r < keys.length; r++) {
            while (array[keys[r]] > 0) {
                listofallroles[listofallroles.length] = keys[r];
                array[keys[r]] = array[keys[r]] - 1;
            }
        }
        var length = listofallroles.length;
        if (listofallroles.length == ids.length) {
            var open = $('#open').is(':checked');
            for (i = 0; i < length; i++) {
                randomindex = Math.floor(Math.random() * listofallroles.length);
                element = listofallroles[randomindex];
                newPlayers[ids[i]] = element;
                listofallroles.splice(randomindex, 1);
            }
            MafiaRooms.update({_id: MafiaRooms.findOne({mod: moderatorId})._id}, {
                $set: {players: newPlayers, initialPlayers: newPlayers, open: open
                }
            });
        } else {
            $("#failure-alert").alert();
            $("#failure-alert").fadeTo(2000, 500).slideUp(500, function() {})
        }
    },
    'click button#lock-players': function(evt) {
        MafiaRooms.update({
            _id: MafiaRooms.findOne({
                mod: Meteor.userId()
            })._id
        }, {
            $set: {
                visible: false
            }
        });
    },
    'click button#kick-player': function(e) {
        var badPlayer = Meteor.users.findOne({
            username: $(e.target).data("value")
        });
        var newPlayers = MafiaRooms.findOne({
            mod: Meteor.userId()
        }).players;
        delete newPlayers[badPlayer._id];
        MafiaRooms.update({
            _id: MafiaRooms.findOne({
                mod: Meteor.userId()
            })._id
        }, {
            $set: {
                players: newPlayers, initialPlayers: newPlayers
            }
        });
    },
    'click button#unlock-players': function(evt) {
        MafiaRooms.update({
            _id: MafiaRooms.findOne({
                mod: Meteor.userId()
            })._id
        }, {
            $set: {
                visible: true
            }
        });
    },
    'click button#end-game': function(evt) {
        var myRoomId = MafiaRooms.findOne({
            mod: Meteor.userId()
        })._id;
        MafiaRooms.remove(myRoomId);
        Session.set('setup', {});
    },
    'click button#refresh': function(evt) {
        var players = MafiaRooms.findOne({mod: Meteor.userId()}).players;
        var keys = _.keys(players);
        for(i=0;i<keys.length;i++){
            players[keys[i]]=null;
        }
        MafiaRooms.update({_id: MafiaRooms.findOne({mod: Meteor.userId()})._id} ,{
            $set: {players: players, initialPlayers: players}
        });
    },
    'change #role-count': function(evt) {
        var newSetup = Session.get('setup');
        newSetup[$(evt.target).data("title")] = $(evt.target).val();
        Session.set('setup', newSetup);
    }
})

Template.moderator.helpers({
    'players': function() {
        var myRoom = MafiaRooms.findOne({
            mod: Meteor.userId()
        });
        if (myRoom) {
            var ids = _.keys(myRoom.initialPlayers);
            var vals = _.values(myRoom.initialPlayers);
            var usersAndRoles = [];
            for (i = 0; i < ids.length; i++) {
                if (!vals[i]) {
                    usersAndRoles[i] = {
                        username: Meteor.users.findOne({
                            _id: ids[i]
                        }).username,
                        role: "Waiting"
                    };
                } else {
                    usersAndRoles[i] = {
                        username: Meteor.users.findOne({
                            _id: ids[i]
                        }).username,
                        role: vals[i]
                    };
                }
            }
            return usersAndRoles;
        }
        return [];
    },
    'playerHadRoleAndLeft': function(player) {
        var myRoom = MafiaRooms.findOne({mod: Meteor.userId()});
        if(myRoom){
            var playerId = Meteor.users.findOne({username: player.username})._id;
            var initialKeys = _.keys(myRoom.initialPlayers);
            var keys = _.keys(myRoom.players);
            if(initialKeys.indexOf(playerId)!=-1 && keys.indexOf(playerId)==-1 && player.role=="Waiting"){
                var newPlayers = myRoom.players;
                delete newPlayers[Meteor.users.findOne({username: player.username})._id];
                MafiaRooms.update({_id: MafiaRooms.findOne({mod: Meteor.userId()})._id} ,
                {
                    $set: {initialPlayers: newPlayers}
                });
            }
            return initialKeys.indexOf(playerId)!=-1 && keys.indexOf(playerId)==-1 && player.role!="Waiting";
        }
    },
    'numPlayers': function() {
        var myRoom = MafiaRooms.findOne({
            mod: Meteor.userId()
        });
        if (myRoom) {
            return _.keys(myRoom.initialPlayers).length;
        }
    },
    'visible': function() {
        var myRoom = MafiaRooms.findOne({
            mod: Meteor.userId()
        });
        if (myRoom) {
            return myRoom.visible;
        }
    },
    'cards': function() {
        return Cards.find({
                'alignment': 'success'
            }).fetch()
            .concat(Cards.find({
                'alignment': 'danger'
            }).fetch())
            .concat(Cards.find({
                'alignment': 'warning'
            }).fetch());
    }
});