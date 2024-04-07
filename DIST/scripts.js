const pokemonRepository = (function () {
  let e = [];
  function t(t) {
    e.push(t);
  }
  function n() {
    return e;
  }
  function i(e) {
    return fetch(e.detailsURL)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageURL = t.sprites.front_default),
          (e.height = t.height),
          (e.type = t.types[0].type.name),
          (e.weight = t.weight),
          (e.abilities = t.abilities[0].ability.name),
          console.log(t.weight);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function o(e) {
    document.querySelector(".modal-container");
    let t = document.querySelector(".modal-dialog"),
      n = document.querySelector(".modal-content"),
      i = document.querySelector(".modal-title"),
      o = document.querySelector(".modal-footer"),
      a = document.querySelector(".modal-body");
    i.innerText = e.name;
    let l = document.querySelector(".modal-text"),
      r = document.createElement("p");
    r.innerHTML = `<b>Height:</b> ${e.height} meters`;
    let d = document.createElement("p");
    d.innerHTML = `<b>Type:</b> ${e.type}`;
    let s = document.createElement("p");
    s.innerHTML = `<b>Weight:</b> ${e.weight} lbs`;
    let c = document.createElement("p");
    c.innerHTML = `<b>Abilities:</b> ${e.abilities}`;
    let p = document.createElement("img");
    p.setAttribute("src", e.imageURL),
      p.setAttribute("alt", "Poke-IMG"),
      p.classList.add("img-class"),
      (l.innerHTML = ""),
      (a.innerHTML = ""),
      t.appendChild(n),
      n.appendChild(a),
      n.appendChild(o),
      a.appendChild(l),
      l.appendChild(r),
      l.appendChild(s),
      l.appendChild(d),
      l.appendChild(c),
      a.appendChild(p);
  }
  return (
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".modal-dialog");
      let e = document.querySelector(".modal-container");
      document.addEventListener("click", function (t) {
        t.target.classList.contains("pokemon-item")
          ? e.classList.remove("hidden")
          : t.target.classList.contains("close")
          ? e.classList.add("hidden")
          : t.target.classList.contains("modal-container") &&
            !e.classList.contains("hidden") &&
            e.classList.add("hidden");
      }),
        document.addEventListener("click", function (e) {
          if (e.target.classList.contains("pokemon-item")) {
            let t = e.target;
            t.innerText, o(pokemon);
          }
        });
    }),
    window.addEventListener("keydown", (e) => {
      let t = document.querySelector(".modal-container");
      "Escape" !== e.key ||
        t.classList.contains("hidden") ||
        t.classList.add("hidden");
    }),
    {
      add: t,
      getAll: n,
      addListItem: function e(t) {
        let n = document.querySelector(".pokemon-list"),
          a = document.createElement("li"),
          l = document.createElement("button");
        (l.innerText = t.name),
          a.classList.add("list-group-item"),
          l.classList.add("pokemon-item-btn", "btn"),
          l.setAttribute("data-target", "#pokemon-modal"),
          l.setAttribute("data-toggle", "modal"),
          a.appendChild(l),
          n.appendChild(a),
          l.addEventListener("click", function (e) {
            (function e(t) {
              i(t).then(function () {
                o(t);
              });
            })(t);
          });
      },
      loadList: function e() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            e.results.forEach(function (e) {
              t({ name: e.name, detailsURL: e.url });
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      loadDetails: i,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
