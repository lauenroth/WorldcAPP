
// transforms name into a machine usable name
Handlebars.registerHelper('machineName', function(name) {
  if (name)
    return name.toLowerCase().replace(' ', '_');
});

// formats a date to DD/MM/YYYY
Handlebars.registerHelper('dateFormat', function(date) {
  return moment.utc(date).format('DD/MM/YYYY');
});

// formats a date to HH:mm
Handlebars.registerHelper('timeFormat', function(time) {
  return moment.utc(time).format('HH:mm');
});

Handlebars.registerHelper('isset', function(value) {
  return value !== undefined;
});

Handlebars.registerHelper('userName', function(userId) {
  const user = Meteor.users.findOne({_id: userId});
  if (user) {
    return user.profile ? user.profile.name : user.emails[0].address;
  }
  return 'Anonymous';
});
