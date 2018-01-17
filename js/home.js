$(document).ready(function() {

    var curPage = 1;
    var numOfPages = $(".skw-page").length;
    var animTime = 1000;
    var scrolling = false;
    var pgPrefix = ".skw-page-";
  
    function pagination() {
      scrolling = true;
  
      $(pgPrefix + curPage).removeClass("inactive").addClass("active");
      $(pgPrefix + (curPage - 1)).addClass("inactive");
      $(pgPrefix + (curPage + 1)).removeClass("active");
  
      setTimeout(function() {
        scrolling = false;
      }, animTime);
    };
  
    function navigateUp() {
      if (curPage === 1) return;
      curPage--;
      pagination();
    };
  
    function navigateDown() {
      if (curPage === numOfPages) return;
      curPage++;
      pagination();
    };
  
    $(document).on("mousewheel DOMMouseScroll", function(e) {
      if (scrolling) return;
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        navigateUp();
      } else { 
        navigateDown();
      }
    });
  
    $(document).on("keydown", function(e) {
      if (scrolling) return;
      if (e.which === 38) {
        navigateUp();
      } else if (e.which === 40) {
        navigateDown();
      }
    });

    jQuery(function($) {

  var html = $('html');
  var viewport = $(window);
  var viewportHeight = viewport.height();

  var scrollMenu = $('#section-menu');
  var timeout = null;

  function menuFreeze() {
    if (timeout !== null) {
      scrollMenu.removeClass('freeze');
      clearTimeout(timeout);
    }

    timeout = setTimeout(function() {
      scrollMenu.addClass('freeze');
    }, 2000);
  }
  scrollMenu.mouseover(menuFreeze);

  /* ==========================================================================
     Build the Scroll Menu based on Sections .scroll-item
     ========================================================================== */

  var sectionsHeight = {},
    viewportheight, i = 0;
  var scrollItem = $('.scroll-item');
  var bannerHeight;

  function sectionListen() {
    viewportHeight = viewport.height();
    bannerHeight = (viewportHeight);
    $('.section').addClass('resize');
    scrollItem.each(function() {
      sectionsHeight[this.title] = $(this).offset().top;
    });
  }
  sectionListen();
  viewport.resize(sectionListen);
  viewport.bind('orientationchange', function() {
    sectionListen();
  });

  var count = 0;

  scrollItem.each(function() {
    var anchor = $(this).attr('id');
    var title = $(this).attr('title');
    count++;
    $('#section-menu ul').append('<li><a id="nav_' + title + '" href="#' + anchor + '"><span>' + '<i class="fa fa-arrow-left" aria-hidden="true"></i>' + '</span> ' + title + '</a></li>');
  });

  function menuListen() {
    var pos = $(this).scrollTop();
    pos = pos + viewportHeight * 0.625;
    for (i in sectionsHeight) {
      if (sectionsHeight[i] < pos) {
        $('#section-menu a').removeClass('active');
        $('#section-menu a#nav_' + i).addClass('active');;
        var newHash = '#' + $('.scroll-item[title="' + i + '"]').attr('id');
        if (history.pushState) {
          history.pushState(null, null, newHash);
        } else {
          location.hash = newHash;
        }
      } else {
        $('#section-menu a#nav_' + i).removeClass('active');
        if (pos < viewportHeight - 72) {
          history.pushState(null, null, ' ');
        }
      }
    }
  }
  scrollMenu.css('margin-top', scrollMenu.height() / 2 * -1);

  /* ==========================================================================
     Smooth Scroll for Anchor Links and URL refresh
     ========================================================================== */

  scrollMenu.find('a').click(function() {
    var href = $.attr(this, 'href');
    $('html').animate({
      scrollTop: $(href).offset().top
    }, 500, function() {
      window.location.hash = href;
    });
    return false;
  });

  /* ==========================================================================
     Fire functions on Scroll Event
     ========================================================================== */

  function scrollHandler() {
    menuListen();
    menuFreeze();
  }
  scrollHandler();
  viewport.on('scroll', function() {
    scrollHandler();
    //      window.requestAnimationFrame(scrollHandler);
  });
});
  
  });