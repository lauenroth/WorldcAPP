
// transforms name into a machine usable name
Handlebars.registerHelper('machineName', function(name) {
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
