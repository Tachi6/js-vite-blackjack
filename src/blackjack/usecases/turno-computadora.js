import { acumularPuntos, pedirCarta, mostrarCartas, valorCarta } from "./";

export const turnoComputadora = (puntosMinimos, deck) => {
    let puntosComputadora = 0;
    do {
        const carta = pedirCarta(deck);
        puntosComputadora = puntosComputadora + valorCarta(carta)
        // puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
        mostrarCartas(carta, puntosJugadores.length -1);
    } while ((puntosJugadores[puntosJugadores.length -1] < puntosMinimos) && (puntosMinimos <= 21)); // LA computadora siempre va a ganr o empatar

    determinarGanador(puntosMinimos, puntosComputadora);
}

const determinarGanador = (puntosMinimos, puntosComputadora) => {

    setTimeout(() => {
        (puntosMinimos === puntosComputadora)
            ? Swal.fire({
                icon: "question",
                title: "Nadie gana",
                text: "Juega de nuevo"
            })// alert('Empate')
            : (puntosMinimos > 21)
                ? Swal.fire({
                    icon: "error",
                    title: "Has perdido",
                    text: "Juega de nuevo"
                })
                : (puntosComputadora > 21)
                    ? Swal.fire({
                        title: "Has ganado",
                        text: "Eres muy bueno",
                        icon: "success"
                    })// alert('Ganaste')
                    : Swal.fire({
                        icon: "error",
                        title: "Has perdido",
                        text: "Vuelve a probar"
                    });
    }, 10);
}

