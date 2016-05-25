Template.CommunityResultItem.events({

  'click button': function() {
    if (this.members.indexOf(Meteor.userId()) === -1) {
      if (this.isPublic) {
        Communities.update({_id: this._id}, {$addToSet: {members: Meteor.userId()}});
      } else {
        Communities.update({_id: this._id}, {$addToSet: {pending: Meteor.userId()}});
      }

    }
  },

});

Template.CommunityResultItem.helpers({

  isMember: function() {
    return this.members.indexOf(Meteor.userId()) !== -1;
  },

  isPending: function() {
    return this.pending && this.pending.indexOf(Meteor.userId()) !== -1;
  },

  isRejected: function() {
    return this.rejected && this.rejected.indexOf(Meteor.userId()) !== -1;
  },

});
