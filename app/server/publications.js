
// Tournament
Meteor.publish('currentTournament', function() {
  return Tournaments.find({isActive: true});
});

// Groups
Meteor.publish('groups', function() {
  const currentTournament = Tournaments.findOne({isActive});
  return Groups.find({tournament: currentTournament._id});
});

// Teams
Meteor.publish('teams', function() {
  const currentTournament = Tournaments.findOne({isActive});
  return Teams.find({tournament: currentTournament._id});
});

// Matches
Meteor.publish('matches', function() {
  return Matches.find({});
});

// Bets
Meteor.publish('myBets', function() {
  return Bets.find({userId: Meteor.userId()});
});
