Tournaments = new Ground.Collection('tournaments');


/* Schema */
SimpleSchema.extendOptions({
  // editable: Match.Optional(Boolean)
});

TournamentSchema = new SimpleSchema({

  name: {
    type: String,
    label: 'Name',
  },

  isActive: {
    type: Boolean,
    label: 'Is active'
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  }

});

Tournaments.attachSchema(TournamentSchema);


/* Access */
var whitelist = _.filter(_.keys(TournamentSchema), function (property) {
  return TournamentSchema[property].editable;
});


Tournaments.allow({
  update: function (userId, doc, fields, modifier) {
    if (userId && doc.userId === userId && _.difference(fields, whitelist).length === 0) {
      return true;
    }
  }
});
