Meteor.subscribe('communities');

/*****************************************************************************/
/* Communities: Event Handlers */
/*****************************************************************************/
Template.Communities.events({

  // 'click .facebook': function() {
  //   Router.go('/communities/facebook');
  // },

  'click .buttons .search': function(e) {
    e.preventDefault();
    $('.modal.search-community').addClass('show');
    setTimeout(() => {
      $('#search').focus();
    }, 300);
  },

  'click .buttons .add': function(e) {
    e.preventDefault();
    if (Meteor.userId()) {
      $('.modal.add-community').addClass('show');
    } else {
      $('.login').addClass('show');
    }
  },

  'click .modal .back': function() {
    $('.modal.show').removeClass('show');
    Session.set('communitySearch', '');
    $('#search').val('');
    $('#community-name').val('');
  },

  'keyup #search': function() {
    Session.set('communitySearch', $('#search').val());
  },

  'submit .add-community form': function(e) {
    e.preventDefault();
    const community = {
      name: $('#community-name').val(),
      isPublic: $('#community-is-public').is(':checked'),
      admin: Meteor.userId(),
      members: [Meteor.userId()],
    };
    if (community.name.length === 0) {
      error('A name is required');
    } else {
      const alreadyExists = Communities.findOne({name: community.name});
      if (alreadyExists) {
        error('This name is already taken');
      } else {
        if (Communities.insert(community)) {
          info('Community has been created');
          $('.modal.add-community').removeClass('show');
        } else {
          error('Community could not be created');
        }
      }
    }
  },

});

/*****************************************************************************/
/* Communities: Helpers */
/*****************************************************************************/
Template.Communities.helpers({

  communities: function() {
    return Communities.find({members: Meteor.userId()}, {sort: {name: 1}}).fetch();
  },

  hasFacebookConnection: function() {
    const user = Meteor.user();
    return (user && user.services && user.services.facebook);
  },

  hasSearched: function() {
    const searchTerm = Session.get('communitySearch');
    return searchTerm && searchTerm.length > 0;
  },

  searchTerm: function() {
    return Session.get('communitySearch');
  },

  searchResult: function() {
    const searchTerm = Session.get('communitySearch');
    return Communities.find({name: new RegExp('.*' + searchTerm + '.*', 'i')}).fetch();
  },

});

/*****************************************************************************/
/* Communities: Lifecycle Hooks */
/*****************************************************************************/
Template.Communities.onCreated(function () {
});

Template.Communities.onRendered(function () {
  Session.set('menuItem', 'community');
});

Template.Communities.onDestroyed(function () {
});
