import createPokemonCard from "./createPokemonCard.js";

const pokemonDivRow = document.querySelector(".row")
const btnNewGuess = document.querySelector(".btnNewGuess");

// Limit the total of card that can be created
const pokemonsTotal = 151; 

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

    // Call the function to create the pokemon guess card
    // Pass the data taken from the API
    createGuess(pokemon, category);
}

// Generate a guess on the load of the page
generateGuess();

// This button generate a new guess and clean the page from the last guess by reloding the page
btnNewGuess.addEventListener("click", () => {
    location.reload();
})

// Choose randomly a number that will be passed as an id to the getPokemon function
function generateGuess () {
    let x = Math.floor((Math.random() * pokemonsTotal) + 1);
    getPokemon(x);
}

// Create the pokemon guess card using the data from the API
function createGuess(pokemon, category) {

    // Formating the data taken from API    
    const name = pokemon.name;
    const id = pokemon.id.toString().padStart(3,'0');
    const weight = pokemon.weight / 10;
    const height = pokemon.height / 10;

    const ability_1 = pokemon.abilities[0].ability.name.toUpperCase();
    const ability_2 = checkAbilityFunction();
    const ability = abilityFunction(ability_1, ability_2);
    
    const type_1 = pokemon.types[0].type.name.toUpperCase();
    const type_2 = checkTypeFunction();
    const type = typeFunction (type_1, type_2);

    // Look for a second ability on a pokemon
    function checkAbilityFunction() {
        if (pokemon.abilities[1] != null) {
            return pokemon.abilities[1].ability.name.toUpperCase();
        } else {
            return null;
        }
    }

    // There are pokemons with one or two abilities
    // This function will display properly on the card the abilities of the pokemon
    // avoiding blank spaces for pokemons that have only one ability
    function abilityFunction (ability_1, ability_2) {
        if (ability_2 === null) {
            return `
            <div class="h5 rounded-start-3 ps-4 pe-2 py-1 mb-3" style="background-color: white;">
                ABILITIES:</div>
            <div class="h5 rounded-end-3 ps-2 pe-4 py-1 mb-3" style="background-color: white;">
                ${ability_1}</div>
            `;
        } else {
            return `
            <div class="h5 rounded-start-3 ps-4 pe-2 py-1 mb-3" style="background-color: white;">
                ABILITIES:</div>
            <div class="h5 mb-3 px-2 py-1" style="background-color: white;">
                ${ability_1}</div>
            <div class="h5 rounded-end-3 ps-2 pe-4 py-1 mb-3" style="background-color: white;">
                ${ability_2}</div>
            `;
        }
    }

    function checkTypeFunction () {
        if (pokemon.types[1] != null) {
            return pokemon.types[1].type.name.toUpperCase()
        } else {
            return null;
        }    
    }
    
    function typeFunction (type_1, type_2) {
        if (type_2 === null) {
            return `
            <div class="h5 rounded-start-3 py-1 ps-4 pe-2 mb-3" style="background-color: white;">
                TYPE:</div>
            <div class="h5 rounded-end-3 py-1 ps-2 pe-4 mb-3" style="background-color: white;">
                ${type_1}</div>
            `;
        } else {
            return `
            <div class="h5 rounded-start-3 py-1 ps-4 pe-2 mb-3" style="background-color: white;">
                TYPE:</div>
            <div class="h5 py-1 px-2 mb-3" style="background-color: white;">
                ${type_1}</div>
            <div class="h5 rounded-end-3 py-1 ps-2 pe-4 mb-3" style="background-color: white;">
                ${type_2}</div>
            `;
        }
    }

    // Colors following type
    const colors = {
        NORMAL: "#A8A878",
        FIRE: "#F08030",
        FIGHTING: "#C03028",
        WATER: "#6890F0",
        FLYING: "#A890F0",
        GRASS: "#008240",
        POISON: "#5200A3",
        ELECTRIC: "#F8D030",
        GROUND: "#E0C068",
        PSYCHIC: "#F85888",
        ROCK: "#B8A038",
        ICE: "#98D8D8",
        BUG: "#A8B820",
        DRAGON: "#7038F8",
        GHOST: "#705898",
        DARK: "#705848",
        STELL: "#B8B8D0",
        FAIRY: "#EE99AC",
    };

    // The color of the card is choosen based on the type of the pokemon
    // In case of the pokemon have two types his card will have a two color gradient
    const colorCard_1 = colors[type_1];
    const colorCard_2 = colors[type_2] || colors[type_1];

    const guessDiv = document.createElement("div");
    guessDiv.classList.add("card-box","col", "pt-3", "px-3", "pb-1", "shadow", "rounded-4");
    guessDiv.style.backgroundImage = `linear-gradient(${colorCard_1}, ${colorCard_2})`;
    
    
    const guessDivHTML = `
    <div class="card-header bg-white text-center rounded-pill h3 px-3 py-2 mb-3">     
        <input type="text" name="inputGuess" id="inputGuess" class="inputGuess text-center" autofocus autocomplete="off" placeholder="Pikachu???"> 
    </div>
    <div class="d-flex justify-content-around">
        <div class="h4 text-wrap text-center d-flex justify-content-center rounded-2 py-1 mb-3" style="background-color: white; width: 1rem">
            ATK ${pokemon.stats[1].base_stat}</div>
        <div class="h4 text-wrap text-center d-flex justify-content-center rounded-2 py-1 mb-3" style="background-color: white; width: 1rem">
            DEF ${pokemon.stats[2].base_stat}</div>
        <div class="h4 text-wrap text-center d-flex justify-content-center rounded-2 py-1 mb-3" style="background-color: white; width: 1rem">
            ${pokemon.stats[0].stat.name.toUpperCase()} ${pokemon.stats[0].base_stat}</div>
    </div>
    <div class="d-flex justify-content-center">
        ${ability}
    </div>
    <div class="division-bar rounded-pill mb-2" style="background-color: white;"></div>
        <div class="d-flex justify-content-center">
            <div class="h5 rounded-start-3 py-1 ps-4 pe-2 mb-3" style="background-color: white;">
                CATEGORY:</div>
            <div class="h5 rounded-end-3 py-1 ps-2 pe-4 mb-3" style="background-color: white;">
            ${category.genera[7].genus.toUpperCase()}</div>
    </div>
    <div class="d-flex justify-content-center">
        ${type}
    </div>
    <div class="d-flex justify-content-center">
        <div class="h5 rounded-3 py-1 mb-2 d-flex justify-content-center mx-2" style="background-color: white; width: 4rem;">
            SHAPE</div>
        <div class="h5 rounded-3 py-1 mb-2 d-flex justify-content-center mx-2" style="background-color: white; width: 4rem;">
            FOOTPRINT</div>
        </div>
        <div class="d-flex justify-content-center mb-3">
        <div class="white-box rounded-3 d-flex align-items-center justify-content-center mx-2">
            <img src="shapes/${category.shape.name}.png" class="shape h-100 img-fluid" alt="shape figure">
        </div>  
        <div class="white-box rounded-3 d-flex align-items-center justify-content-center mx-2">
            <img src="footprints/${id}.png" class="footprint" alt="footprint"></img>
        </div>    
    </div>
    <div class="d-flex justify-content-center">
        <div class="h5 text-center rounded-3 px-2 py-1 mx-auto" style="background-color: white;">
            WEIGHT:&nbsp;${weight}kg</div>
        <div class="h5 text-center rounded-3 px-2 py-1 mx-auto" style="background-color: white;">
            HEIGHT:&nbsp;${height}m</div>
    </div>
    <div class="division-bar rounded-pill" style="background-color: white;"></div>
    `
    // Pass the card stored information to the HTML element
    guessDiv.innerHTML = guessDivHTML;
    // Append the card element as a child of a parent that belongs to the html page
    // Now the card belongs to the html page and is displayed.
    pokemonDivRow.appendChild(guessDiv);

    // Guessing Game
    const inputColor = document.querySelector(".card-header");
    const answer = document.querySelector(".inputGuess");
    const btnGuess = document.querySelector(".btnGuess");
    const checkAnswer = document.querySelector(".answer");
    let triesCount = 0;

    btnGuess.addEventListener ("click", () => {
        // Check if the input is the correct pokemon name
        if (answer.value.toLowerCase() === name) {
            
            // Remove the card from display
            pokemonDivRow.removeChild(guessDiv);
            
            // Disable the button to try another guess
            btnGuess.setAttribute("disabled", "");

            checkAnswer.innerHTML = "Correct!";

            // User guesses right, the card is revealed - being created and dislplayed!!
            pokemonDivRow.appendChild(createPokemonCard(pokemon, category));

        } else {

            // Turn the guess field into a red background with white text
            inputColor.classList.remove("bg-white");
            inputColor.style.backgroundColor = "red";
            inputColor.style.border = "solid 0.2rem white";
            answer.style.color = "white";        
            answer.style.backgroundColor = "red";
            
            // Count a fail try
            triesCount++;

            // inform that the guess is wrong and show the amount of tries 
            checkAnswer.innerHTML = "WRONG!" + "<br>" + `${triesCount}` + "th try";

            if (triesCount >= 3) {
                
                // Remove the card from display
                pokemonDivRow.removeChild(guessDiv);

                // Disable the button to try another guess
                btnGuess.setAttribute("disabled", "");

                checkAnswer.innerHTML = "You Lose!";
                
                // User fails to guess, the card is revealed - being created and dislplayed!!
                pokemonDivRow.appendChild(createPokemonCard(pokemon, category));
            }
        }
 }) 
}


