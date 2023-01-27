const list = document.querySelector(".list");
const movieDetail = document.querySelector(".movie-detail");
const btnNxt = document.querySelector(".btn-nxt");
const btnPre = document.querySelector(".btn-pre");
let page = 1;
let pageMax = 10;
const searchBar = document.querySelector(".search-txt");
const searchBtn = document.querySelector(".search-btn");
searchOrNot();

function searchOrNot(search = null) {
  list.innerHTML = "";
  if (search == null) {
    const myfetch = fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=681dcfe9022632de9dd7155ff91fb5d9&language=ko-KR&page=${page}`
    );
    myfetch
      .then(function (res) {
        console.log(res);
        return res.json();
      })
      .then(function (result) {
        console.log(result);
        buildItem(result);
      })
      .catch(function (error) {
        console.log("error");
      })
      .finally(function () {
        console.log("fin");
      });
  } else {
    const myfetch = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=681dcfe9022632de9dd7155ff91fb5d9&language=ko-KR&page=1&include_adult=false&query=${search}`
    );
    myfetch
      .then(function (res) {
        console.log(res);
        return res.json();
      })
      .then(function (result) {
        console.log(result);
        buildItem(result);
      })
      .catch(function (error) {
        console.log("error");
      })
      .finally(function () {
        console.log("fin");
      });
  }
}

function buildItem(json) {
  if (json.results.length == 0) {
    list.innerHTML = `<li><h2>OOPS!! ${searchBar.value}에 대한 검색 결과가 없습니다</h2></li>`;
  } else {
    const li = json.results;
    console.log(li);
    li.forEach((ele) => {
      // console.log(ele);
      list.innerHTML += `<li class="item" data-id="${ele.id}">
      <img src="https://image.tmdb.org/t/p/w220_and_h330_face${ele.poster_path}" class="portrait">
      <div class="text">
  
        <span class="title">${ele.title} 
          <span class="title-org">(${ele.original_title})</span>
          
          </span>
          <span class="voteAvg">${ele.vote_average}
          </span>
  
      <span class="release">${ele.release_date}
      <span class="genre">${ele.genre_ids}</span></span>
      <span class="overview">${ele.overview}</span>
      </div>
      </li>`;
    });

    gsap.from(".list li", {
      duration: 1,
      scale: 0.1,
      y: 40,
      ease: "power1.inOut",
      stagger: {
        each: 0.1,
        from: "top",
        grid: "auto",
        ease: "power2.inOut",
      },
    });
    detailAdd();
  }

  pageMax = result.total_pages;
}
function detailAdd() {
  const btnAddEvent = document.querySelectorAll(".list li");
  btnAddEvent.forEach((ele, idx) => {
    ele.addEventListener("click", function () {
      console.log(ele.dataset.id);
      const movID = ele.dataset.id;
      const movFetch = fetch(
        `https://api.themoviedb.org/3/movie/${movID}?api_key=681dcfe9022632de9dd7155ff91fb5d9&language=ko-KR`
      );
      movFetch
        .then(function (res) {
          console.log("상세정보 보기");
          return res.json();
        })
        .then(function (result) {
          console.log(result);
          movieDetail.classList.add("on");
          movieDetail.innerHTML = `
                  <div class="img-box">
                    <img src="https://image.tmdb.org/t/p/original${result.backdrop_path}" alt="" />
                  </div>
                  <div class="contents-box">
                    <h2 class="title">${result.title}</h2>
                    <p class="titleSub">${result.original_title}</p>
                    <p>genre</p>
                    <p>홈페이지 : <a href="${result.homepage}" target="_blank">${result.homepage}</a></p>
                    <p>출시일 : ${result.release_date}</p>
                    <p>인기도 : ${result.popularity}</p>
                    <p>상영 시간 : ${result.runtime}</p>
                    <p>상세 설명 : ${result.overview}</p>
                  </div>
                `;
          let btnClose = document.createElement("button");
          btnClose.addEventListener("click", function () {
            movieDetail.classList.remove("on");
          });
          btnClose.innerHTML = "닫기";
          movieDetail.appendChild(btnClose);
        });
    });
  });
}

btnPre.addEventListener("click", function () {
  if (page > 0) {
    page--;
    searchOrNot();
  }
});

btnNxt.addEventListener("click", function () {
  if (page < pageMax) {
    page++;
    run();
  }
});

searchBtn.addEventListener("click", function (a) {
  const searchTxt = searchBar.value;
  if (searchTxt.length > 0) {
    searchOrNot(searchBar.value);
  } else {
    searchOrNot();
  }
});
