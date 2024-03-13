//IIFE containing the pokemon respository and functions acting on it
const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
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
      console.log(pokemon); // change this?
    });
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json(); //parse
      })
      .then(function (json) {
        //what's returned from line 30
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
(function () {
  function showModal(title, text) {
    let modalContainer = document.querySelector(".modal-container");

    // Clear all existing modal content //why do we need to do this?
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector(".modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal(pokemon.name + pokemon.height); //how do I add the image?
  });

  // THE RETURN STATEMENT HERE
})();
