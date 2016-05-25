Template.CommunityListItem.events({

  'click li': function() {
    Router.go('/communities/' + this._id);
  },

});

Template.CommunityListItem.helpers({

  isAdmin: function() {
    return this.admin === Meteor.userId();
  },

});
