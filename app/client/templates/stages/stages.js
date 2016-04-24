/*****************************************************************************/
/* Stages: Event Handlers */
/*****************************************************************************/
Template.Stages.events({

  'click .group-stage a': function(e) {
    e.preventDefault();
    Session.set('stage', 'group');
  },

  'click .knock-out-stage a': function(e) {
    e.preventDefault();
    Session.set('stage', 'knock-out');
  },

});

/*****************************************************************************/
/* Stages: Helpers */
/*****************************************************************************/
Template.Stages.helpers({

  isGroupStage: function() {
    return Session.get('stage') === 'group';
  },

});

/*****************************************************************************/
/* Stages: Lifecycle Hooks */
/*****************************************************************************/
Template.Stages.onCreated(function () {
});

Template.Stages.onRendered(function () {
});

Template.Stages.onDestroyed(function () {
});
