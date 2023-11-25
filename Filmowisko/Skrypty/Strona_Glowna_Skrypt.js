// Jako pierwsze co powiem to to, że do Js'a używałem tutorialu od jakiegoś (chyba miłego) typa z potężnym indiańskim akcentem. Pozdrawiam sprawdzającego.

const API_KEY = 'api_key=c06243e58c51fb3bd88147750a95e9d8'; //Api klucz z tmdb
const base_url = 'https://api.themoviedb.org/3';
const discover_url = base_url+'/discover/movie?sort_by=popularity.desc&'+API_KEY; //Link do database'u z filmami

const main = document.getElementById('main'); // Tam gdzie wszystkie divy z filmami zostaną wysłane.

getmovies(discover_url);
function getmovies(url)
{
fetch(url).then(res => res.json()).then(data => { //Bierze filmy z database'u w postaciu arraya
    showmovies(data.results); //odrazu laduje arraya z wynikiem do funkcji
})
}
function showmovies(data)
{
    main.innerHTML = '';
data.forEach(movie =>{ //(przed tem niewiedzialem co to, ale) za kazde miejsce w arrayu, powtarza sie ten kod, odrazu jest strzalkowa z movie:
    const {title, poster_path, vote_average, overview} = movie;
    const movieEl = document.createElement('div'); //Tworzenie elementow w HTMLu
    movieEl.classList.add('movie'); //dodaje cssa do nowego elementu.
    movieEl.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
    <div class="movieinfo">
        <h3>${title}   </h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
    ${overview}
    </div>
    `

    main.appendChild(movieEl); //Wysyla element MovieEl do elementu main

}
)
}
function getColor(vote) //self explanatory
{
    if(vote >= 3)
    {
         return 'green'// nie ma srednika (jestem gangsterem)
    }
    else
    {
        return 'red' 
    }
}