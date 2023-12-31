//let message: string = 'Hello world';

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
let Sort = 0; 

function getGenre(arrgenr)
{
  let arr = "";
  arrgenr.forEach((id) => {
    const genrefinder = genres.find((genre) => genre.id === id);
    if (genrefinder) {
      arr += genrefinder.name + " ";
    }
  });
  return arr;
}
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

getmovies(discover_url,Sort);
function getmovies(url,Sort)
{
fetch(url).then(res => res.json()).then(data => { //Bierze filmy z database'u w postaciu arraya
          if(Sort == 1)
          {
            const sortedarr = data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            showmovies(sortedarr);
          }
          else if(Sort == 2)
          {
            const sortedarr = data.results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
            showmovies(sortedarr);
          }
          else
          {
          showmovies(data.results); 
          }
    
})
}

function showmovies(data)
{
    main.innerHTML = '';
    data.forEach(movie =>{
    const {title, poster_path, vote_average, overview, id,release_date,vote_count,genre_ids} = movie;
    //console.log(data);
    const filmelement = document.createElement('div'); //Tworzenie elementow w HTMLu
    filmelement.classList.add('movie'); //dodaje cssa do nowego elementu.
    filmelement.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
    <div class="movieinfo">
        <${GetHeader(title)}>${title}   </${GetHeader(title)}>
        
        <span class="${getColor(vote_average)}">${Math.round(vote_average* 10)/10}</span>
       
    </div>

    <h6>Release Date: ${release_date}
    </h6>
    <div class="opis">

   Rating: ${Math.round(vote_average* 10)/10} | Vote Count: ${vote_count}<br>
    <br>
    ${shortenText(overview)}<br>
    <a href="https://www.themoviedb.org/movie/${id}">Check out TMDB</a><br>
    <h6>${getGenre(genre_ids)}</h6><br>
    <div class="Ratings">

    <button class="btn btn-warning"  onclick="AddRating(${id})">Submit</button>
    <input type="number" class="RatingInput" id="Rate${id}" min="0" max="10">
 
      </div>


    </div>
 
    
    `
//
    main.appendChild(filmelement); //Wysyla element filmelement do elementu main

}
)
};

function AddRating(id)
{
let rating = document.getElementById("Rate"+id).value;
if(rating <= 10 && rating > 0)
{
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDYyNDNlNThjNTFmYjNiZDg4MTQ3NzUwYTk1ZTlkOCIsInN1YiI6IjY1NjBmNmMxN2RmZGE2MDBhYzIyMjcxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.98b22oUvIVEwIC-WmPD6yZxF_1FncvAvf4P9tk0U1hw'
    },
    body: JSON.stringify({ value: rating })
  };

fetch("https://api.themoviedb.org/3/movie/"+id+"/rating", options)
.then(response => response.json())
.then(response => {console.log(response);alert("Wystawiono ocenę pomyślnie!")})
.catch(err => console.error(err));
}
else
{
  alert("Wprowadzona ocena nie jest poprawna. Proszę podać ocenę w zakresie od 1 do 10.")
}
}
form.addEventListener('submit', (e) => { //dodaje mozliwosc wyszukiwania filmow z calej bazy danych
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm){
      getmovies(searchURL+'&query='+searchTerm,Sort) //pobiera z inputa slowo klucz i wysyla to do api
  }else{
      getmovies(discover_url,Sort) //wraca do glownej strony z najpopularniejszymi filmami
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
  var selectedGenre = []
  setGenre();
function setGenre(){
    tagsEl.innerHTML='';
    genres.forEach(genre =>{ 
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;

        t.addEventListener('click', () =>{
          if(selectedGenre.lenght == 0){
              selectedGenre.push(genre.id);
          }
          else{
            if(selectedGenre.includes(genre.id)){
                selectedGenre.forEach((id, idx) => {
                    if(id == genre.id){
                      selectedGenre.splice(idx, 1);
                    }
                })
            }else{
                selectedGenre.push(genre.id);
            }
          }
          console.log(selectedGenre);
          getmovies( discover_url + '&with_genres=' + encodeURI(selectedGenre.join(',')))
          highlightSelection()
        })
        tagsEl.append(t);
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })

    if(selectedGenre.lenght !=0){
      selectedGenre.forEach(id => {
          const hightlightedTag = document.getElementById(id);
          hightlightedTag.classList.add('highlight');
      }
        )
    }
}
