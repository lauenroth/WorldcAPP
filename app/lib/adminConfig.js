AdminConfig = {
  name: 'WorldcAPP',
  adminEmails: ['joerg@lauenroth.org'],
  collections: {
    Tournaments: {
      tableColumns: [
        {
          label: 'Name',
          name: 'name'
        },
        {
          label: 'is active',
          name: 'isActive'
        }
      ]
    },
    Groups: {
      tableColumns: [
        {
          label: 'Name',
          name: 'name'
        },
        {
          label: 'Tournament',
          name: 'tournament'
        },
      ]
    },
    Teams: {
      tableColumns: [
        {
          label: 'Name',
          name: 'name'
        },
        {
          label: 'Tournament',
          name: 'tournament'
        }
      ]
    },

    // Players: {},
    Matches: {
      tableColumns: [
        {
          label: 'Team 1',
          name: 'team1'
        },
        {
          label: 'Team 2',
          name: 'team2'
        },
        {
          label: 'Date',
          name: 'date'
        }
      ]
    },
    // Bets: {},
  },

  autoForm: {
    omitFields: ['createdAt', 'userId']
  }
};
