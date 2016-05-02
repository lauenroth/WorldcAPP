Template.Bet.setBet = function(e, target) {
  e.preventDefault();
  let chosen = $(e.currentTarget).blur().html();

  if (chosen === '+') {
    chosen = parseInt(target.html()) + 1 || 0;
  }
  target.html(chosen);
};

Template.Bet.saveBet = function() {
  const match = Session.get('currentMatch');
  const score1 = $('.bet-team1').html();
  const score2 = $('.bet-team2').html();
  if (score1.length && score2.length) {
    const bet = Bets.findOne({match: match._id});
    if (!bet) {
      Bets.insert({
        match: match._id,
        score1: score1,
        score2: score2,
        userId: Meteor.userId(),
      });
    } else {
      Bets.update({_id: bet._id}, {$set: {score1: score1, score2: score2}});
    }
  }
};

Template.Bet.setMatch = function(data) {
  data.match = data.matches[data.currentMatchIndex];
  data.match.team1name = Teams.findOne({_id: data.match.team1}).name;
  data.match.team2name = Teams.findOne({_id: data.match.team2}).name;
  data.match.bet = Bets.findOne({match: data.match._id, userId: Meteor.userId()});
  Session.set('currentMatch', data.match);
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
    Template.Bet.saveBet();

    if (this.currentMatchIndex > 0) {
      this.currentMatchIndex--;
      Template.Bet.setMatch(this);
    }
  },

  'click .next': function(e) {
    e.preventDefault();
    Template.Bet.saveBet();

    if (this.matches.length > this.currentMatchIndex + 2) {
      this.currentMatchIndex++;
      Template.Bet.setMatch(this);
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

  hasPrevMatch: function() {
    Session.get('currentMatch');
    return this.currentMatchIndex > 0;
  },

  hasNextMatch: function() {
    Session.get('currentMatch');
    console.log(this.currentMatchIndex, this.matches.length);
    return this.currentMatchIndex < this.matches.length - 2;
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
    this.data.matches.forEach((matchTmp, index) => {
      if (matchTmp._id === this.data.match._id) {
        this.data.currentMatchIndex = index;
      }
    });
  }
});

Template.Bet.onDestroyed(function () {
});
