/*****************************************************************************/
/* Bets: Event Handlers */
/*****************************************************************************/
Template.Bets.events({

  'click .match': function(e) {
    const matchId = e.currentTarget.dataset.match;
    Session.set('currentBet', matchId);
    Router.go('/bet');
  },

});

/*****************************************************************************/
/* Bets: Helpers */
/*****************************************************************************/
Template.Bets.helpers({

  groupMatches: function() {
    const matches = Matches.find({
      tournament: Session.get('tournament'),
      stage: 'group',
    }, {
      sort: {
        date: 1,
        team1: 1
      }
    }).fetch();
    matches.forEach(match => {
      const team1 = Teams.findOne({_id: match.team1});
      match.team1name = team1.name;
      match.team2name = Teams.findOne({_id: match.team2}).name;

      const bet = Bets.findOne({match: match._id, userId: Meteor.userId()});
      if (bet) {
        match.hasBet = true;
        match.bet1 = bet.score1;
        match.bet2 = bet.score2;
      }
    });
    return matches;
  },

});

/*****************************************************************************/
/* Bets: Lifecycle Hooks */
/*****************************************************************************/
Template.Bets.onCreated(function () {
});

Template.Bets.onRendered(function () {
  Session.set('menuItem', 'bet');

  $('.pages-wrapper').dragend({
    pageClass: 'page',
  });
});

Template.Bets.onDestroyed(function () {
});
