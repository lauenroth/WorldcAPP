/**
 * add a page swiping functionality where the content of each page remains scrollable
 */
(function($, Dragend) {

  $.fn.pageSwiper = function(options) {

    var numPages;
    var currentPage;
    var pageTitles = [];

    return this.each(function() {
      var $pagesWrapper = $(this);
      var pageSwitcher = $('<ul class="page-switcher"></ul>');
      numPages = $pagesWrapper.find('.page').each((index, page) => {
        pageSwitcher.append('<li' + (index === 0 ? ' class="active"' : '') + '>' + $(page).data('title') + '</li>');
        pageTitles.push($(page).data('title'));
      }).length;
      $pagesWrapper.before(pageSwitcher).dragend({
        pageClass: 'page',
        onDrag: function(element, parsedEvent, overscroll, event) {
          if (!overscroll) {
            // console.log(parsedEvent.distanceX);
          }
        },
        onSwipeEnd: function(container, element, page) {
          $('.page-switcher .active').removeClass('active');
          $($('.page-switcher li').get(page)).addClass('active');
        },
      });
    });

  };

}(jQuery, Dragend));
