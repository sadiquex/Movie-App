// adding my api key to api destination
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b771f5d4d53ab4fbdbdafcb462a17175&page=1";
// method for getting movie image, in api docs
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=b771f5d4d53ab4fbdbdafcb462a17175&query='";

// getting ui elements
const form = document.getElementById("form");
const userTyped = document.getElementById("search");
const main = document.getElementById("main");

//   get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
  const movieTitle = document.getElementById("movie-title");

  // movieTitle.textContent = data.results[0].original_title;
}

// a function to show movies
function showMovies(movies) {
  // clear the page initially before showing searched movies
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    // create a div with the data
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
                <img src=${IMG_PATH + poster_path} alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(
                      vote_average
                    )}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
        
    `;
    main.appendChild(movieEl);
  });
}

// ratings with colours
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = userTyped.value;

  // check if what user type exists and its not empty
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    userTyped.value = "";
  } else {
    window.location.reload();
  }
});
