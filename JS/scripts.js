const pokemonRepository = (function () {
  let pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imageURL);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsURL: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function loadDetails(item) {
    let url = item.detailsURL;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageURL = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  //MODAL WINDOW FUNCTIONALITY

  function showModal(title, height, img) {
    const modalContainer = document.querySelector(".modal-container");
    const modal = document.querySelector(".modal");

    const pokemonName = document.createElement("h1");
    pokemonName.innerText = title;

    const pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = height;

    const pokemonImg = document.createElement("img");
    pokemonImg.setAttribute("src", img);
    pokemonImg.setAttribute("alt", "Poke-IMG");
    pokemonImg.src = "https://pokeapi.co/api/v2/pokemon/?limit=150"; //HOW DO I FIND THE ACTUAL IMAGE URL?

    const btnCloseModal = document.createElement("button");
    btnCloseModal.classList.add("close-modal");
    btnCloseModal.innerText = "X";
    btnCloseModal.addEventListener("click", function () {
      modalContainer.classList.add("hidden");
    });
    modal.innerHTML = ""; // Clear existing modal content
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonImg);
    modal.appendChild(btnCloseModal);

    modalContainer.classList.remove("hidden"); // Show modal by removing "hidden" class
  }
  // Load modal window functionality after the DOM is loaded (I DON'T UNDERSTAND THIS, BUT CHAT GPT TOLD ME THIS WAS WHY MY CODE WASN'T WORKING)
  document.addEventListener("DOMContentLoaded", function () {
    const modalWindow = document.querySelector(".modal");
    const overlay = document.querySelector(".modal-container");
    const btnCloseModal = document.querySelector(".close-modal");

    //CLOSES MODAL WITH A CLICK EITHER IN THE 'CLOSE BUTTON' OR IN THE MODAL CONTAINER OUTSIDE THE MODAL.
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("pokemon-item")) {
        overlay.classList.remove("hidden");
      } else if (event.target.classList.contains("close-modal")) {
        overlay.classList.add("hidden");
      } else if (
        event.target.classList.contains("modal-container") &&
        !overlay.classList.contains("hidden")
      ) {
        overlay.classList.add("hidden");
      }
    });
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("pokemon-item")) {
        const pokemonItem = event.target;
        const pokemonName = pokemonItem.innerText;
        const pokemonHeight = pokemonItem.pokemon.height;
        const pokemonImageUrl = pokemonItem.pokemon.imageUrl;
        showModal(pokemon[i].name, pokemon[i].height, pokemon[i].imgURL);
      }
    });
  });

  //CLOSE MODAL WITH ESCAPE KEY
  window.addEventListener("keydown", (event) => {
    let overlay = document.querySelector(".modal-container");
    if (event.key === "Escape" && !overlay.classList.contains("hidden")) {
      overlay.classList.add("hidden");
    }
  });

  // Return repository functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

//iterates over the pokemon repository list and adds a list item to it.
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
//modal window functionality:
// (function () {
//   function showModal(title, text) {
//     let modalContainer = document.querySelector(".modal-container");

//     // This is so what's been opened before doesn't stick around
//     modalContainer.innerHTML = "";

//     let modal = document.createElement("div");
//     modal.classList.add("modal");

//     // Add the new modal content
//     let closeButtonElement = document.createElement("button");
//     closeButtonElement.classList.add("modal-close");
//     closeButtonElement.innerText = "X";
//     closeButtonElement.addEventListener("click", hideModal);

//     let titleElement = document.createElement("h1");
//     titleElement.innerText = title;

//     let contentElement = document.createElement("p");
//     contentElement.innerText = text;

//     modal.appendChild(closeButtonElement);
//     modal.appendChild(titleElement);
//     modal.appendChild(contentElement);
//     modalContainer.appendChild(modal);

//     modalContainer.classList.add("is-visible");

//     modalContainer.addEventListener("click", (event) => {
//       // Since this is also triggered when clicking INSIDE the modal
//       // We only want to close if the user clicks directly on the overlay
//       let target = event.target;
//       if (target === modalContainer) {
//         hideModal();
//       }
//     });
//   }

//   function hideModal() {
//     let modalContainer = document.querySelector(".modal-container");
//     modalContainer.classList.remove("is-visible");
//   }

//   window.addEventListener("keydown", (event) => {
//     let modalContainer = document.querySelector(".modal-container");
//     if (
//       event.key === "Escape" &&
//       modalContainer.classList.contains("is-visible")
//     ) {
//       hideModal();
//     }
//   });

//   document.querySelector(".pokemon-item").addEventListener("click", () => {
//     showModal(pokemon.name + pokemon.height);
//   });

//   // THE RETURN STATEMENT HERE
// })();
