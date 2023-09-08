const $rowCards = document.getElementById("rowCards");
const $checkDiv = document.getElementById("check");
const $inputSearch = document.getElementById("search");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((resp) => resp.json())
  .then((data) => {
    const events = data.events;
    const fechaActual = Date.parse(data.currentDate);
    const eventosFiltrados = events.filter(
      (objet) => Date.parse(objet.date) <= fechaActual
    );
    const catSinRep = [...new Set(events.map((objet) => objet.category))];
    imprimirCards(eventosFiltrados, $rowCards);
    imprimirCheck(catSinRep, $checkDiv);
    $inputSearch.addEventListener("keyup", () => {
      const returnFiltrados = filtroCombinado(eventosFiltrados, $inputSearch);
      imprimirCards(returnFiltrados, $rowCards);
      if (returnFiltrados.length == 0) {
        msjError($rowCards);
      }
    });
    $checkDiv.addEventListener("change", () => {
      const returnFiltrados = filtroCombinado(eventosFiltrados, $inputSearch);
      imprimirCards(returnFiltrados, $rowCards);
      if (returnFiltrados.length == 0) {
        msjError($rowCards);
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
function templateCards(objet) {
  let template = "";
  template = `
  <div class="col d-flex align-items-stretch">
  <div class="card bg-light p-2">
  <img
  src="${objet.image}"
  class="card-img-top"
  alt="${objet.name}"
  />
  <div class="card-body">
  <h5 class="card-title">${objet.name}</h5>
  <p class="card-text">
    ${objet.description}
  </p>
  <p><b>Date :</b> ${objet.date}</p>
  <div
    class="d-flex justify-content-between align-items-center"
  >
    <h4>Price $ ${objet.price}</h4>
    <a href="details.html?id=${objet._id}" class="btn btn-primary">Details</a>
  </div>
  </div>
  </div>
  </div>`;
  return template;
}
function imprimirCards(array, elemento) {
  let estructura = "";
  array.forEach((objeto) => {
    estructura += templateCards(objeto);
  });
  elemento.innerHTML = estructura;
}
function templateCheck(string) {
  let template = "";
  template = `
  <div class="form-check mx-3">
  <input
    class="form-check-input"
    type="checkbox"
    value="${string}"
    id="${string}"
  />
  <label class="form-check-label" for="${string}">
    ${string}
  </label>
</div>
  `;
  return template;
}
function imprimirCheck(array, elemento) {
  let estructura = "";
  array.forEach((categoria) => {
    estructura += templateCheck(categoria);
  });
  elemento.innerHTML = estructura;
}
function filtroCheck(array) {
  let nodeList = document.querySelectorAll("input[type='checkbox']:checked");
  let arrayValores = Array.from(nodeList).map((objet) => objet.value);
  let objetosFiltrados = array.filter((objet) =>
    arrayValores.includes(objet.category)
  );
  if (nodeList.length === 0) {
    return array;
  }
  return objetosFiltrados;
}
function filtroSearch(array, input) {
  let inputText = input.value.toLowerCase();
  let objetosFiltrados = array.filter((objet) =>
    objet.name.toLowerCase().includes(inputText)
  );
  return objetosFiltrados;
}
function filtroCombinado(array, input) {
  const filtro1 = filtroCheck(array);
  const filtro2 = filtroSearch(filtro1, input);
  return filtro2;
}
function msjError(elemento) {
  elemento.innerHTML =
    "<div class='container text-danger border border-danger p-3 rounded'>No se encontraron resultados.</div>";
}
