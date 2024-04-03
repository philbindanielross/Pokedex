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
          console.log(t);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function o(e) {
    let t = document.querySelector(".modal-container"),
      n = document.querySelector(".modal-dialog"),
      i = document.createElement("h1");
    i.innerText = e.name;
    let o = document.querySelector(".modal-content"),
      a = document.querySelector(".modal-body"),
      l = document.createElement("p");
    l.innerHTML = `<b>Height:</b> ${e.height} meters`;
    let s = document.createElement("p");
    s.innerHTML = `<b>Type:</b> ${e.type}`;
    let d = document.createElement("p");
    d.innerHTML = `<b>Weight:</b> ${e.weight} lbs`;
    let r = document.createElement("p");
    r.innerHTML = `<b>Abilities:</b> ${e.abilities}`;
    let c = document.createElement("img");
    c.setAttribute("src", e.imageURL),
      c.setAttribute("alt", "Poke-IMG"),
      c.classList.add("img-class");
    let p = document.createElement("button");
    p.classList.add("close"),
      (p.innerHTML = "&times"),
      p.addEventListener("click", function () {
        t.classList.add("hidden");
      }),
      (n.innerHTML = ""),
      (o.innerHTML = ""),
      n.appendChild(o),
      o.appendChild(i),
      o.appendChild(a),
      a.appendChild(l),
      a.appendChild(d),
      a.appendChild(s),
      a.appendChild(r),
      o.appendChild(c),
      n.appendChild(p),
      t.classList.remove("hidden");
  }
  return (
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".modal-dialog");
      let e = document.querySelector(".modal-container");
      document.querySelector(".close"),
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
            t.innerText,
              t.pokemon.height,
              t.pokemon.type,
              t.pokemon.imageUrl,
              o(pokemon);
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
