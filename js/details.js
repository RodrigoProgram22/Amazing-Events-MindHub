const objetoURL = new URLSearchParams(location.search);
const param = objetoURL.get("id");
const $divDetails = document.getElementById("details");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((resp) => resp.json())
  .then((data) => {
    const evento = data.events.find((objet) => objet._id == param);
    imprimirDetails($divDetails, evento);
  })
  .catch((error) => {
    console.log(error);
  });

function crearTemplate(objeto) {
  let template = "";
  return (template = `
        <div class="col-md-6 d-flex align-items-center">
            <img src="${objeto.image}" class="img-fluid rounded " alt="${objeto.name}" />
        </div>
        <div class="col-md-4">
          <div class="card-body">
            <h1 class="card-title">${objeto.name}</h1>
            <p class="card-text">
              ${objeto.description}
            </p>
            <p><b>Date: </b> ${objeto.date}</p>
            <p><b>Category: </b> ${objeto.category}</p>
            <p><b>Place: </b> ${objeto.place}</p>
            <p><b>Assistance: </b> ${objeto.assistance}</p>
            <p><b>Capacity: </b> ${objeto.capacity}</p>
            <p><b>Price: </b>${objeto.price}</p>
          </div>
        </div>
    `);
}
function imprimirDetails(elemento, objeto) {
  elemento.innerHTML = crearTemplate(objeto);
}
