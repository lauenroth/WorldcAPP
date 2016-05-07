Template.Chat.addChat = function(text, me) {
  const newText = $('<div class="bubble' + (me?' me':'') + '">' +
    '<div class="time">10:15</div>' +
    '<strong>' + (me?'Lionel':'Adele') + '</strong>' +
    '<div>' + text + '</div>' +
  '</div>');
  $('.conversation').append(newText);
  $('.chat').animate({
    scrollTop: document.body.scrollHeight
  }, 400);
};

/*****************************************************************************/
/* Chat: Event Handlers */
/*****************************************************************************/
Template.Chat.events({
  'submit form': function(e) {
    e.preventDefault();
    const $input = $('#chat-text');
    const text = $input.val();
    $input.val('');
    Template.Chat.addChat(text, true);
  }
});

/*****************************************************************************/
/* Chat: Helpers */
/*****************************************************************************/
Template.Chat.helpers({
});

/*****************************************************************************/
/* Chat: Lifecycle Hooks */
/*****************************************************************************/
Template.Chat.onCreated(function () {
});

Template.Chat.onRendered(function () {
  Session.set('menuItem', 'chat');
});

Template.Chat.onDestroyed(function () {
});
