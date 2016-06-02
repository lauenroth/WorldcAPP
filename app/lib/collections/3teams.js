Teams = new Ground.Collection('teams');


/* Schema */
TeamSchema = new SimpleSchema({

  name: {
    type: String,
    label: 'Name',
  },

  coach: {
    type: String,
    label: 'Coach',
    optional: true
  },

  tournament: {
    type: String,
    label: 'Tournament',
    // autoform: {
    //   options: _.map(Tournaments.find().fetch(), function(tournament) {
    //     return {
    //       label: tournament.name,
    //       value: tournament._id
    //     };
    //   })
    // }
  },

  group: {
    type: String,
    label: 'Group',
    optional: true,
    // autoform: {
    //   options: _.map(Groups.find().fetch(), function(group) {
    //     return {
    //       label: group.name + ' (' + group.tournament + ')',
    //       value: group._id
    //     };
    //   })
    // }
  },

  won: {
    type: Number,
    label: 'Won',
    defaultValue: 0
  },

  draw: {
    type: Number,
    label: 'Draw',
    defaultValue: 0
  },

  lost: {
    type: Number,
    label: 'Lost',
    defaultValue: 0
  },

  goalsFor: {
    type: Number,
    label: 'Goals for',
    defaultValue: 0
  },

  goalsAgainst: {
    type: Number,
    label: 'Goals agains',
    defaultValue: 0
  },

  goalDifference: {
    type: Number,
    label: 'Goal difference',
    defaultValue: 0
  },

  points: {
    type: Number,
    label: 'Points',
    defaultValue: 0
  },

});

Teams.attachSchema(TeamSchema);


/* Access */
var whitelist = _.filter(_.keys(TeamSchema), function (property) {
  return TeamSchema[property].editable;
});


Teams.allow({
  update: function (userId, doc, fields, modifier) {
    if (userId && doc.userId === userId && _.difference(fields, whitelist).length === 0) {
      return true;
    }
  }
});
