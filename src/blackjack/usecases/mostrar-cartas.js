export const mostrarCartas = (carta, jugador) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartas[jugador].append(imgCarta);
}
