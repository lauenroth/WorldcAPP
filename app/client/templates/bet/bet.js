Template.Bet.setBet = function(e, team) {
  e.preventDefault();
  let chosen = $(e.currentTarget).blur().html();
  let bet = Session.get('currentBet');

  if (chosen === '+') {
    chosen = (bet !== false ? bet[team] + 1 : 0);
  }


  if (bet === false) {
    bet = {};
  }
  bet[team] = chosen;
  Session.set('currentBet', bet);
};

Template.Bet.saveBet = function() {
  const match = Session.get('currentMatch');
  const currentBet = Session.get('currentBet');
  if (currentBet.score1 !== undefined && currentBet.score2 !== undefined) {
    const bet = Bets.findOne({match: match._id});
    if (!bet) {
      Bets.insert({
        match: match._id,
        score1: currentBet.score1,
        score2: currentBet.score2,
        userId: Meteor.userId(),
      });
    } else {
      Bets.update({_id: bet._id}, {$set: {score1: currentBet.score1, score2: currentBet.score2}});
    }
  }
};

Template.Bet.setMatch = function(data) {
  var $team1 = $('.team1');
  var $team2 = $('.team2');
  let match = Session.get('matches')[Session.get('currentMatchIndex')];
  match.team1name = Teams.findOne({_id: match.team1}).name;
  match.team2name = Teams.findOne({_id: match.team2}).name;
  const bet = Bets.findOne({match: match._id, userId: Meteor.userId()});
  Session.set('currentBet', bet ? bet : false);

  $team1.addClass('change');
  $team2.addClass('change');
  setTimeout(() => {
    Session.set('currentMatch', match);
    $team1.removeClass('change');
    $team2.removeClass('change');
  }, 300);
};

/*****************************************************************************/
/* Bet: Event Handlers */
/*****************************************************************************/
Template.Bet.events({

  'click .set-bet1 a': function(e) {
    Template.Bet.setBet(e, 'score1');
  },

  'click .set-bet2 a': function(e) {
    Template.Bet.setBet(e, 'score2');
  },

  'click .prev': function(e) {
    e.preventDefault();
    Template.Bet.saveBet();
    const currentMatchIndex = Session.get('currentMatchIndex');
    if (currentMatchIndex > 0) {
      Session.set('currentMatchIndex', currentMatchIndex - 1);
      Template.Bet.setMatch(this);
    }
  },

  'click .next': function(e) {
    e.preventDefault();
    Template.Bet.saveBet();
    const currentMatchIndex = Session.get('currentMatchIndex');
    if (Session.get('matches').length > currentMatchIndex + 1) {
      Session.set('currentMatchIndex', currentMatchIndex + 1);
      Template.Bet.setMatch(this);
    } else {
      Router.go('/bets');
    }
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

  currentMatch: function() {
    return Session.get('currentMatch');
  },

  currentBet: function() {
    return Session.get('currentBet');
  },

  hasPrevMatch: function() {
    return Session.get('currentMatchIndex') > 0;
  },

  hasNextMatch: function() {
    const matches = Session.get('matches');
    if (matches) {
      return Session.get('currentMatchIndex') < matches.length - 1;
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

  if (!this.data || !this.data.match) {
    Router.go('bets');
  } else {
    Session.set('currentMatch', this.data.match);
    Session.set('currentBet', this.data.bet ? this.data.bet : false);
    this.data.matches.forEach((matchTmp, index) => {
      if (matchTmp._id === this.data.match._id) {
        Session.set('currentMatchIndex', index);
      }
    });
    Session.set('matches', this.data.matches);
  }
});

Template.Bet.onDestroyed(function () {
});
