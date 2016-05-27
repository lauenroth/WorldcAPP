Matches = new Ground.Collection('matches');


/* Schema */
MatchSchema = new SimpleSchema({

  date: {
    type: Date,
    label: 'Date / time'
  },

  team1: {
    type: String,
    label: 'Team 1',
    // autoform: {
    //   options: _.map(Teams.find().fetch(), function(team) {
    //     return {
    //       label: team.name,
    //       value: team._id
    //     };
    //   })
    // }
  },

  team2: {
    type: String,
    label: 'Team 2',
    // autoform: {
    //   options: _.map(Teams.find().fetch(), function(team) {
    //     return {
    //       label: team.name,
    //       value: team._id
    //     };
    //   })
    // }
  },

  stadium: {
    type: String,
    label: 'Stadium',
  },

  stage: {
    type: String,
    label: 'Stage',
    autoform: {
      options: [{
        label: 'Group stage',
        value:'group'
      }, {
        label: 'Round of 16',
        value: 'roundOf16'
      }, {
        label: 'Quarter finals',
        value: 'quarterFinals'
      }, {
        label: 'Semi-finals',
        value: 'semiFinals'
      }, {
        label: 'Final',
        value: 'final'
      }]
    }
  },

  tournament: {
    type: String,
    label: 'Tournament'
  },

  score1: {
    type: Number,
    label: 'Score Team 1',
    optional: true,
  },

  score2: {
    type: Number,
    label: 'Score Team 2',
    optional: true,
  },

  score1halftime: {
    type: Number,
    label: 'Score Team 1 (halftime)',
    optional: true,
  },

  score2halftime: {
    type: Number,
    label: 'Score Team 2 halftime',
    optional: true,
  },

});

Matches.attachSchema(MatchSchema);


/* Access */
var whitelist = _.filter(_.keys(MatchSchema), function (property) {
  return MatchSchema[property].editable;
});


Matches.allow({
  update: function (userId, doc, fields, modifier) {
    if (userId && doc.userId === userId && _.difference(fields, whitelist).length === 0) {
      return true;
    }
  }
});
