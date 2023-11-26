// Jako pierwsze co powiem to to, że do Js'a używałem tutorialu od jakiegoś (chyba miłego) typa z potężnym indiańskim akcentem. Pozdrawiam sprawdzającego.

const API_KEY = 'api_key=c06243e58c51fb3bd88147750a95e9d8'; //Api klucz z tmdb
const base_url = 'https://api.themoviedb.org/3';
const discover_url = base_url+'/discover/movie?sort_by=popularity.desc&'+API_KEY; //Link do database'u z filmami
const searchURL = base_url+'/search/movie?'+API_KEY;

const main = document.getElementById('main'); // Tam gdzie wszystkie divy z filmami zostaną wysłane.

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
