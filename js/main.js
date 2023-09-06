const events = data.events;
const $rowCards = document.getElementById("rowCards");
const $checkDiv = document.getElementById("check");
const $inputSearch = document.getElementById("search");
const catSinRep = [ ... new Set(events.map(objet => objet.category)) ];
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
  <div
    class="d-flex justify-content-between align-items-stretch"
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
imprimirCards(events,$rowCards);

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

function filtroCheck(array){
  let nodeList = document.querySelectorAll("input[type='checkbox']:checked");
  let arrayValores = Array.from(nodeList).map(objet => objet.value);
  let objetosFiltrados = array.filter(objet => arrayValores.includes(objet.category));
  if(nodeList.length === 0){
    return array;
  }
  return objetosFiltrados;
}
function filtroSearch(array,input){
  let inputText =input.value.toLowerCase();
  let objetosFiltrados = array.filter(objet => objet.name.toLowerCase().includes(inputText));
  return objetosFiltrados;
}
function filtroCombinado(array,input){
  const filtro1 = filtroCheck(array);
  const filtro2 = filtroSearch(filtro1,input);
  return filtro2;
}
function msjError(elemento){
  elemento.innerHTML = "<div class='container text-danger border border-danger p-3 rounded'>No se encontraron resultados.</div>"
}
$inputSearch.addEventListener("keyup", ()=>{
  const returnFiltrados = filtroCombinado(events,$inputSearch);
  imprimirCards(returnFiltrados,$rowCards);
  if (returnFiltrados.length == 0) {
    msjError($rowCards);
  }
})

$checkDiv.addEventListener("change",()=>{
  const returnFiltrados = filtroCombinado(events,$inputSearch);
  imprimirCards(returnFiltrados,$rowCards);
  if (returnFiltrados.length == 0) {
    msjError($rowCards);
  }
})