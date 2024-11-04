
export const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) // funcion is not a number. 
        ? (valor === 'A') ? 11 : 10 // Aqui los mando como numero por eso no hay que multiplicarlos
        : valor * 1; // al multiplicar por 1 lo transformo en numero
}
