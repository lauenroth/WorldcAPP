Groups = new Ground.Collection('groups');


/* Schema */
GroupSchema = new SimpleSchema({

  name: {
    type: String,
    label: 'Name',
  },

  tournament: {
    type:  String,
    label: 'Tournament'
  }

});

Groups.attachSchema(GroupSchema);


/* Access */
var whitelist = _.filter(_.keys(GroupSchema), function (property) {
  return GroupSchema[property].editable;
});


Groups.allow({
  update: function (userId, doc, fields, modifier) {
    if (userId && doc.userId === userId && _.difference(fields, whitelist).length === 0) {
      return true;
    }
  }
});
