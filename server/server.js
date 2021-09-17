const path = require("path");
const express = require("express");

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { PORT } = require("./config.json");

app.use(express.static(path.join(__dirname, "../public")));

var postiOccupati = [];
var prenotazioni = [];

io.on("connection", (socket) => {
  console.log(`connected ${socket.handshake.address}`);

  socket.emit("postiOccupati", postiOccupati);

  socket.on("postiSelezionati", (prenotazione) => {
    for (let i = 0; i < prenotazione.posti.length; i++) {
      postiOccupati.push(prenotazione.posti[i]);
    }
    prenotazioni.push(prenotazione);
    /* console.log(prenotazioni); */
    io.emit("postiOccupati", postiOccupati);
  });

  socket.on("disconnect", () => {});
});
server.listen(PORT, () => {
  console.log(`working`);
});
