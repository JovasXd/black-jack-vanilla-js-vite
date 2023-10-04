/**
 * Crea la estructura HTML para el input del jugador
 * @param {Number} idPlayer - ID del jugador
 * @param {Number} playerNumber - Numero del jugador
 * @param {Function} inputListener - Evento input en input
 * @param {Function} clickListener - Evento click in button
 * @returns {Object<HTMLElement>} { div, input, button }
 */

export const createPlayerInput = ( idPlayer, playerNumber, inputListener, clickListener ) => {
    // <div class="player-input mb-1">
    //     <input type="text" placeholder="Nombre del jugador - 1">
    //     <button class="btn-danger">-</button>
    // </div>

    const div = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');

    div.classList.add('player-input', 'mb-1');
    input.type = 'text';
    input.placeholder = `Nombre del jugador - ${ playerNumber }`;
    button.classList.add('btn-danger');
    button.innerText = '-';

    inputListener && input.addEventListener('input', (evt) => inputListener(idPlayer, evt.target.value))
    clickListener && button.addEventListener('click', () => clickListener(idPlayer))

    div.append(input, button);

    return {
        divInput: div
    };
}


/**
 * 
 * @param {Number} idPlayer - ID del jugador
 * @param {Function} clickListener1 - Event listener del boton primario
 * @param {Function} clickListener2 - Event listener del boton secondario
 * @returns {Object<HTMLElement>} { divSpace, h4Player }
 */

export const createPlayerSpace = (idPlayer, clickListener1, clickListener2) => {
    // <div class="player box current">
    //     <h4 class="head mb-1">Player Name 1</h4>
    //     <div class="actions mb-2">
    //         <button id="btnGetCard" class="btn-secondary">
    //             Pedir carta
    //         </button>
    //         <button id="btnStopCard" class="btn-info">
    //             Detenerme
    //         </button>
    //     </div>
    //     <div id="player-cards" class="body">
    //         <img class="card" src="./assets/cards/10C.png" alt="card">
    //         <img class="card" src="./assets/cards/4C.png" alt="card">
    //     </div>
    // </div>

    const divContainer = document.createElement('div');
    const h4PlayerName = document.createElement('h4');
    const divButtons = document.createElement('div');
    const btnGetCard = document.createElement('button');
    const btnStopCard = document.createElement('button');
    const divCards = document.createElement('div');

    divContainer.classList.add('player', 'box');
    h4PlayerName.classList.add('head', 'mb-1');
    divButtons.classList.add('actions', 'mb-2');
    btnGetCard.classList.add('btn-secondary');
    btnGetCard.innerText = 'Pedir carta';
    btnStopCard.classList.add('btn-info');
    btnStopCard.innerText = 'Detenerme';
    divCards.classList.add('body');

    clickListener1 && btnGetCard.addEventListener('click', () => clickListener1(idPlayer))
    clickListener2 && btnStopCard.addEventListener('click', () => clickListener2(idPlayer))

    divContainer.append(h4PlayerName, divButtons, divCards);
    divButtons.append(btnGetCard, btnStopCard);

    return {
        divSpace: divContainer,
        h4Player: h4PlayerName,
        divCards
    }
}
