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
  }

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
