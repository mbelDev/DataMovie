const searchBar = document.querySelector(".search-txt");
const searchBtn = document.querySelector(".search-btn");

function searchRun() {
  const searchTxt = searchBar.value;
  const myfetch = fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=681dcfe9022632de9dd7155ff91fb5d9&language=ko-KR&page=1&include_adult=false&query=${searchTxt}`
  );
  myfetch.then(function (res) {
    console.assert(res);
    const json = res.json();
    json
      .then(function (result) {
        console.log("검색");
      })
      .catch(function (err) {
        console.log("에러");
      });
  });
}
