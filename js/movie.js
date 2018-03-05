
function getMovie(id){
  return MOVIES.find(
    (element) => element.id==id
  );
}

function selectMovie(id){
  save(getMovie(id), SELECTED_MOVIE_SAVE_ID);
}

function loadMovies(){
  catalogo=$("#catalog");
  MOVIES.forEach(
    (movie)=>catalogo.append(renderMovie(movie))
  );
}


function renderMovie(data){
  let synopsis='';
  if(data.synopsis.length>90){
    synopsis=data.synopsis.substring(0,90) + '...'
  }else{
    synopsis=data.synopsis;
  }
  const movie=`
    <div class="col s12 m7">
      <div class="card horizontal">
        <div class="card-image">
          <img class="movie-image" src="${data.imgUrl}">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <h4>${data.title}</h4>
            <p>${data.synopsis.substring(0,80)}...</p>
          </div>
          <div class="card-action">
            <a href="./buy.html" onclick="selectMovie(${data.id})">Comprar Entradas</a>
          </div>
        </div>
      </div>
    </div>
  `;
  return movie;
}

$(function(){
  loadMovies();
})