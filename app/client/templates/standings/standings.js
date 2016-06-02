Template.Standings.getMatchesForStage = function(stage) {
  let matches = Matches.find({stage: stage}, {sort: {date: 1}}).fetch();
  matches.forEach(match => {
    if (match.team1 !== 'tbd') {
      match.team1 = Teams.findOne({_id: match.team1});
      match.team2 = Teams.findOne({_id: match.team2});
    } else {
      match.team1 = {name: 'tbd'};
      match.team2 = {name: 'tbd'};
    }
  });
  return matches;
};

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
      group.teams = Teams.find({group: group._id}, {sort: {points: -1, goalDifference: -1}}).fetch();
    });
    return groups;
  },

  roundOf16: function() {
    return Template.Standings.getMatchesForStage('roundOf16');
  },

  quarterFinals: function() {
    return Template.Standings.getMatchesForStage('quarterFinals');
  },

  semiFinals: function() {
    return Template.Standings.getMatchesForStage('semiFinals');
  },

  final: function() {
    return Template.Standings.getMatchesForStage('final');
  },

  goalDifference: function(team) {
    const difference = team.goalDifference;
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

  $('.pages-wrapper').pageSwiper();
});

Template.Standings.onDestroyed(function () {
  $('.page-switcher').remove();
});
