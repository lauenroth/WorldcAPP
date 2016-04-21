/*****************************************************************************/
/* Matches: Event Handlers */
/*****************************************************************************/
Template.Matches.events({
});

/*****************************************************************************/
/* Matches: Helpers */
/*****************************************************************************/
Template.Matches.helpers({

  groupMatches: function() {
    const matches = Matches.find({
      tournament: Session.get('tournament'),
      stage: 'group'
    }).fetch();
    matches.forEach(match => {
      match.team1name = Teams.findOne({_id: match.team1}).name;
      match.team2name = Teams.findOne({_id: match.team2}).name;
    });
    return matches;
  },

});

/*****************************************************************************/
/* Matches: Lifecycle Hooks */
/*****************************************************************************/
Template.Matches.onCreated(function () {
});

Template.Matches.onRendered(function () {
  Session.set('menuItem', 'matches');
});

Template.Matches.onDestroyed(function () {
});
