const pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Ivysaur",
      height: 1,
      attack: 62,
      defense: 63,
      speed: 60,
      types: ["grass", "poison"],
    },
    {
      name: "Balbasaur",
      height: 0.7,
      attack: 49,
      defense: 49,
      speed: 45,
      types: ["grass", "poison"],
    },
    {
      name: "Squirtle",
      height: 0.5,
      attack: 48,
      defense: 65,
      speed: 43,
      types: ["water"],
    },
    {
      name: "Charizard",
      height: 1.7,
      attack: 84,
      defense: 78,
      speed: 100,
      types: ["fire", "flying"],
    },
    {
      name: "Beedrill",
      height: 1,
      attack: 90,
      defense: 40,
      speed: 75,
      types: ["bug", "poison"],
    },
    {
      name: "Paras",
      height: 0.3,
      attack: 70,
      defense: 55,
      speed: 25,
      types: ["grass", "bug"],
    },
  ];
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let ListOfPokemon = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-item");
    listItem.appendChild(button);
    ListOfPokemon.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
//if (pokemon.height >= 1.5) {
//   document.write(
//     `${pokemon.name}: ${pokemon.height} meters tall. It is a big Pokemon. <br>`
//   );
// } else if (pokemon.height <= 0.5) {
//   document.write(
//     `${pokemon.name}: ${pokemon.height} meters tall. It is a small Pokemon. <br>`
//   );
// } else {
//   document.write(
//     `${pokemon.name}: ${pokemon.height} meters tall. It is a medium-sized Pokemon. <br>`
//   );
// }
