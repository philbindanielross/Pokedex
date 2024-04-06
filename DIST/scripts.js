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
  function a(e) {
    let t = document.querySelector(".modal-container"),
      n = document.querySelector(".modal-dialog"),
      i = document.querySelector(".modal-content"),
      a = document.querySelector(".modal-header"),
      o = document.querySelector(".modal-footer"),
      l = document.querySelector(".modal-body"),
      d = document.createElement("h1");
    d.innerText = e.name;
    let r = document.querySelector(".modal-text"),
      s = document.createElement("p");
    s.innerHTML = `<b>Height:</b> ${e.height} meters`;
    let c = document.createElement("p");
    c.innerHTML = `<b>Type:</b> ${e.type}`;
    let p = document.createElement("p");
    p.innerHTML = `<b>Weight:</b> ${e.weight} lbs`;
    let m = document.createElement("p");
    m.innerHTML = `<b>Abilities:</b> ${e.abilities}`;
    let u = document.createElement("img");
    u.setAttribute("src", e.imageURL),
      u.setAttribute("alt", "Poke-IMG"),
      u.classList.add("img-class"),
      (n.innerHTML = ""),
      (i.innerHTML = ""),
      (a.innerHTML = ""),
      (r.innerHTML = ""),
      (l.innerHTML = ""),
      n.appendChild(i),
      i.appendChild(a),
      i.appendChild(l),
      i.appendChild(o),
      a.appendChild(d),
      l.appendChild(r),
      r.appendChild(s),
      r.appendChild(p),
      r.appendChild(c),
      r.appendChild(m),
      l.appendChild(u),
      t.classList.remove("hidden");
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
            t.innerText, a(pokemon);
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
          o = document.createElement("li"),
          l = document.createElement("button");
        (l.innerText = t.name),
          o.classList.add("list-group-item"),
          l.classList.add("pokemon-item-btn", "btn"),
          l.setAttribute("data-target", "#pokemon-modal"),
          l.setAttribute("data-toggle", "modal"),
          o.appendChild(l),
          n.appendChild(o),
          l.addEventListener("click", function (e) {
            (function e(t) {
              i(t).then(function () {
                a(t);
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
