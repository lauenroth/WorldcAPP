/*****************************************************************************/
/* Login: Event Handlers */
/*****************************************************************************/
Template.Login.events({

  'click .login .back': function() {
    $('.login').removeClass('show');
  },

  'click .options .sign-in': function() {
    $('.login').addClass('sign-in').removeClass('sign-up');
    $('.login-form button[type="submit"]').html('Sign in');
  },

  'click .options .sign-up': function() {
    $('.login').addClass('sign-up').removeClass('sign-in');
    $('.login-form button[type="submit"]').html('Sign up');
  },

  'click .forgot-password': function() {
    error('TODO');
    // Accounts.forgotPassword({email: 'TODO'}, err => {
    //   if (err) {
    //     error(err.reason);
    //   } else {
    //     info('Email was sent. Please check your mailbox.');
    //   }
    // });
  },

  'click .facebook': function() {
    Meteor.loginWithFacebook({
      requestPermissions: ['user_friends', 'public_profile', 'email']
    }, err => {
      if (err) {
        error(err.message);
      }
    });
  },

  'click .google': function() {
    Meteor.loginWithGoogle({

    }, err => {
      if (err) {
        error(err.message);
      }
    });
  },

  'submit .login form': function(e) {
    e.preventDefault();
    const login = {
      username: $('#login-name').val(),
      email: $('#login-email').val(),
      password: $('#login-password').val(),
    };
    if ($('.login').hasClass('sign-in')) {

      if (login.email.length === 0) {
        error('Please fill in your email address');
      } else if (login.password.length === 0) {
        error('Please fill in your password');
      } else {
        Meteor.loginWithPassword(login.email,login.password, err => {
          if (err) {
            error(err.reason);
            if (err.reason === 'Incorrect password') {
              $('#login-password').select();
            }
          }
        });
      }
    } else {
      if (login.username.length === 0) {
        error('Please fill in your name');
      } else if (login.email.length === 0) {
        error('Please fill in your email address');
      } else if (login.password.length === 0) {
        error('Please fill in your password');
      } else {
        Accounts.createUser(login, err => {
          if (err) {
            error(err.reason);
          }
        });
      }
    }
  }

});

/*****************************************************************************/
/* Login: Helpers */
/*****************************************************************************/
Template.Login.helpers({

  isSettingsPage: function() {
    return Session.get('menuItem') === 'settings';
  },

});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.Login.onCreated(function () {
});

Template.Login.onRendered(function () {
});

Template.Login.onDestroyed(function () {
});
