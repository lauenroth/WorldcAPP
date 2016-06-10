Meteor.subscribe('users');

/*****************************************************************************/
/* Community: Event Handlers */
/*****************************************************************************/
Template.Community.events({

  'click .back': function() {
    const $editModal = $('.edit-community');
    if ($editModal.hasClass('show')) {
      $editModal.removeClass('show');
      $('#community-name').val(this.name);
    } else {
      Router.go('/communities');
    }
  },

  'click .ranking tr': function() {
    Router.go('/user/' + this._id);
  },

  'keyup #community-name': function() {
    let changed = $('#community-name').val() !== this.name;

    $('.edit-community button').prop('disabled', !changed);
  },

  'click .header-edit': function() {
    $('.edit-community').addClass('show');
  },

  'click .add': function() {
    Communities.update({_id: Session.get('communityId')}, {$pull: {pending: this._id}, $addToSet: {members: this._id}});
  },

  'click .reject': function() {
    Communities.update({_id: Session.get('communityId')}, {$pull: {pending: this._id}, $addToSet: {rejected: this._id}});
  },

  'submit .edit-community form': function(e) {
    e.preventDefault();
    const name = $('#community-name').val();
    const alreadyExists = Communities.findOne({name: name});
    if (alreadyExists && alreadyExists._id !== this._id) {
      error('Name is already used');
    } else {
      Communities.update({_id: this._id}, {$set: {name: name}});
      $('.edit-community').removeClass('show');
    }
  }

});

/*****************************************************************************/
/* Community: Helpers */
/*****************************************************************************/
Template.Community.helpers({

  members: function() {
    if (this._id === 'facebook') {
      // TODO
      return Session.get('fbFriends');
    }
    let members = Meteor.users.find({_id: {$in: this.members}}, {sort: {"profile.points": -1, "profile.name": 1}}).fetch();
    let rank = 1;
    let points = members[0].profile.points;
    members.forEach(member => {
      if (member._id === Meteor.userId()) {
        member.isCurrent = true;
      }
      if (!member.profile.name) {
        member.profile.name = member.username;
      }
      member.picture = '<i class="icon-user"></i>';
      if (member.services && member.services.facebook) {
        member.picture = '<img src="http://graph.facebook.com/' + member.services.facebook.id + '/picture/?type=large">';
      }
      member.profile.points = member.profile.points || 0;
      if (member.profile.points > 0) {
        if (member.profile.points < points) {
          points = member.profile.points;
          rank++;
        }
      } else {
        rank = '-';
      }
      member.rank = rank;
    });
    return members;
  },

  pendingRequests: function() {
    if (this.admin === Meteor.userId() && this.pending) {
      return Meteor.users.find({_id: {$in: this.pending}}, {sort: {"profile.name": 1}}).fetch();
    }
    return [];
  },

  isAdmin: function() {
    return this.admin === Meteor.userId();
  },

  friends: function() {
    if (this._id === 'facebook') {
      return Session.get('fbFriends');
    }
    return Meteor.users.find({_id: {$in: this.members}}).fetch();
  },

  me: function() {
    const fbUserData = Meteor.user().services.facebook;
    fbUserData.picture = "http://graph.facebook.com/" + fbUserData.id + "/picture/?type=large";
    return fbUserData;
  }

});

/*****************************************************************************/
/* Community: Lifecycle Hooks */
/*****************************************************************************/
Template.Community.onCreated(function () {
});

Template.Community.onRendered(function () {
  Session.set('menuItem', 'community');

  Session.set('communityId', this.data._id);

  if (this.data._id === 'facebook') {
    const fbUserData = Meteor.user().services.facebook;
    // console.log(fbUserData);

    $.get('https://graph.facebook.com/v2.6/' + fbUserData.id + '/friends/?access_token=' + fbUserData.accessToken + '&fields=name,id,picture', function(result) {
      console.log(result);
      console.log(result.data);
      Session.set('fbFriends', result.data);
    }, function(err) {
      console.log(err);
    });
  }
});

Template.Community.onDestroyed(function () {
});
