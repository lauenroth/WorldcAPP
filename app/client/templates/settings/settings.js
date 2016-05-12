/*****************************************************************************/
/* Settings: Event Handlers */
/*****************************************************************************/
Template.Settings.events({

  'click .change-team': function() {
    $('.choose-team').addClass('show');
  },

  'click .choose-team .team': function(e) {
    const $selectedTeam = $(e.currentTarget);
    $('#supported-team').val($selectedTeam.data('id'));
    $('.change-team').prop('class', 'change-team ' + $selectedTeam.find('.flag').prop('class'));
    $('.team1 .name').html($selectedTeam.find('.name').html());
    $('.choose-team').removeClass('show');
  },

  'submit form': function(e) {
    e.preventDefault();
    const profile = {
      name: $('#name').val(),
      email: $('#email').val(),
      supportedTeam: $('#supported-team').val(),
    };
    $('button[type="submit"]').blur();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: {name: profile.name, supportedTeam: profile.supportedTeam}}});
  },

});

/*****************************************************************************/
/* Settings: Helpers */
/*****************************************************************************/
Template.Settings.helpers({

  user: function() {
    const user = Meteor.user();
    user.profile.email = user.emails[0].address;
    user.profile.supportedTeamFlag = 'tbd';
    if (user.profile.supportedTeam) {
      user.profile.supportedTeamName = Teams.findOne({_id: user.profile.supportedTeam}).name;
      user.profile.supportedTeamFlag = Teams.findOne({_id: user.profile.supportedTeam}).name;
    }
    return user.profile;
  },

  teams: function() {
    return Teams.find({}, {sort: {name: 1}});
  },

});

/*****************************************************************************/
/* Settings: Lifecycle Hooks */
/*****************************************************************************/
Template.Settings.onCreated(function () {
});

Template.Settings.onRendered(function () {
  Session.set('menuItem', 'settings');
});

Template.Settings.onDestroyed(function () {
});
