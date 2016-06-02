
Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', function() {
  Router.go('/matches');
});

Router.route('/matches');

Router.route('/standings');

Router.route('/communities');
Router.route('/communities/:id', {
  name: 'Community',
  data: function() {
    if (this.params.id === 'facebook') {
      // let friends = [];
      // if (Meteor.user()) {
      //   const fbUserData = Meteor.user().services.facebook;
      //   $.get('https://graph.facebook.com/v2.6/' + fbUserData.id + '/friends/?access_token=' + fbUserData.accessToken + '&fields=name,id,picture', function(result) {
      //     console.log(result);
      //     friends = result.data;
      //   });
      // }
      return {
        _id: 'facebook',
        name: 'Facebook friends',
        // friends: friends,
      };
    }
    return Communities.findOne({_id: this.params.id});
  }
});

// Router.route('/chat-groups');
// Router.route('/chat');
// Router.route('/chat/:id', {
//   name: 'Chat',
//   data: function() {
//     return ChatRooms.findOne({_id: this.params.id});
//   },
// });
Router.route('/bets');
Router.route('/bet', {
  name: 'Bet',
  data: function() {
    const matchId = Session.get('currentBet');
    let match = Matches.findOne({_id: matchId});
    if (match) {
      match.team1name = Teams.findOne({_id: match.team1}).name;
      match.team2name = Teams.findOne({_id: match.team2}).name;
      const bet = Bets.findOne({match: matchId, userId: Meteor.userId()});
      return {
        match: match,
        bet: bet,
        matches: Matches.find({
          tournament: Session.get('tournament'),
          stage: 'group',
        }, {sort: {date: 1, team1: 1, team2: 1}}).fetch(),
      };
    }
  }
});
Router.route('/ranking');
Router.route('/settings');
Router.route('/user/:id', {
  name: 'User',
  data: function() {
    return Meteor.users.findOne({_id: this.params.id});
  }
});

Router.route('/dev', {
  name: 'Dev'
});
