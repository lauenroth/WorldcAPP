Meteor.users.allow({
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
    return false;
  }
});
