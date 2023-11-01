

// Login usuario
const usuario = {
    email: "",
    senha: ""
};


function login() {
    usuario.email = document.getElementById("email").value
    usuario.senha = document.getElementById("senha").value


    localStorage.setItem("usuario", JSON.stringify(usuario))

    window.location.href = "index.html";
}


//novaa
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjI4MmYxYWYyOGQ2NmNhMjgzMDFhOGVkYjQ0OWEyMiIsInN1YiI6IjY0YWRkMzcyNmEzNDQ4MDBlYThlNGFhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fjl8RFIGGkyCuDYXgiELp2LOh0zOsRkOJ6876sA9NEU'
    }
  };
  
  const pegaRecomendados = async () => {
    const paginaAtual = document.getElementById("paginaAtual");
    const pagina = parseInt(paginaAtual.value) + 1;
    paginaAtual.value = pagina;
    const recomendados = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pagina}`, options);
    const response = await recomendados.json();
    console.log(options);
  
  
  
  
    filmesContainer.innerHTML = ''
    response.results.forEach(filme => {
  
      const titulo = filme.title;
      const poster = filme.poster_path;
      const movieId = filme.id;
      //const descricao = filme.overview;
      //const nota = filme.vote_average;
      //const lancamento = filme.release_date;
      //const back = filme.backdrop_path;
  
  
  
      filmesContainer.innerHTML += `<div onclick="pegaDetalhe(${movieId})" class="filme">
                <img class="poster-filme" src="https://image.tmdb.org/t/p/original/${poster}" alt="falhou">
                 <h4 class="filme-titulo">
                  ${titulo}
                </h4>
        
              </div>`
    })
  }
  
  
  fetch(`https://api.themoviedb.org/3/movie/popular`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  
  
  let filmesContainer = document.querySelector('.filmes')
  
  const pegaFilme = async () => {
    const filmes = await fetch("https://api.themoviedb.org/3/movie/popular");
    const response = await filmes.json();
    console.log(response.results)
    filmesContainer.innerHTML = ''
    response.results.forEach(filme => {
  
      const titulo = filme.title;
      const poster = filme.poster_path;
      const movieId = filme.id;
      //const descricao = filme.overview;
      //const nota = filme.vote_average;
      //const lancamento = filme.release_date;
      //const back = filme.backdrop_path;
  
  
  
      filmesContainer.innerHTML += `<div onclick="pegaDetalhe(${movieId})" class="filme">
                <img class="poster-filme" src="https://image.tmdb.org/t/p/original/${poster}" alt="falhou">
                 <h4 class="filme-titulo">
                  ${titulo}
                </h4>
        
              </div>`
    })
  }
  
  pegaFilme()
  
  
  const buscar = async () => {
    const palavra = document.getElementById("busca").value;
    const filmes = await fetch("https://api.themoviedb.org/3/movie/popular");
    const response = await filmes.json();
    console.log(response.results)
    console.log(palavra)
    filmesContainer.innerHTML = ''
    response.results.forEach(filme => {
  
  
      const titulo = filme.title;
      const tituloBusca = titulo.toLowerCase();
      const poster = filme.poster_path;
      const movieId = filme.id;
      //const descricao = filme.overview;
      //const nota = filme.vote_average;
      //const lancamento = filme.release_date;
      //const back = filme.backdrop_path;
  
      if (tituloBusca.indexOf(palavra.toLowerCase()) >= 0) {
        console.log(titulo)
        filmesContainer.innerHTML += `<div onclick="pegaDetalhe(${movieId})" class="filme">
                <img class="poster-filme" src="https://image.tmdb.org/t/p/original/${poster}" alt="falhou">
                 <h4 class="filme-titulo">
                  ${titulo}
                </h4>
              </div>`
      }
  
  
    })
  }
  
  const pegaDetalhe = async (movieId) => {
  
    const detalhes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`, options);
    const response = await detalhes.json();
    console.log(response);
    let div_detalhes = document.querySelector('.detalhes');
    console.log(div_detalhes)
  
  
    const overview = response.overview;
    const nota = response.vote_average;
    const lancamento = response.tagline;
  
  
  
    div_detalhes.innerHTML =
      `<div class="detalhes_container">
        <p>${overview}</p>
        <h4>${nota}</h4>
        <h4>${lancamento}</h4>
      </div>`
  
  }


