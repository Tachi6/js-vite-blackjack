export const acumularPuntos = (carta, jugador) => {
    puntosJugadores[jugador] = puntosJugadores[jugador] + valorCarta(carta);
    puntosJugadoresHTML[jugador].innerText = puntosJugadores[jugador];
    return puntosJugadores[jugador];
}
