import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser(function(options, user) {
  if (!user.profile) user.profile = {};
  if (user.username) {
    user.profile.name = user.username;
  } else if (user.services) {
    if (user.services.facebook) {
      user.profile.name = user.services.facebook.name;
    } else if (user.services.google) {
      user.profile.name = user.services.google.name;
    }
  }
  user.profile.supportedTeam = 'tbd';
  user.profile.points = 0;
  return user;
});
