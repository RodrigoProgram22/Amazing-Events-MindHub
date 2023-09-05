const events = data.events;
const $rowCards = document.getElementById("rowCards");
const $checkDiv = document.getElementById("check");
const $inputSearch = document.getElementById("search");
const catSinRep = [ ... new Set(events.map(objet => objet.category)) ];
const fechaActual = Date.parse(data.currentDate);
let eventosFiltrados = events.filter(objet =>  Date.parse(objet.date) <= fechaActual );

function templateCards(objet) {
  let template ="";
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
function imprimirCards(array,elemento){
  let estructura = ""
  array.forEach(objeto=>{
    estructura += templateCards(objeto);
  })
  elemento.innerHTML = estructura;
}

imprimirCards(eventosFiltrados,$rowCards);

function templateCheck(string){
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
function imprimirCheck(array,elemento){
  let estructura = "";
  array.forEach(categoria =>{
    estructura += templateCheck(categoria);
  })
  elemento.innerHTML = estructura;
}
imprimirCheck(catSinRep,$checkDiv);
$checkDiv.addEventListener("change",(e)=>{
  let nodeList = document.querySelectorAll("input[type='checkbox']:checked");
  let arrayValores = Array.from(nodeList).map(objet => objet.value);
  let objetosFiltrados = eventosFiltrados.filter(objet => arrayValores.includes(objet.category));
  imprimirCards(objetosFiltrados,$rowCards);
  if (objetosFiltrados.length == 0) {
    imprimirCards(eventosFiltrados,$rowCards);
  }
})

$inputSearch.addEventListener("keyup", (e)=>{
  let inputText = e.target.value.toLowerCase();
  let objetosFiltrados = eventosFiltrados.filter(objet => objet.name.toLowerCase().includes(inputText));
  imprimirCards(objetosFiltrados,$rowCards);
  if (inputText.length == 0) {
    imprimirCards(eventosFiltrados,$rowCards);
  }
})