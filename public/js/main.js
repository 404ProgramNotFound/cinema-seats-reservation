const socket = io();

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const submit = document.querySelector(".submit-feedback");

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
});

submit.addEventListener("click", (e) => {
  let postiSelezionati = Array.from(
    document.querySelectorAll(".row .selected")
  );
  if (postiSelezionati.length > 0) {
    let posti = [];
    postiSelezionati.forEach((p) => {
      posti.push(p.id);
    });
    let prenotazione = {};
    let fallito = false;
    Array.from(document.querySelectorAll(".form__input")).forEach((input) => {
      if (input.value == "" && !fallito) {
        fallito = true;
      }
    });
    if (!fallito) {
      Array.from(document.querySelectorAll(".form__input")).forEach((input) => {
        if (input.value == "") {
        }
        prenotazione[input.id] = input.value;
      });
      prenotazione["posti"] = posti;
      socket.emit("postiSelezionati", prenotazione);
    } else {
      alert("inserisci nome cognome e numero di telefono.");
    }
  }
});

socket.on("postiOccupati", (postiOccupati) => {
  postiOccupati.forEach((p) => {
    document.getElementById(p).classList.remove("selected");
    document.getElementById(p).classList.add("occupied");
  });
});
