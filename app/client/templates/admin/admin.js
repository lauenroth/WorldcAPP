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


Template.Dev.events({

  'click .match': function() {
    $('.add-result').addClass('show');
    Session.set('currentMatch', this);
  },

  'click .back': function() {
    $('.add-result').removeClass('show');
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
      Matches.update({_id: match._id}, {$set: {
        score1: scores.team1,
        score2: scores.team2,
        score1halftime: scores.half1,
        score2halftime: scores.half2,
      }});

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
