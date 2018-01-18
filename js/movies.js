$(document).ready(function() {
  $('#searchForm').on('click', function(event) {
    console.log($('#searchText').val());
    var searchText = $('#searchText').val();
    getMovies(searchText);
    event.preventDefault();
  });
});

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
          <button type="button" class="white close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">${movie.Title}</h4>
        </div>
        <div class="modal-body text-center">
          <img class="img-responsive" src="${movie.Poster}">
        </div>
        <div class="modal-footer">
          <p class="modal-p">${movie.Year}
        </div>
        `;
        }
      });
      $('.modal-content').html(output);
    }).catch(function(error) {
      console.log(error);
    }); 
}
