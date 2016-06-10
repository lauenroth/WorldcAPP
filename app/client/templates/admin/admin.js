function calculatePoints(bet, scores) {
  let points = 0;
  if (bet.score1 == scores.team1 && bet.score2 == scores.team2) {
    points = 3;
  } else if ((bet.score1 - bet.score2) === (scores.team1 - scores.team2)) {
    points = 2;
  } else if (
    (bet.score1 > bet.score2 && scores.team1 > scores.team2) ||
    (bet.score1 < bet.score2 && scores.team1 < scores.team2)
  ) {
    points = 1;
  }
  return points;
}

/**
 * update team scores according to match result
 */
Template.Dev.updateTeams = function(match) {
  const teamUpdates = {
    points1: (match.score1 > match.score2 ? 3 : (match.score1 === match.score2 ? 1 : 0)),
    points2: (match.score2 > match.score1 ? 3 : (match.score1 === match.score2 ? 1 : 0)),
    won1: (match.score1 > match.score2 ? 1 : 0),
    won2: (match.score1 < match.score2 ? 1 : 0),
    draw1: (match.score1 === match.score2 ? 1 : 0),
    draw2: (match.score1 === match.score2 ? 1 : 0),
    lost1: (match.score1 < match.score2 ? 1 : 0),
    lost2: (match.score1 > match.score2 ? 1 : 0),
    goalsFor1: match.score1,
    goalsFor2: match.score2,
    goalsAgainst1: match.score2,
    goalsAgainst2: match.score1,
  };

  Teams.update({_id: match.team1}, {$inc: {
    points: teamUpdates.points1,
    won: teamUpdates.won1,
    draw: teamUpdates.draw1,
    lost: teamUpdates.lost1,
    goalsFor: teamUpdates.goalsFor1,
    goalsAgainst: teamUpdates.goalsAgainst1,
    goalDifference: teamUpdates.goalsFor1 - teamUpdates.goalsAgainst1,
  } });
  Teams.update({_id: match.team2}, {$inc: {
    points: teamUpdates.points2,
    won: teamUpdates.won2,
    draw: teamUpdates.draw2,
    lost: teamUpdates.lost2,
    goalsFor: teamUpdates.goalsFor2,
    goalsAgainst: teamUpdates.goalsAgainst2,
    goalDifference: teamUpdates.goalsFor2 - teamUpdates.goalsAgainst2,
  } });
};


Template.Dev.events({

  'click .match': function() {
    $('.add-result').addClass('show');
    Session.set('currentMatch', this);
  },

  'click .back': function() {
    $('.add-result').removeClass('show');
  },

  'click .recalculate-teams': function() {

    // reset team scores
    const teams = Teams.find().fetch();
    teams.forEach(team => {
      Teams.update({_id: team._id}, {$set: {won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0}});
    });

    // get all matches with a result
    const matches = Matches.find({score1: {$exists: 1}}).fetch();
    matches.forEach(match => {
      Template.Dev.updateTeams(match);
    });
  },

  'click .recalculate-users': function() {

    // reset user points
    const users = Meteor.users.find().fetch();
    users.forEach(user => {
      let points = 0;
      const matches = Matches.find({score1: {$exists: 1}}).fetch();
      matches.forEach(match => {
        const bet = Bets.findOne({match: match._id, userId: user._id});
        const scores = {
          team1: match.score1,
          team2: match.score2,
        };
        points += calculatePoints(bet, scores);
      });
      Meteor.users.update({_id: user._id}, {$set: {'profile.points': points}});
    });
  },

  'submit form': function(e) {
    e.preventDefault();
    const scores = {
      team1: $('#score1').val(),
      team2: $('#score2').val(),
      half1: $('#score1halftime').val(),
      half2: $('#score2halftime').val(),
    };
    if (scores.team1 < scores.half1 || scores.team2 < scores.half2) {
      error('Scores cannot be correct');
    } else {
      const match = Session.get('currentMatch');

      // update match
      Matches.update({_id: match._id}, {$set: {
        score1: scores.team1,
        score2: scores.team2,
        score1halftime: scores.half1,
        score2halftime: scores.half2,
      }});

      match.score1 = scores.team1;
      match.score2 = scores.team2;

      // update teams
      Template.Dev.updateTeams(match);

      // update bets
      const bets = Bets.find({match: match._id});
      bets.forEach(bet => {
        const points = calculatePoints(bet, scores);
        Bets.update({_id: bet._id}, {$set: {points: points}});
        Meteor.users.update({_id: bet.userId}, {$inc: {"profile.points": points}});
      });
      $('.add-result').removeClass('show');
    }
 },

});


Template.Dev.helpers({

  pastMatches: function() {
    let matches = Matches.find({date: {$lt: new Date()}}, {sort: {date: 1}}).fetch();
    matches.forEach(match => {
      const team1 = Teams.findOne({_id: match.team1});
      match.team1name = team1.name;
      match.group = Groups.findOne({_id: team1.group}).name;
      match.team2name = (match.team2 === 'tbd' ? 'TBD' : Teams.findOne({_id: match.team2}).name);
    });
    return matches;
  },

  currentMatch: function() {
    return Session.get('currentMatch');
  },

});


Template.Dev.onCreated(function () {
});

Template.Dev.onRendered(function () {
});

Template.Dev.onDestroyed(function () {
});
