
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
