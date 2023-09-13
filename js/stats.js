// Primer Tabla
const $mayorAsis = document.getElementById("mayorA");
const $menorAsis = document.getElementById("menorA");
const $mayorCap = document.getElementById("mayorC");
// Segunda Tabla
const $passCategory = document.getElementById("passCategory");
// Tercer Tabla
const $upcomingCategory = document.getElementById("upcomingCategory");
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((resp) => resp.json())
  .then((data) => {
    const events = data.events;
    const fechaActual = Date.parse(data.currentDate);
    let passEvent = events.filter( (objet) => Date.parse(objet.date) <= fechaActual );
    let passEventT2 = events.filter( (objet) => Date.parse(objet.date) <= fechaActual );
    let upcomingEvent = events.filter( (objet) => Date.parse(objet.date) >= fechaActual );
    const catSinRepPass = [...new Set(passEventT2.map((objet) => objet.category)),].sort();
    const catSinRepUpcoming = [...new Set(upcomingEvent.map((objet) => objet.category)),].sort();
    // Primera Tabla
    passEvent = passEvent.map((objet) => {
      return {
        ...objet,
        porcentaje: (objet.assistance / objet.capacity) * 100,
      };
    });
    passEvent = passEvent.sort((a, b) => a.porcentaje - b.porcentaje);
    const eventoMasPorcentajeAsis = passEvent[passEvent.length - 1];
    const eventoBajoPorcentajeAsis = passEvent[0];
    const eventoMayorCapacidad = events.sort((a, b) => a.capacity - b.capacity);
    $mayorAsis.innerHTML = eventoMasPorcentajeAsis.name + " " + eventoMasPorcentajeAsis.porcentaje + " %";
    $menorAsis.innerHTML = eventoBajoPorcentajeAsis.name + " " + eventoBajoPorcentajeAsis.porcentaje + " %";
    $mayorCap.innerHTML = eventoMayorCapacidad[eventoMayorCapacidad.length - 1].name + " " + eventoMayorCapacidad[eventoMayorCapacidad.length - 1].capacity;
    // Segunda Tabla
    const catPassEvent = catSinRepPass.map((objet) => {
      return {
        nombre: objet,
        ganancias: acumularGanancia(objet, passEventT2, false),
        porcentaje: acumuladorPorcentaje(objet, passEventT2, false),
      };
    });
    imprimirTR(catPassEvent, $passCategory);
    // Tercer Tabla
    const catUpcomingEvent = catSinRepUpcoming.map((objet) => {
      return {
        nombre: objet,
        ganancias: acumularGanancia(objet, upcomingEvent, true),
        porcentaje: acumuladorPorcentaje(objet, upcomingEvent, true),
      };
    });
    imprimirTR(catUpcomingEvent, $upcomingCategory);
  })
  .catch((error) => {
    console.log(error);
  });
// Tablas
function acumularGanancia(categories, array, boolean) {
  const category = array.filter((objet) => objet.category === categories);
  if (boolean) {
    const totalGanancias = category.reduce((acumulador, evento) => {
      return acumulador + evento.price * evento.estimate;
    }, 0);
    return totalGanancias;
  } else {
    const totalGanancias = category.reduce((acumulador, evento) => {
      return acumulador + evento.price * evento.assistance;
    }, 0);
    return totalGanancias;
  }
}
function acumuladorPorcentaje(categories, array, boolean) {
  const category = array.filter((objet) => objet.category === categories);
  if (boolean) {
    const totalEstimate = category.reduce((acumulador, evento) => {
      return acumulador + evento.estimate;
    }, 0);
    const totalCapacity = category.reduce((acumulador, evento) => {
      return acumulador + evento.capacity;
    }, 0);
    return (totalEstimate / totalCapacity) * 100;
  } else {
    const totalEstimate = category.reduce((acumulador, evento) => {
      return acumulador + evento.assistance;
    }, 0);
    const totalCapacity = category.reduce((acumulador, evento) => {
      return acumulador + evento.capacity;
    }, 0);
    return (totalEstimate / totalCapacity) * 100;
  }
}
function templateTR(objet) {
  return (html = `
    <tr>
      <td>${objet.nombre}</td>
      <td>$ ${objet.ganancias}</td>
      <td>${objet.porcentaje} %</td>
    </tr> `);
}
function imprimirTR(array, elemento) {
  let estructura = "";
  array.forEach((categoria) => {
    estructura += templateTR(categoria);
  });
  elemento.innerHTML = estructura;
}
