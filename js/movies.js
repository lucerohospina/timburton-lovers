$(document).ready(function() {
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
          if (movie === response.data) {
            console.log(index + ':' + movie);
            output += `
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">${movie.Title}</h4>
          </div>
          <div class="modal-body text-center">
            <img class="img-responsive" src="${movie.Poster}">
          </div>
          <div class="modal-footer">
            <p>${movie.Year}
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">${movie.Title}</h4>
          </div>
          <div class="modal-body text-center">
            <img src="${movie.Poster}">
          </div>
          <div class="modal-footer">
            <p>${movie.Year}
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


