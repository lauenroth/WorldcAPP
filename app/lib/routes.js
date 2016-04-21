
Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', function() {
  Router.go('/matches');
});

Router.route('/matches', {
  // waitOn: function() {
  //   return Meteor.subscribe('matches');
  // },
  // data: function() {
  //   let id = this.params._id;
  //   let list = {};
  //   if (id === 'inbox') {
  //     list._id = 'inbox';
  //     list.name = 'Inbox';
  //   }
  //   else {
  //     list = Lists.findOne({_id: id, owner: Meteor.userId()});
  //   }
  //
  //   if (list) {
  //     Session.set('title', list.name);
  //     Session.set('currentList', list);
  //   }
  //   else {
  //     Router.go('/');
  //   }
  //   return list;
  // }
});

Router.route('/standings');
Router.route('/chat');
Router.route('/bet');
