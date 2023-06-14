// Create the pokemon card using the data from the API
export default function createPokemonCard(pokemon, category) {

    // Organizing and Formating the data taken from API    
    const name = pokemon.name.toUpperCase();
    const id = pokemon.id.toString().padStart(3,'0');
    const weight = pokemon.weight / 10;
    const height = pokemon.height / 10;

    const ability_1 = pokemon.abilities[0].ability.name.toUpperCase();
    const ability_2 = checkAbilityFunction();
    const ability = abilityFunction(ability_1, ability_2);
    
    const type_1 = pokemon.types[0].type.name.toUpperCase();
    const type_2 = checkTypeFunction();
    const type = typeFunction (type_1, type_2);
    
    const imageSize = pokemonHeight();

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

    // Look for a second type on a pokemon
    function checkTypeFunction () {
        if (pokemon.types[1] != null) {
            return pokemon.types[1].type.name.toUpperCase();
        } else {
            return null;
        }    
    }
    
    // There are pokemons with one or two types
    // This function will display properly on the card the types of the pokemon
    // avoiding blank spaces for pokemons that have only one type
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

    // This value will be used to scale the image of the pokemon on the card
    // The higher the pokemon, bigger the image on the card
    function pokemonHeight() {
        if (height < 0.8) {
            // Small Pókemon
            return "pokemon-low";
        } else if (height < 1.5) {
            // Normal Pókemon
            return "pokemon-mid";
        } else {
            // Big Pókemon
            return "pokemon-high";
        }
    }

    // Colors follow a pokemon type and color pair
    // Type as key and color as value
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
        STEEL: "#B8B8D0",
        FAIRY: "#EE99AC",
    };

    // The color of the card is choosen based on the type of the pokemon
    // In case of the pokemon have two types his card will have a two color gradient
    const colorCard_1 = colors[type_1];
    const colorCard_2 = colors[type_2] || colors[type_1];

    // Create the card as an HTML element 
    const cardEl = document.createElement("div");
    cardEl.classList.add("card-box","col", "pt-3", "px-3", "pb-1", "shadow", "rounded-4");
    cardEl.style.backgroundImage = `linear-gradient(${colorCard_1}, ${colorCard_2})`;

    // Store the card information
    const cardElInnerHTML = `
    <div class="img-space d-flex justify-content-center">
        <div class="${imageSize}">
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="img-fluid h-100" alt="image ${name}" >
        </div>
    </div>
    <div class="card-header bg-white text-center rounded-pill h3 px-3 py-2 mb-3">
        ${name}
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
    <div class="h5 text-center mb-1" style="color: #f2f2f2;">#${id}</div>
    `
    // Pass the card stored information to the HTML element
    cardEl.innerHTML = cardElInnerHTML;

    return cardEl
}

