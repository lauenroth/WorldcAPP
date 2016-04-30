Template.Bet.setBet = function(e, target) {
  e.preventDefault();
  let chosen = $(e.currentTarget).blur().html();

  if (chosen === '+') {
    chosen = parseInt(target.html()) + 1 || 0;
  }
  target.html(chosen);
};

Template.Bet.saveBet = function(match) {
  const score1 = $('.bet-team1').html();
  const score2 = $('.bet-team2').html();
  let bet = Bets.findOne({match: match._id});
  if (!bet) {
    Bets.insert({
      match: match._id,
      score1: score1,
      score2: score2,
      userId: Meteor.userId(),
    });
  } else {
    bet.score1 = score1;
    bet.score2 = score2;
  }
};

/*****************************************************************************/
/* Bet: Event Handlers */
/*****************************************************************************/
Template.Bet.events({

  'click .set-bet1 a': function(e) {
    Template.Bet.setBet(e, $('.bet-team1'));
  },

  'click .set-bet2 a': function(e) {
    Template.Bet.setBet(e, $('.bet-team2'));
  },

  'click .prev': function(e) {
    e.preventDefault();
    Template.Bet.saveBet(this.match);
  },

  'click .next': function(e) {
    e.preventDefault();
    Template.Bet.saveBet(this.match);
  },
});

/*****************************************************************************/
/* Bet: Helpers */
/*****************************************************************************/
Template.Bet.helpers({

  isGroupStage: function() {
    if (this.match && this.match.stage) {
      return this.match.stage === 'group';
    }
  },

});

/*****************************************************************************/
/* Bet: Lifecycle Hooks */
/*****************************************************************************/
Template.Bet.onCreated(function () {
});

Template.Bet.onRendered(function () {
  Session.set('menuItem', 'bet');
});

Template.Bet.onDestroyed(function () {
});
