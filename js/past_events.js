const $rowCards = document.getElementById("rowCards");
const events = data.events;
const fechaActual = Date.parse(data.currentDate);
for (let event of events) {
    if (Date.parse(event.date)<=fechaActual) {
        $rowCards.innerHTML += `
        <div class="col d-flex align-items-stretch">
        <div class="card bg-light p-2">
        <img
        src="${event.image}"
        class="card-img-top"
        alt="${event.name}"
        />
        <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">
          ${event.description}
        </p>
        <p><b>Date :</b> ${event.date}</p>
        <div
          class="d-flex justify-content-between align-items-center"
        >
          <h4>Price $ ${event.price}</h4>
          <button class="btn btn-primary" type="submit">
            <a href="details.html">Details</a>
          </button>
        </div>
        </div>
        </div>
        </div>`; 
    }
}