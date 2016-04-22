Template.Bet.setBet = function(e, target) {
  e.preventDefault();
  const chosen = $(e.currentTarget).blur().html();

  if (chosen === '-') {
    const newValue = parseInt(target.html()) - 1 || 0;
    if (newValue >= 0) {
      target.html(newValue);
    }
  }
  else if (chosen === '+') {
    const newValue = parseInt(target.html()) + 1 || 0;
    target.html(newValue);
  }
  else {
    target.html(chosen);
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
});

/*****************************************************************************/
/* Bet: Helpers */
/*****************************************************************************/
Template.Bet.helpers({
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
