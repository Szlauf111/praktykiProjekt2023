const API_KEY = 'api_key=c06243e58c51fb3bd88147750a95e9d8'; //Api klucz z tmdb
const base_url = 'https://api.themoviedb.org/3';

const aktorzy = document.getElementById('aktorzy');
const movies = document.getElementById('filmy');


ZnajdzStatystyki("https://api.themoviedb.org/3/person/popular?api_key=c06243e58c51fb3bd88147750a95e9d8","actor");
ZnajdzStatystyki("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c06243e58c51fb3bd88147750a95e9d8","movie");
function ZnajdzStatystyki(url,type)
{
    fetch(url).then(res => res.json()).then(data => { 
        var actors = data.results;
        const sortarr = (actors) = actors.sort((a, b) => b.popularity - a.popularity);
        const slicearr = sortarr.slice(0,5);
        
    generujstaty(slicearr,type);
})
}
function generujstaty(data,type)
{
    var Miejsce = 1;
    if(type == "actor")
    {
    data.forEach(aktor =>{ 
        const {name} = aktor;
        const aktorEl = document.createElement('div'); //Tworzenie elementow w HTMLu
        aktorEl.classList.add('aktorcell');
        aktorEl.innerHTML = `
        <br>
        <p class="StatHeader">${Miejsce}: ${name}</p><img src="">
        
        `
    aktorzy.appendChild(aktorEl);
    
    Miejsce++;
    }
    )
}
else if(type=="movie")
{
    data.forEach(movie =>{
        const {title} = movie;
        const filmel = document.createElement('div'); //Tworzenie elementow w HTMLu
        filmel.classList.add('aktorcell');
        filmel.innerHTML = `
        <br>
        <p class="StatHeader">${Miejsce}: ${title}</p><img src="">
        
        `
    movies.appendChild(filmel);
    
    Miejsce++;
    }
    )
}
    };
    function gotomain()
{
    location.href="../index.html";
}