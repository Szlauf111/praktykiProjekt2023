// Jako pierwsze co powiem to to, że do Js'a używałem tutorialu od jakiegoś (chyba miłego) typa z potężnym indiańskim akcentem. Pozdrawiam sprawdzającego.

const API_KEY = 'api_key=c06243e58c51fb3bd88147750a95e9d8'; //Api klucz z tmdb
const base_url = 'https://api.themoviedb.org/3';
const discover_url = base_url+'/discover/movie?sort_by=popularity.desc&'+API_KEY; //Link do database'u z filmami
const searchURL = base_url+'/search/movie?'+API_KEY;

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

const main = document.getElementById('main'); // Tam gdzie wszystkie divy z filmami zostaną wysłane.
const tagsEl = document.getElementById('tags'); 

getmovies(discover_url);

function getmovies(url)
{
fetch(url).then(res => res.json()).then(data => { //Bierze filmy z database'u w postaciu arraya
    showmovies(data.results,"stronaglowna"); //odrazu laduje arraya z wynikiem do funkcji
})
}

function showmovies(data,source)
{
    main.innerHTML = '';
data.forEach(movie =>{ //(przed tem niewiedzialem co to, ale) za kazde miejsce w arrayu, powtarza sie ten kod, odrazu jest strzalkowa z movie:
    const {title, poster_path, vote_average, overview, id,release_date,vote_count} = movie;
    //console.log(data);
    const movieEl = document.createElement('div'); //Tworzenie elementow w HTMLu
    movieEl.classList.add('movie'); //dodaje cssa do nowego elementu.
    movieEl.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
    <div class="movieinfo">
        <${GetHeader(title)}>${title}   </${GetHeader(title)}>
        <span class="${getColor(vote_average)}">${Math.round(vote_average* 10)/10}</span>
       
    </div>
    <h6>Release Date: ${release_date}</h6>
 
    <div class="overview">
    <h4>${title}   </h4>
   Rating: ${Math.round(vote_average* 10)/10} | Vote Count: ${vote_count}<br>
    <br>
    ${shortenText(overview)}<br>
    <a href="https://www.themoviedb.org/movie/${id}">Zobacz na TMDB</a>
    </div>

    `

    main.appendChild(movieEl); //Wysyla element MovieEl do elementu main

}
)
};

function getColor(vote) //self explanatory
{
    if(vote >= 7)
    {
         return 'green'// nie ma srednika (jestem gangsterem)
    }
    else if(vote >= 4)
    {
        return 'orange';
    }
    else
    {
        return 'red' 
    }
}

form.addEventListener('submit', (e) => { //dodaje mozliwosc wyszukiwania filmow z calej bazy danych
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getmovies(searchURL+'&query='+searchTerm) //pobiera z inputa slowo klucz i wysyla to do api
    }else{
        getmovies(discover_url) //wraca do glownej strony z najpopularniejszymi filmami
    }
});

function reloadsite()
{
location.reload();
}
function shortenText(text) {
    
    if (text.length > 200) {
      const shortenedText = text.slice(0, 200 - 3) + '...';
      return shortenedText;
    }
    return text;
  }
  function GetHeader(title)
  {
    if(title.length > 25)
    {
        return "h5";
    }
    else
    {
        return "h4";
    }
  }

  setGenre();
function setGenre(){
    tagsEl.innerHTML='';
    genres.forEach(genre =>{ 
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () =>{
        })
        tagsEl.append(t);
    })
}
