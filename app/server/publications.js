
// User data
Meteor.publish('userData', function() {
  const currentUser = this.userId;
  if (currentUser) {
    return Meteor.users.find({
      _id: currentUser
    }, {
      fields: {
        // Default
        emails: 1,
        // Created profile property
        profile: 1,
        // Created roles property
        //  “roles”: 1
        supportedTeam: 1,
      }
    });
  } else {
    return this.ready();
  }
});


// Tournament
Meteor.publish('currentTournament', function() {
  return Tournaments.find({isActive: true});
});

// Groups
Meteor.publish('groups', function() {
  const currentTournament = Tournaments.findOne({isActive: true});
  return Groups.find({tournament: currentTournament._id});
});

// Teams
Meteor.publish('teams', function() {
  const currentTournament = Tournaments.findOne({isActive: true});
  return Teams.find({tournament: currentTournament._id});
});

// Matches
Meteor.publish('matches', function() {
  const currentTournament = Tournaments.findOne({isActive: true});
  return Matches.find({tournament: currentTournament._id});
});

// Bets
Meteor.publish('myBets', function() {
  return Bets.find({userId: this.userId});
});
Meteor.publish('memberBets', function() {
  let userIds = [];
  const myCommunities = Communities.find({members: this.userId});
  myCommunities.forEach(community => {
    community.members.forEach(userId => {
      userIds.push(userId);
    });
  });
  return Bets.find({userId: {$in: userIds}});
});

// Communities
Meteor.publish('communities', function() {
  return Communities.find({});
});

// Chat
Meteor.publish('chats', function() {
  return Chats.find();
});


// Users
Meteor.publish('users', function() {
  if (this.userId !== 'mcdBCuqcjYPKhZBve') {
    let userIds = [];
    const myCommunities = Communities.find({members: this.userId});
    myCommunities.forEach(community => {
      community.members.forEach(userId => {
        userIds.push(userId);
      });
      if (this.userId === community.admin && community.pending) {
        community.pending.forEach(pending => {
          userIds.push(pending);
        });
      }
    });
    return Meteor.users.find({_id: {$in: userIds}});
  } else {
    return Meteor.users.find();
  }
});
