Bets = new Ground.Collection('bets');


/* Schema */
BetSchema = new SimpleSchema({

  match: {
    type: String,
    label: 'Match',
    autoform: {
      options: _.map(Matches.find().fetch(), function(match) {
        return {
          label: match.team1 + ' vs ' + match.team2,
          value: match._id
        };
      })
    }
  },

  score1: {
    type: Number,
    label: 'Score Team 1',
  },

  score2: {
    type: Number,
    label: 'Score Team 2',
  },

  points: {
    type: Number,
    label: 'Points',
    optional: true
  },

  userId: {
    type: String,
    autoValue: function() {
      return Meteor.userId();
    }
  }

});

Bets.attachSchema(BetSchema);


/* Access */
var whitelist = _.filter(_.keys(BetSchema), function (property) {
  return BetSchema[property].editable;
});


Bets.allow({
  insert: function() {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    let isAdmin = false;
    const user = Meteor.user();
    if (user.emails && user.emails.length) {
      AdminConfig.adminEmails.forEach(email => {
        if (email === user.emails[0].address) {
          isAdmin = true;
        }
      });
    }
    if (isAdmin) {
      return true;
    }
    if (userId && doc.userId === userId) {
      return true;
    }
  }
});
