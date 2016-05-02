Meteor.startup(() => {

  if (!Tournaments.findOne({_id: 'euro2016'})) {

    Tournaments.insert({
      _id: 'euro2016',
      name: 'UEFA Euro 2016',
      isActive: true,
    });

    // Groups
    Groups.remove({});
    const groups = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F'];
    groups.forEach(group => {
      Groups.insert({
        _id: 'euro2016_' + group.replace(' ', ''),
        name: group,
        tournament: 'euro2016',
      });
    });

    // Teams
    Teams.remove({});
    const teams = [{
      _id: 'euro2016_Albania',
      name: 'Albania',
      group: 'euro2016_GroupA'
    },{
      _id: 'euro2016_France',
      name: 'France',
      group: 'euro2016_GroupA'
    },{
      _id: 'euro2016_Romania',
      name: 'Romania',
      group: 'euro2016_GroupA'
    },{
      _id: 'euro2016_Switzerland',
      name: 'Switzerland',
      group: 'euro2016_GroupA'
    },{
      _id: 'euro2016_England',
      name: 'England',
      group: 'euro2016_GroupB'
    },{
      _id: 'euro2016_Russia',
      name: 'Russia',
      group: 'euro2016_GroupB'
    },{
      _id: 'euro2016_Slovakia',
      name: 'Slovakia',
      group: 'euro2016_GroupB'
    },{
      _id: 'euro2016_Wales',
      name: 'Wales',
      group: 'euro2016_GroupB'
    },{
      _id: 'euro2016_Germany',
      name: 'Germany',
      group: 'euro2016_GroupC'
    },{
      _id: 'euro2016_Northern_Ireland',
      name: 'Northern Ireland',
      group: 'euro2016_GroupC'
    },{
      _id: 'euro2016_Poland',
      name: 'Poland',
      group: 'euro2016_GroupC'
    },{
      _id: 'euro2016_Ukraine',
      name: 'Ukraine',
      group: 'euro2016_GroupC'
    },{
      _id: 'euro2016_Croatia',
      name: 'Croatia',
      group: 'euro2016_GroupD'
    },{
      _id: 'euro2016_Czech_Republic',
      name: 'Czech Republic',
      group: 'euro2016_GroupD'
    },{
      _id: 'euro2016_Spain',
      name: 'Spain',
      group: 'euro2016_GroupD'
    },{
      _id: 'euro2016_Turkey',
      name: 'Turkey',
      group: 'euro2016_GroupD'
    },{
      _id: 'euro2016_Belgium',
      name: 'Belgium',
      group: 'euro2016_GroupE'
    },{
      _id: 'euro2016_Italy',
      name: 'Italy',
      group: 'euro2016_GroupE'
    },{
      _id: 'euro2016_Republic_of_Ireland',
      name: 'Republic of Ireland',
      group: 'euro2016_GroupE'
    },{
      _id: 'euro2016_Sweden',
      name: 'Sweden',
      group: 'euro2016_GroupE'
    },{
      _id: 'euro2016_Austria',
      name: 'Austria',
      group: 'euro2016_GroupF'
    },{
      _id: 'euro2016_Hungary',
      name: 'Hungary',
      group: 'euro2016_GroupF'
    },{
      _id: 'euro2016_Iceland',
      name: 'Iceland',
      group: 'euro2016_GroupF'
    },{
      _id: 'euro2016_Portugal',
      name: 'Portugal',
      group: 'euro2016_GroupF'
    }];
    teams.forEach(team => {
      team.tournament = 'euro2016';
      Teams.insert(team);
    });

    // Matches
    Matches.remove({});
    const groupMatches = [{
      team1: 'euro2016_France',
      team2: 'euro2016_Romania',
      date: Date.UTC(2016,5,10,21,00),
      stadium: 'Stade de France, Saint-Denis'
    },{
      team1: 'euro2016_Albania',
      team2: 'euro2016_Switzerland',
      date: Date.UTC(2016,5,11,15,00),
      stadium: 'Stade Bollaert-Delelis, Lens Agglo'
    },{
      team1: 'euro2016_Wales',
      team2: 'euro2016_Slovakia',
      date: Date.UTC(2016,5,11,18,00),
      stadium: 'Stade de Bordeaux, Bordeaux'
    },{
      team1: 'euro2016_England',
      team2: 'euro2016_Russia',
      date: Date.UTC(2016,5,11,21,00),
      stadium: 'Stade Vélodrome, Marseille'
    },{
      team1: 'euro2016_Turkey',
      team2: 'euro2016_Croatia',
      date: Date.UTC(2016,5,12,15,00),
      stadium: 'Parc des Princes, Paris'
    },{
      team1: 'euro2016_Poland',
      team2: 'euro2016_Northern_Ireland',
      date: Date.UTC(2016,5,12,18,00),
      stadium: 'Stade de Nice, Nice'
    },{
      team1: 'euro2016_Germany',
      team2: 'euro2016_Ukraine',
      date: Date.UTC(2016,5,12,21,00),
      stadium: 'Stade Pierre Mauroy, Lille Métropole'
    },{
      team1: 'euro2016_Spain',
      team2: 'euro2016_Czech_Republic',
      date: Date.UTC(2016,5,13,15,00),
      stadium: 'Stade de Toulouse, Toulouse'
    },{
      team1: 'euro2016_Republic_of_Ireland',
      team2: 'euro2016_Sweden',
      date: Date.UTC(2016,5,13,18,00),
      stadium: 'Stade de France, Saint-Denis'
    },{
      team1: 'euro2016_Belgium',
      team2: 'euro2016_Italy',
      date: Date.UTC(2016,5,13,21,00),
      stadium: 'Stade de Lyon, Lyon'
    },{
      team1: 'euro2016_Austria',
      team2: 'euro2016_Hungary',
      date: Date.UTC(2016,5,14,18,00),
      stadium: 'Stade de Bordeaux, Bordeaux'
    },{
      team1: 'euro2016_Portugal',
      team2: 'euro2016_Iceland',
      date: Date.UTC(2016,5,14,21,00),
      stadium: 'Stade Geoffroy Guichard, Saint-Etienne'
    },
    {
      team1: 'euro2016_Russia',
      team2: 'euro2016_Slovakia',
      date: Date.UTC(2016,5,15,15,00),
      stadium: 'Stade Pierre Mauroy, Lille Métropole'
    },{
      team1: 'euro2016_Romania',
      team2: 'euro2016_Switzerland',
      date: Date.UTC(2016,5,15,18,00),
      stadium: 'Parc des Princes, Paris'
    },{
      team1: 'euro2016_France',
      team2: 'euro2016_Albania',
      date: Date.UTC(2016,5,15,21,00),
      stadium: 'Stade Vélodrome, Marseille'
    },{
      team1: 'euro2016_England',
      team2: 'euro2016_Wales',
      date: Date.UTC(2016,5,16,15,00),
      stadium: 'Stade Bollaert-Delelis, Lens Agglo'
    },{
      team1: 'euro2016_Ukraine',
      team2: 'euro2016_Northern_Ireland',
      date: Date.UTC(2016,5,16,18,00),
      stadium: 'Stade de Lyon, Lyon'
    },{
      team1: 'euro2016_Germany',
      team2: 'euro2016_Poland',
      date: Date.UTC(2016,5,16,21,00),
      stadium: 'Stade de France, Saint-Denis'
    },{
      team1: 'euro2016_Italy',
      team2: 'euro2016_Sweden',
      date: Date.UTC(2016,5,17,15,00),
      stadium: 'Stade de Toulouse, Toulouse'
    },{
      team1: 'euro2016_Czech_Republic',
      team2: 'euro2016_Croatia',
      date: Date.UTC(2016,5,17,18,00),
      stadium: 'Stade Geoffroy Guichard, Saint-Etienne'
    },{
      team1: 'euro2016_Spain',
      team2: 'euro2016_Turkey',
      date: Date.UTC(2016,5,17,21,00),
      stadium: 'Stade de Nice, Nice'
    },{
      team1: 'euro2016_Belgium',
      team2: 'euro2016_Republic_of_Ireland',
      date: Date.UTC(2016,5,18,15,00),
      stadium: 'Stade de Bordeaux, Bordeaux'
    },{
      team1: 'euro2016_Iceland',
      team2: 'euro2016_Hungary',
      date: Date.UTC(2016,5,18,18,00),
      stadium: 'Stade Vélodrome, Marseille'
    },{
      team1: 'euro2016_Portugal',
      team2: 'euro2016_Austria',
      date: Date.UTC(2016,5,18,21,00),
      stadium: 'Parc des Princes, Paris'
    },
    {
      team1: 'euro2016_Romania',
      team2: 'euro2016_Albania',
      date: Date.UTC(2016,5,19,21,00),
      stadium: 'Stade de Lyon, Lyon'
    },{
      team1: 'euro2016_Switzerland',
      team2: 'euro2016_France',
      date: Date.UTC(2016,5,19,21,00),
      stadium: 'Stade Pierre Mauroy, Lille Métropole'
    },{
      team1: 'euro2016_Russia',
      team2: 'euro2016_Wales',
      date: Date.UTC(2016,5,20,21,00),
      stadium: 'Stade de Toulouse, Toulouse'
    },{
      team1: 'euro2016_Slovakia',
      team2: 'euro2016_England',
      date: Date.UTC(2016,5,20,21,00),
      stadium: 'Stade Geoffroy Guichard, Saint-Etienne'
    },{
      team1: 'euro2016_Ukraine',
      team2: 'euro2016_Poland',
      date: Date.UTC(2016,5,21,18,00),
      stadium: 'Stade Vélodrome, Marseille'
    },{
      team1: 'euro2016_Northern_Ireland',
      team2: 'euro2016_Germany',
      date: Date.UTC(2016,5,21,18,00),
      stadium: 'Parc des Princes, Paris'
    },{
      team1: 'euro2016_Czech_Republic',
      team2: 'euro2016_Turkey',
      date: Date.UTC(2016,5,21,21,00),
      stadium: 'Stade Bollaert-Delelis, Lens Agglo'
    },{
      team1: 'euro2016_Croatia',
      team2: 'euro2016_Spain',
      date: Date.UTC(2016,5,21,21,00),
      stadium: 'Stade de Bordeaux, Bordeaux'
    },{
      team1: 'euro2016_Iceland',
      team2: 'euro2016_Austria',
      date: Date.UTC(2016,5,22,18,00),
      stadium: 'Stade de France, Saint-Denis'
    },{
      team1: 'euro2016_Hungary',
      team2: 'euro2016_Portugal',
      date: Date.UTC(2016,5,22,18,00),
      stadium: 'Stade de Lyon, Lyon'
    },{
      team1: 'euro2016_Italy',
      team2: 'euro2016_Republic_of_Ireland',
      date: Date.UTC(2016,5,22,21,00),
      stadium: 'Stade Pierre Mauroy, Lille Métropole'
    },{
      team1: 'euro2016_Sweden',
      team2: 'euro2016_Belgium',
      date: Date.UTC(2016,5,22,21,00),
      stadium: 'Stade de Nice, Nice'
    }];
    groupMatches.forEach(match => {
      match.stage = 'group';
      match.tournament = 'euro2016';
      Matches.insert(match);
    });

    const knockOutMatches = [{
      team1: 'tbd',
      team2: 'tbd',
      date: Date.UTC(2016,5,25,15,00),
      stadium: 'Stade Geoffroy Guichard, Saint-Etienne'
    },{
      team1: 'tbd',
      team2: 'tbd',
      date: Date.UTC(2016,5,25,18,00),
      stadium: 'Parc des Princes, Paris'
    },{
      team1: 'tbd',
      team2: 'tbd',
      date: Date.UTC(2016,5,25,21,00),
      stadium: 'Stade Bollaert-Delelis, Lens Agglo'
    },{
      team1: 'tbd',
      team2: 'tbd',
      date: Date.UTC(2016,5,26,15,00),
      stadium: 'Stade de Lyon, Lyon'
    },{
      team1: 'tbd',
      team2: 'tbd',
      date: Date.UTC(2016,5,26,18,00),
      stadium: 'Stade Pierre Mauroy, Lille Métropole'
    },{
      team1: 'tbd',
      team2: 'tbd',
      date: Date.UTC(2016,5,26,21,00),
      stadium: 'Stade de Toulouse, Toulouse'
    },{
      team1: 'tbd',
      team2: 'tbd',
      date: Date.UTC(2016,5,27,18,00),
      stadium: 'Stade de Franca, Saint-Denis'
    },{
      team1: 'tbd',
      team2: 'tbd',
      date: Date.UTC(2016,5,27,21,00),
      stadium: 'Stade de Nice, Nice'
    }];
    knockOutMatches.forEach(match => {
      match.stage = 'knock-out';
      match.tournament = 'euro2016';
      Matches.insert(match);
    });

  }

});
