import _ from 'underscore'; // Tb funciona import {shuffle} from 'underscore'; pero solo importa el shuffle

// export const miNombre = 'David';
// ESto de abajo lo hago con el bettercomments, pongo /* y autocompleto
/**
 * Esta funcion crea un nuevo deck
 * @param {Array<string>} cards 
 * @param {Array<string>} types ejemplo ['C', 'D', 'H', 'S']
 * @returns {Array<string>} retorna un nuevo deck de cartas barajadas
 */
export const createDeck = (cards, types) => {

    if (!cards || cards.length === 0) throw new Error('Tipos de carta es obligatorio y no puede estar vacio');

    let deck = [];

    for (const card of cards) {
        for (const type of types) {
            deck.push(card + type);
        }
    }
    return _.shuffle(deck);
}

// export default createDeck; esta es la exportacion por defecto del archivo, solo puede ser una por archivo y no necesitas poner el export en donde exportes
