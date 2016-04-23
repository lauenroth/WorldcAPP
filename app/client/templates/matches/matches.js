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
    const groupMatches = [];
    const matches = Matches.find({
      tournament: Session.get('tournament'),
      stage: 'group'
    }).fetch();
    let currentDayMatches = [];
    let currentDay = false;
    matches.forEach(match => {
      const team1 = Teams.findOne({_id: match.team1});
      match.team1name = team1.name;
      match.team2name = Teams.findOne({_id: match.team2}).name;

      match.group = Groups.findOne({_id: team1.group}).name;

      // same day as the current day?
      const matchDay = moment.utc(match.date).format('DD/MM/YYYY');
      if (!currentDay) {
        currentDay = matchDay;
      } else if (currentDay !== matchDay) {
        groupMatches.push({
          day: currentDay,
          matches: currentDayMatches
        });
        currentDayMatches = [];
        currentDay = matchDay;
      }
      currentDayMatches.push(match);
    });
    groupMatches.push({
      day: currentDay,
      matches: currentDayMatches
    });
    return groupMatches;
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
