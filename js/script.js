//DOM
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

//Varivael para colocar a tela travado e contagem de botão
let searchPokemon = 1;

//Pegar informações do API dos Pokemons e colocar a pesquisa em minusculo
const fetcPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}


//Renderizaçào do nome, gif e limpar formulario
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetcPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block'; // colocar pokemon na tela
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none'; //tirar pokemon da tela ao nao encontrar
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

// Formulario de Busca Pokemon
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon)



