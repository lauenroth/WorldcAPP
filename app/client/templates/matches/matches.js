/*****************************************************************************/
/* Matches: Event Handlers */
/*****************************************************************************/
Template.Matches.events({
});

/*****************************************************************************/
/* Matches: Helpers */
/*****************************************************************************/
Template.Matches.helpers({

  groupedMatches: function(stage) {
    const groupedMatches = [];
    const matches = Matches.find({
      tournament: Session.get('tournament'),
      stage: stage || Session.get('stage'),
    }, {sort: {date: 1}}).fetch();
    let currentDayMatches = [];
    let currentDay = false;
    matches.forEach(match => {
      if (match.team1 !== 'tbd') {
        const team1 = Teams.findOne({_id: match.team1});
        match.team1name = team1.name;
        match.group = Groups.findOne({_id: team1.group}).name;
      }
      else {
        match.team1name = 'TBD';
        match.group = 'Round of 16';
      }
      match.team2name = (match.team2 === 'tbd' ? 'TBD' : Teams.findOne({_id: match.team2}).name);


      // same day as the current day?
      const matchDay = moment.utc(match.date).format('DD/MM/YYYY');
      if (!currentDay) {
        currentDay = matchDay;
        Session.set('currentDay', currentDay);
      } else if (currentDay !== matchDay) {
        groupedMatches.push({
          day: currentDay,
          matches: currentDayMatches
        });
        currentDayMatches = [];
        currentDay = matchDay;
      }
      currentDayMatches.push(match);
    });
    groupedMatches.push({
      day: currentDay,
      matches: currentDayMatches
    });
    return groupedMatches;
  },

  currentDay: function() {
    return Session.get('currentDay');
  }

});

/*****************************************************************************/
/* Matches: Lifecycle Hooks */
/*****************************************************************************/
Template.Matches.onCreated(function () {
});

Template.Matches.onRendered(function () {
  Session.set('menuItem', 'matches');

  // add page swiping functionality
  $('.pages-wrapper').dragend({
    pageClass: 'page',
  });

  // fix current date on top
  let currentH3 = null;
  $('.first-page').scroll(e => {
    $('.first-page h3').each((index, h3) => {
      const $h3 = $(h3);
      if ($h3.offset().top <= 60) {
        currentH3 = $h3;
      }
    });
    Session.set('currentDay', currentH3.html());
  });

});

Template.Matches.onDestroyed(function () {
});
