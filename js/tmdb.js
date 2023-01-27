const list = document.querySelector(".list");
const btnNxt = document.querySelector(".btn-nxt");
const btnPre = document.querySelector(".btn-pre");
let page = 1;
let pageMax = 10;
run();
function run() {
  const myfetch = fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=681dcfe9022632de9dd7155ff91fb5d9&language=ko-KR&page=${page}`
  );

  myfetch
    .then(function (res) {
      console.log(res);
      const json = res.json();
      json.then(function (result) {
        console.log(result);
        console.log("Wah");
        let li = result.results;
        li.forEach((ele) => {
          // console.log(ele);
          list.innerHTML += `<li class="item">
    <img src="https://image.tmdb.org/t/p/w220_and_h330_face${ele.poster_path}" class="portrait">
    <p class="text">

      <span class="title">${ele.title} 
        <span class="title-org">(${ele.original_title})</span>
        
        </span>
        <span class="voteAvg">${ele.vote_average}
        </span>

    <span class="release">${ele.release_date}
    <span class="genre">${ele.genre_ids}</span></span>
    <span class="overview">${ele.overview}</span>
    </p>
    </li>`;
        });
      });
      pageMax = result.total_pages;
    })
    .catch(function (error) {
      console.log("error");
    })
    .finally(function () {
      console.log("fin");
    });
}

btnPre.addEventListener("click", function () {
  if (page > 0) {
    page--;
    run();
  }
});

btnNxt.addEventListener("click", function () {
  if (page < pageMax) {
    page++;
    run();
  }
});
