$(document).ready(function() {
  // ocultamos estas secciones para mostrar solo vista splash
  $('#time-lapse').hide();
  $('#home-slider').hide();
  $('#home-navigator').hide();
  /* vista splash redirecciona a la vista home */
  setTimeout(function() {
    // mostramos secciones al final de la vista splash 
    $('#splah-view').hide();
    $('#time-lapse').show();
    $('#home-slider').show();
    $('#home-navigator').show();
  }, 9500);
 
  // funcionalidades de la seccion linea de tiempo y home navigator
  var curPage = 1;
  var numOfPages = $('.skw-page').length;
  var animTime = 1000;
  var scrolling = false;
  var pgPrefix = '.skw-page-';

  function pagination() {
    scrolling = true;

    $(pgPrefix + curPage).removeClass('inactive').addClass('active');
    $(pgPrefix + (curPage - 1)).addClass('inactive');
    $(pgPrefix + (curPage + 1)).removeClass('active');

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

  $(document).on('mousewheel DOMMouseScroll', function(e) {
    if (scrolling) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  $(document).on('keydown', function(e) {
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
      $('#section-menu ul').append('<li><a id="nav_' + count + '" href="#' + anchor + '"><span>' + '<i class="fa fa-arrow-left" aria-hidden="true"></i>' + '</span> ' + count + '</a></li>');
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

  // Inicio de funcionalidades con el API
  $('#searchForm').on('click', function(event) {
    console.log($('#searchText').val());
    var searchText = $('#searchText').val();
    getMovies(searchText);
    event.preventDefault();
  });

  // Evento del input search con modal
  function getMovies(searchText) {
    console.log(searchText);
    axios.get('https://www.omdbapi.com/?t=' + searchText + '&apikey=3a181f1c')
      .then(function(response) {
        console.log(response);
        var movies = response;
        var output = '';
        $.each(movies, function(index, movie) {
          if (movie === response.data && movie.Director === 'Tim Burton') {
            console.log(index + ':' + movie);
            output += `
            <div class="modal-header">
            <button type="button" class="white close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">${movie.Title}</h4>
          </div>
          <div class="modal-body">
          <div class="row">
          <img class="col-xs-12 col-sm-6" src="${movie.Poster}">
          <div class="col-xs-12 col-sm-6">
            <p class="mod-subtitle">Actores Pincipales: <span class="mod-info">${movie.Actors}</span></p>
            <p class="mod-subtitle">Género: <span class="mod-info">${movie.Genre}</span></p>
            <p class="mod-subtitle">Director: <span class="mod-info">${movie.Director}</span></p>
            <p class="mod-subtitle">Trama: <span class="mod-info">${movie.Plot}</span></p>
            <p class="mod-subtitle">Fecha de estreno: <span class="mod-info">${movie.Releases}</span></p>
            <p class="mod-subtitle">Duración: <span class="mod-info">${movie.Runtime}</span></p>
          </div>
        </div>
          </div>
          <div class="modal-footer">
          <p class="modal-p"><a class="floral" href="${movie.Website}" target="_blank">Web Oficial de la pelicula</a></p>
          </div>
          `;
          } else if (movie === response.data && movie.Director !== 'Tim Burton') {
            output += `
            <div class="modal-header">
            <button type="button" class="white close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <div class="modal-body text-center">
            <img class="img-responsive" src="assets/images/esh.gif">
          </div>
          <div class="modal-footer">
          <p class="modal-p chartreuse">Aquí somos Tim Burton Lovers! <span class="glyphicon glyphicon-heart" aria-hidden="true"></span></p>
          </div>
          `;
          }
        });
        $('.modal-content').html(output);
      }).catch(function(error) {
        console.log(error);
      }); 
  }
  
  // evento click a los titulos de las peliculas
  $('.open-movie-modal').on('click', movieModal);
  
  // funcion para el evento click de los titulos delas peliculas con modal
  function movieModal(event) {
    console.log(event.target);
    var anchorElement = event.target;
  
    console.log(anchorElement.dataset['title']);
    var movieTitle = anchorElement.dataset['title'];
  
    axios.get('http://www.omdbapi.com/?t=' + movieTitle + '&apikey=3a181f1c')
      .then(function(response) {
        console.log(response);
        var movies = response;
        var output = '';
        $.each(movies, function(index, movie) {
          if (movie === response.data) {
            console.log(index + ':' + movie);
            output += `
            <div class="modal-header">
            <button type="button" class="white close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">${movie.Title}</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <img class="col-xs-12 col-sm-6" src="${movie.Poster}">
              <div class="col-xs-12 col-sm-6">
                <p class="mod-subtitle">Actores Pincipales: <span class="mod-info">${movie.Actors}</span></p>
                <p class="mod-subtitle">Género: <span class="mod-info">${movie.Genre}</span></p>
                <p class="mod-subtitle">Director: <span class="mod-info">${movie.Director}</span></p>
                <p class="mod-subtitle">Trama: <span class="mod-info">${movie.Plot}</span></p>
                <p class="mod-subtitle">Fecha de estreno: <span class="mod-info">${movie.Releases}</span></p>
                <p class="mod-subtitle">Duración: <span class="mod-info">${movie.Runtime}</span></p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
<<<<<<< HEAD
            <p class="modal-p"><a href="${movie.Website}" target="_blank">Web Oficial de la pelicula</a></p>
=======
          <p class="modal-p"><a class="floral" href="${movie.Website}" target="_blank">Web Oficial de la pelicula</a></p>
>>>>>>> upstream/master
          </div>
          `;
          }
        });
        $('.modal-content').html(output);
      }).catch(function(error) {
        console.log(error);
      });
  }
});