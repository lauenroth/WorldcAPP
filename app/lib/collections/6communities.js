Communities = new Ground.Collection('communities');


/* Schema */
CommunitySchema = new SimpleSchema({

  name: {
    type: String,
    label: 'Name'
  },

  members: {
    type: [String],
    label: 'Members',
    autoform: {
      options: _.map(Meteor.users.find().fetch(), function(user) {
        return {
          label: user.emails ? user.emails[0].address : '??',
          value: user._id
        };
      })
    }
  },

  invites: {
    type: [String],
    label: 'Invites',
    optional: true,
  },

  pending: {
    type: [String],
    label: 'Pending',
    optional: true,
  },

  rejected: {
    type: [String],
    label: 'Rejected',
    optional: true,
  },

  isPublic: {
    type: Boolean,
    label: 'Is public'
  },

  admin: {
    type: String,
    label: 'Admin',
    autoValue: function() {
      return Meteor.userId();
    }
  }

});

Communities.attachSchema(CommunitySchema);


/* Access */
var whitelist = _.filter(_.keys(CommunitySchema), function (property) {
  return CommunitySchema[property].editable;
});


Communities.allow({
  update: function (userId, doc, fields, modifier) {
    if (userId && doc.admin === userId && _.difference(fields, whitelist).length === 0) {
      return true;
    }
  }
});
