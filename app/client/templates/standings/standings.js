/*****************************************************************************/
/* Standings: Event Handlers */
/*****************************************************************************/
Template.Standings.events({
});

/*****************************************************************************/
/* Standings: Helpers */
/*****************************************************************************/
Template.Standings.helpers({

  groups: function() {
    let groups = Groups.find({}, {sort: {name: 1}}).fetch();
    groups.forEach(group => {
      group.teams = Teams.find({group: group._id}, {sort: {points: -1}}).fetch();
    });
    return groups;
  },

  goalDifference: function(team) {
    const difference = team.goalsFor - team.goalsAgainst;
    return difference > 0 ? '+' + difference : difference;
  },

  isGroupStage: function() {
    return Session.get('stage') === 'group';
  },

});

/*****************************************************************************/
/* Standings: Lifecycle Hooks */
/*****************************************************************************/
Template.Standings.onCreated(function () {
});

Template.Standings.onRendered(function () {
  Session.set('menuItem', 'standings');

  $('.pages-wrapper').dragend({
    pageClass: 'page',
  });
});

Template.Standings.onDestroyed(function () {
});
