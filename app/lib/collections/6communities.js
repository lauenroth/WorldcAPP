Communities = new Ground.Collection('communities');


/* Schema */
CommunitySchema = new SimpleSchema({

  name: {
    type: String,
    label: 'Name',
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
    label: 'Is public',
  },

  admin: {
    type: String,
    label: 'Admin',
    // autoValue: function() {
    //   return Meteor.userId();
    // }
  }

});

Communities.attachSchema(CommunitySchema);


/* Access */
Communities.allow({
  insert: function() {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    const allowedFields = {
      admin: ['name', 'members', 'pending', 'invites', 'rejected', 'isPublic'],
    };
    if (userId && doc.admin === userId && _.difference(fields, allowedFields.admin).length === 0) {
      return true;
    }
    console.log(modifier, userId);
    if (userId) {
      let allowedModifier = {
        $addToSet: {pending: userId},
      };
      if (doc.isPublic) {
        allowedModifier = {
          $addToSet: {members: userId},
        };
      }
      console.log(allowedModifier)
      return _.isEqual(modifier, allowedModifier);
    }
  }
});
