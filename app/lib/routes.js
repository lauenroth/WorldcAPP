
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
Router.route('/chat');
Router.route('/bets');
Router.route('/bet/:_id', {
  name: 'Bet',
  waitOn: function() {
    return Meteor.subscribe('matches');
  },
  data: function() {
    let match = Matches.findOne({_id: this.params._id});
    if (match) {
      match.team1name = Teams.findOne({_id: match.team1}).name;
      match.team2name = Teams.findOne({_id: match.team2}).name;
      const bet = Bets.findOne({match: this.params._id, userId: Meteor.userId()});
      return {
        match: match,
        bet: bet
      };
    }
  },
});
Router.route('/ranking');
Router.route('/settings');
