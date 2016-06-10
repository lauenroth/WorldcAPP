/*****************************************************************************/
/* Menu: Event Handlers */
/*****************************************************************************/
Template.Menu.events({

  'click a': function(e) {
    $('nav.main a').removeClass('active');
    $(e.currentTarget).addClass('active');
  },

});

/*****************************************************************************/
/* Menu: Helpers */
/*****************************************************************************/
Template.Menu.helpers({

  isActive: function(name) {
    return Session.get('menuItem') === name ? 'active' : '';
  },

  pendingRequests: function() {
    let pendingRequests = 0;
    const communities = Communities.find({admin: Meteor.userId(), pending: {$exists: 1}}).fetch();
    communities.forEach(community => {
      pendingRequests += community.pending.length;
    });
    return pendingRequests;
  },

});

/*****************************************************************************/
/* Menu: Lifecycle Hooks */
/*****************************************************************************/
Template.Menu.onCreated(function () {
});

Template.Menu.onRendered(function () {
});

Template.Menu.onDestroyed(function () {
});
