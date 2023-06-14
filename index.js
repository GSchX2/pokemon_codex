import createPokemonCard from "./createPokemonCard.js";

const pokemonDivRow = document.querySelector(".row");
const btnLoad = document.querySelector(".btn");

// Keep track of the loaded cards cards
let pokemonsLoaded = 5;
// Limit the numbers of cards created on the load of the page and on the load button
const loadPokemons = 5;
// Limit the total of card that can be created
const pokemonsTotal = 151; 

// Load the cards on the load of the page
// Make sure each card has a different pokemon on it
const pokemonsLoop = async () => {
    for (let i = 1; i <= loadPokemons; i++) {
        await getPokemon(i);
    }
}

// Activated by the load button
// Load cards up to pokemonsTotal
// Make sure each card has a different pokemon on it
const newPokemonsLoop = async () => {
    for(let j = 1; j <= loadPokemons; j++){
        pokemonsLoaded++;
        if (pokemonsLoaded > pokemonsTotal){
            btnLoad.classList.add("hidden");
            break;
        }
        await getPokemon(pokemonsLoaded);
    }     
}

// Get pokemon data from the API
// Uses the id of the pokemon the find the data on the API
// The async function is needed to keep the display order of the cards by pokemon's id 
const getPokemon = async id => {
    const pokemon_url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response_pokemon = await fetch(pokemon_url);
    const pokemon = await response_pokemon.json();
    const category_url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    const response_category = await fetch(category_url);
    const category = await response_category.json();

    // Call the function to create the pokemon card
    // Pass the data taken from the API
    // Append the card element as a child of a parent that belongs to the html page
    // Now the card belongs to the html page and is displayed.
    pokemonDivRow.appendChild(createPokemonCard(pokemon, category));
}

// Load cards on the load of the page
pokemonsLoop();

// Load the cards througth a button
btnLoad.addEventListener("click", () => {
    newPokemonsLoop();
})

