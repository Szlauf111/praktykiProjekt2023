const dodaj =()=> {
    const movies = [];
    
    // bierze inputy po id
    const title = document.getElementById("title");
    const opis = document.getElementById("opis");
    const data = document.getElementById("data");
    const gatunek = document.getElementById("gatunek");
    const actors = document.getElementById("actors");
  
    // zbiera values z inputow
    const value1 = title.value;
    const value2 = opis.value;
    const value3 = data.value;
    const value4 = gatunek.value;
    const value5 = actors.value;
    
    // dodaje stringi do tabeli
    movies.push(value1, value2, value3, value4, value5);
    
    wynik.innerHTML = alert(`
    Dodałeś film
    Tytuł: ${movies[0]}
    Opis: ${movies[1]}
    Data: ${movies[2]}
    Gatunek: ${movies[3]}
    Aktorzy: ${movies[4]}
    `);
    location.href = 'index.html';
  }

  function gotomain()
  {
      location.href="index.html";
  }