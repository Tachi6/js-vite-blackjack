// import {createDeck} from'./usecases/crear-deck'; importo unicamenta la funcion que he exportado. puedo importar varias cosas con ','.
// tb le puedo dar alias a las importaciones {crearDeck as crearNuevoDeck}. con {} coge las exportaciones manuales
// import cualquiernombre from'./usecases/crear-deck'; asi coge la exportacion por defecto
// import cualquiernombre, {miNombre} from'./usecases/crear-deck'; asi coge la exportacion por defecto y la manual
import Swal from 'sweetalert2';
import {pedirCarta, valorCarta, createDeck, mostrarCartas} from './usecases';

const miModulo = (() => {
  'use-strict'
  // Variables
  let deck = [];
  const types = ['C', 'D', 'H', 'S'];
  const specials = ['A', 'K', 'Q', 'J'];

  const cards = [...Array.from({length: 9}, (_, x) => x + 2), ...specials];

  let puntosJugadores = [];
  // Referencia de HTML
  const btnPedir = document.querySelector('#btnPedir');
  const btnDetener = document.querySelector('#btnDetener');
  const btnNuevo = document.querySelector('#btnNuevo');

  const divCartas = document.querySelectorAll('.div-cartas');

  const puntosJugadoresHTML = document.querySelectorAll('#puntosJugadoresHTML');
  
  // Esta funcion inicializa el juego.
  const inicializarJuego = (numJugadores = 2) => {
      deck = createDeck(cards, types);

      puntosJugadores = [];
      for (let i = 0; i < numJugadores; i++) {
          puntosJugadores.push(0);
          puntosJugadoresHTML[i].innerText = 0;
          divCartas[i].innerHTML = '';       
      }
      btnPedir.disabled = false;
      btnDetener.disabled = false;
  }
  
  // Obtener el valor de la carta. [0] primer jugador, [last] computadora

  // Acumular puntos
  const acumularPuntos = (carta, jugador) => {
      puntosJugadores[jugador] = puntosJugadores[jugador] + valorCarta(carta);
      puntosJugadoresHTML[jugador].innerText = puntosJugadores[jugador];
      return puntosJugadores[jugador];
  }

  // Mostrar cartas
  const mostrarCartas = (carta, jugador) => {
      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add('carta');
      divCartas[jugador].append(imgCarta);
  }

  // Determinar ganador
  const determinarGanador = () => {
      const [puntosMinimos, puntosComputadora] = puntosJugadores;

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

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
      let puntosComputadora = 0;
      do {
          const carta = pedirCarta(deck);
          puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
          mostrarCartas(carta, puntosJugadores.length -1);
      } while ((puntosJugadores[puntosJugadores.length -1] < puntosMinimos) && (puntosMinimos <= 21)); // LA computadora siempre va a ganr o empatar

      determinarGanador();
  }

  // Eventos
  // Hago un elemento de escucha de ese boton en este caso. primer argument es la accion, hay varios tipos,
  // el segundo es un callback, una funcion que se enat mandando como argumento
  btnPedir.addEventListener('click', () => {
      const carta = pedirCarta(deck);
      acumularPuntos(carta, 0);   
      mostrarCartas(carta, 0);

      if (puntosJugadores[0] > 21) {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugadores[0]);
      }
      if (puntosJugadores[0] === 21) {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugadores[0]);
      }
  }); 

  btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener('click', () => {
      inicializarJuego();
  });

  // SiEMPRE HA DE SER LO ULTIMO. ESTE RETORNO SERA LO UNICO VISIBLE Y PUBLICO FUERA DE ESTE MODULO
  return {
      nuevoJuego: inicializarJuego // mando la referencia a la funcion inicializarJuego con el nombre de nuevoJuego
  };
})();
