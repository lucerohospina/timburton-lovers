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
  axios.get('http://www.omdbapi.com/?t=' + searchText + '&apikey=3a181f1c')
    .then(function(response) {
      console.log(response);
      var movies = response;
      var output = '';
      $.each(movies, function(index, movie) {
        if (movie === response.data) {
          console.log(index + ':' + movie);
          output += `
        <div class="col-md-3">
        <div class="well text-center">
          <img src="${movie.Poster}">
          <h5>${movie.Title}</h5>
        </div>
      </div>
        `;
        }
      });
      $('#movies').html(output);
    }).catch(function(error) {
      console.log(error);
    }); 
}
