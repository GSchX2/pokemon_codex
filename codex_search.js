import createPokemonCard from "./createPokemonCard.js";

const pokemonDivRow = document.querySelector(".row");
const btnSearch = document.querySelector(".btn");

// Store the input given by the user
const inputSearch = document.querySelector(".input");

// Get the pokemon data from the API
// Uses the pokemon name to find the data on the API
const getPokemon = async pokemonName => {
    const pokemon_url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response_pokemon = await fetch(pokemon_url);

    // Checking if the user input is indeed a pokemon
    // If the input is not a pokemon name a "Not Found" message will popup
    if (response_pokemon.status === 404 || response_pokemon.statusText === "Not Found") {
        const seachDiv = document.querySelector(".search")
        
        const errorMsg = document.createElement("div");
        errorMsg.classList.add("card-box", "alert", "alert-danger", "alert-dismissible", "fade", "show", "mx-auto", "mb-0", "mt-1");
        errorMsg.setAttribute("role", "alert");
        
        const closeErrorMsg = document.createElement("button");
        closeErrorMsg.classList.add("btn-close");
        closeErrorMsg.setAttribute("type", "button");
        closeErrorMsg.setAttribute("data-bs-dismiss", "alert");
        
        errorMsg.innerHTML = "Pokémon Not Found";

        seachDiv.appendChild(errorMsg);
        errorMsg.appendChild(closeErrorMsg);

        return
    }

    const pokemon = await response_pokemon.json();
    const category_url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
    const response_category = await fetch(category_url);
    const category = await response_category.json();

    // Call the function to create the pokemon card
    // Pass the data taken from the API
    const searchCard = createPokemonCard(pokemon, category);
    searchCard.classList.add("mx-auto");
    searchCard.classList.add("mt-4");

    // Append the card element as a child of a parent that belongs to the html page
    // Now the card belongs to the html page and is displayed
    pokemonDivRow.appendChild(searchCard);
};

btnSearch.addEventListener("click", () => {
    // Make sure a name was typed by the user
    if (inputSearch.value !== "") {
        getPokemon(inputSearch.value.toLowerCase());
    
    // In case nothing is typed a "Missing Pokémon" message will popup
    } else {
        const errorMsg = document.querySelector(".searchError");

        errorMsg.innerHTML = `
        <div class="card-box alert alert-danger alert-dismissible fade show mx-auto mb-0 mt-1" role="alert">
            Missing Pokémon.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        `;
    }
})
