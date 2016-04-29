/**
 * add a page swiping functionality where the content of each page remains scrollable
 * depends on Hammer.js and lowdash
 */
(function($, Hammer, _) {
  $.fn.pageSwiper = function(options) {

    // Extend default options with those provided.
    var opts = $.extend( {}, $.fn.pageSwiper.defaults, options );

    var isPageScrolling = [];
    var pages = [];

    return this.each(function() {
      var $pageWrapper = $(this);
      pages = $pageWrapper.find(opts.pageClass);
      pages.each(function(index, page) {
        var $page = $(page);
        addPageScrollingListener($page, index);
        addPageSwipe($pageWrapper, $page, index);
      });
    });

    // add swipe functionality to a page
    function addPageSwipe($pageWrapper, $page, index) {
      var startX = false;
      var pageHammer = new Hammer($page[0]);
      var pageWidth = parseInt($page.css('width'));
      pageHammer.on('pan', function(e) {
        if (!isPageScrolling[index]) {
          if (!startX) {
            startX = e.deltaX;
          } else {
            var left = e.deltaX - startX - (index * pageWidth);

            if (left > 0) left = 0;
            else if (left < (pages.length - 1) * pageWidth * -1) left = (pages.length - 1) * pageWidth * -1;

            $pageWrapper.css('left', left);
            if (e.isFinal) {
              var pageIndex = index;
              if (-1 * index * pageWidth - 0.2 * pageWidth > left) pageIndex++;
              else if (-1 * index * pageWidth + 0.2 * pageWidth < left) pageIndex--;
              $pageWrapper.animate({
                left: pageIndex * -1 * pageWidth
              }, 300);
              startX = false;
            }
          }
        }
      });
    }

    // indicate whether the user is scrolling vertically on a page
    function addPageScrollingListener($page, index) {
      $page
        .scroll(_.debounce(function(e) {
          isPageScrolling[index] = true;
        }, 150, { 'leading': true, 'trailing': false }))
        .scroll(_.debounce(function(e) {
          isPageScrolling[index] = false;
        }, 150));
    }
  };

  // default settings
  $.fn.pageSwiper.defaults = {
    pageClass: '.page',
  };

}(jQuery, Hammer, _));
