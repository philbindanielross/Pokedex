const pokemonRepository = (function () {
  let pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  //Adds the list of Pokemon to the DOM, and a button to open the modal
  function addListItem(pokemon) {
    let ListOfPokemon = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    listItem.classList.add("list-group-item");
    button.classList.add("pokemon-item-btn", "btn");
    //Why does this work, but button.setAttribute("data-target", "#pokemon-modal", "data-toggle", "modal"); doesn't work?
    button.setAttribute("data-target", "#pokemon-modal");
    button.setAttribute("data-toggle", "modal");
    listItem.appendChild(button);
    ListOfPokemon.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //Promise function that first takes all the info from the API (loadDetails) and then creates a modal to display it(showModal).
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //Fetches and parses API data. Returns the name and URL which will be used for each card
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

  //Fetches and loads the individual details for each Pokemon.
  function loadDetails(item) {
    let url = item.detailsURL;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageURL = details.sprites.front_default;
        item.height = details.height;
        item.type = details.types[0].type.name;
        item.weight = details.weight;
        item.abilities = details.abilities[0].ability.name;
        console.log(details.weight);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  //MODAL WINDOW FUNCTIONALITY (called line 129)

  function showModal(pokemon) {
    const modalContainer = document.querySelector(".modal-container");
    const modal = document.querySelector(".modal-dialog");
    const modalContent = document.querySelector(".modal-content");
    const modalHeader = document.querySelector(".modal-title");
    const modalFooter = document.querySelector(".modal-footer");
    const modalBody = document.querySelector(".modal-body");

    //const pokemonName = document.createElement("h1");
    modalHeader.innerText = pokemon.name;

    const modalText = document.querySelector(".modal-text");

    const pokemonHeight = document.createElement("p");
    pokemonHeight.innerHTML = `<b>Height:</b> ${pokemon.height} meters`;
    const pokemonType = document.createElement("p");
    pokemonType.innerHTML = `<b>Type:</b> ${pokemon.type}`;
    const pokemonWeight = document.createElement("p");
    pokemonWeight.innerHTML = `<b>Weight:</b> ${pokemon.weight} lbs`;
    const pokemonAbilities = document.createElement("p");
    pokemonAbilities.innerHTML = `<b>Abilities:</b> ${pokemon.abilities}`;

    const pokemonImg = document.createElement("img");
    pokemonImg.setAttribute("src", pokemon.imageURL);
    pokemonImg.setAttribute("alt", "Poke-IMG");
    //pokemonImg.src = "pokemonImageUrl"; // I MODIFIED THE EVENT LISTENER TO pokemon.imageURL AND COMMENTED OUT THIS LINE. BUT I DON'T UNDERSTAND WHY THIS WORKED TO FIX THE PROBLEM
    pokemonImg.classList.add("img-class");

    // const btnCloseModal = document.createElement("button");
    // btnCloseModal.classList.add("close");
    // btnCloseModal.innerHTML = "&times";
    // btnCloseModal.addEventListener("click", function () {
    //   modalContainer.classList.add("hidden");
    // });
    //modal.innerHTML = ""; // Clear existing modal content
    //modalContent.innerHTML = "";
    //modalHeader.innerHTML = "";
    modalText.innerHTML = "";
    modalBody.innerHTML = "";
    modal.appendChild(modalContent);

    //modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    //modalHeader.appendChild(pokemonName);

    modalBody.appendChild(modalText);
    modalText.appendChild(pokemonHeight);
    modalText.appendChild(pokemonWeight);
    modalText.appendChild(pokemonType);
    modalText.appendChild(pokemonAbilities);
    modalBody.appendChild(pokemonImg);

    //modal.appendChild(btnCloseModal);

    // modalContainer.classList.remove("hidden"); // Show modal by removing "hidden" class
  }
  // Load modal window functionality after the DOM is loaded (I DON'T UNDERSTAND THIS, BUT CHAT GPT TOLD ME THIS WAS WHY MY CODE WASN'T WORKING)
  document.addEventListener("DOMContentLoaded", function () {
    const modalWindow = document.querySelector(".modal-dialog");
    const overlay = document.querySelector(".modal-container");
    //const btnCloseModal = document.querySelector(".close");

    //CLOSES MODAL WITH A CLICK EITHER IN THE 'CLOSE BUTTON' OR IN THE MODAL CONTAINER OUTSIDE THE MODAL.
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("pokemon-item")) {
        overlay.classList.remove("hidden");
      } else if (event.target.classList.contains("close")) {
        overlay.classList.add("hidden");
      } else if (
        event.target.classList.contains("modal-container") &&
        !overlay.classList.contains("hidden")
      ) {
        overlay.classList.add("hidden");
      }
    });

    //Opens modal with a click of Pokemon list item
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("pokemon-item")) {
        const pokemonItem = event.target;
        const pokemonName = pokemonItem.innerText;
        showModal(pokemon);
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
