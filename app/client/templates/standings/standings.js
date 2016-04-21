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
    let groups = Groups.find().fetch();
    groups.forEach(group => {
      group.teams = Teams.find({group: group._id}).fetch();
    });
    return groups;
  },
});

/*****************************************************************************/
/* Standings: Lifecycle Hooks */
/*****************************************************************************/
Template.Standings.onCreated(function () {
});

Template.Standings.onRendered(function () {
  Session.set('menuItem', 'standings');
});

Template.Standings.onDestroyed(function () {
});
