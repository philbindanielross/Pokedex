// Java Script
// alert("Hello world");
// let favoriteFood = "Ethiopian";
// document.write(favoriteFood);
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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.5) {
    document.write(
      pokemonList[i].name +
        " (height:" +
        pokemonList[i].height +
        " meters) " +
        " Big Pokemon... " +
        " Wow, that's big! "
    );
  } else if (pokemonList[i].height > 0.5 && pokemonList[i].height <= 1.5) {
    document.write(
      pokemonList[i].name +
        " (height:" +
        pokemonList[i].height +
        " meters) " +
        " Medium-sized Pokemon... "
    );
  } else {
    document.write(
      pokemonList[i].name +
        " (height:" +
        pokemonList[i].height +
        " meters) " +
        " Small Pokemon... "
    );
  }
}
// I want the pokemon to be split into three categories: small, medium and large.

// Right now, the text is an ugly string of words that runs across the entire webpage. If this was HTML, it would be easy enough to style it with CSS, but not sure how to do that with text written with JavaScript.
// for now, I added () and ... to help break up the list of Pokemon.
