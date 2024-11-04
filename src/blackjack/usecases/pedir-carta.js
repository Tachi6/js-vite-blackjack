
export const pedirCarta = (deck) => {
    if (deck.length === 0) {
        alert('No hay cartas en la baraja');
        return;
    }
    return deck.pop();
}
