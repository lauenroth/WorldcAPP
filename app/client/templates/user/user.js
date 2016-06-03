/*****************************************************************************/
/* User: Event Handlers */
/*****************************************************************************/
Template.User.events({
  'click .back': function() {
    window.history.back();
  }
});

/*****************************************************************************/
/* User: Helpers */
/*****************************************************************************/
Template.User.helpers({

  supportedTeam: function() {
    if (this.profile.supportedTeam && this.profile.supportedTeam !== 'tbd') {
      return this.profile.supportedTeam.substr(9).replace('_', ' ');
    }
    return false;
  },

  bets: function() {
    const pastMatches = Matches.find({date: {$lt: new Date()}}, {sort: {date: 1}}).fetch();
    pastMatches.forEach(match => {

      match.team1name = match.team1.substr(9).replace('_',' ');
      match.team2name = match.team2.substr(9).replace('_',' ');

      const hasBet = Bets.findOne({userId: this._id, match: match._id});
      if (hasBet) {
        match.bet = hasBet;
      }
    });
    return pastMatches;
  },

});

/*****************************************************************************/
/* User: Lifecycle Hooks */
/*****************************************************************************/
Template.User.onCreated(function () {
});

Template.User.onRendered(function () {
  $('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 1500,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
});

Template.User.onDestroyed(function () {
});
