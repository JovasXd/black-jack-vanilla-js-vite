import { configPlayer } from './usescases/config-players';
import { createDeck, createDeckImgs } from './usescases/create-deck';
import { createPlayerInput, createPlayerSpace } from './usescases/create-player-elements';
import { defineWinners } from './usescases/define-winners';
import { drawCardsPlayer } from './usescases/draw-cards-player';
import { calculateScore, getCardDeck } from './usescases/get-card-deck';
import { resetPlayers } from './usescases/reset-players';

const btnNewGame = document.querySelector('#btnNewGame');
const btnConfPlayers = document.querySelector('#btnConfPlayers');
const containerDeck = document.querySelector('#deck');
const dealerSpace = document.querySelector('#dealerSpace');
const containerPlayers = document.querySelector('#players');
const playersModal = document.querySelector('#players-modal');
const playersInputs = document.querySelector('#players-inputs');
const btnAddPlayer = document.querySelector('#btnAddPlayer');
const btnCloseModal = document.querySelector('#btnCloseModal');

const numbers = new Array(9).fill().map((_, i) => i + 2);
const suits = ['S', 'H', 'C', 'D'];
const cards = ['A', ...numbers, 'J', 'Q', 'K'];

let deck = [];
let deckImgs = [];
let players = [];
let playerTurn = -1;
let wasNotPlayers = false;

const toggleModal = () => {
    playersModal.classList.toggle('show');
}

const closeModal = () => {
    toggleModal();
    players.length && wasNotPlayers && startNewGame();
}

const addPlayer = () => {
    const idPlayer = new Date().getTime();
    const { divInput } = createPlayerInput(idPlayer, players.length + 1, setPlayerName, deletePlayer);
    const { divSpace, h4Player, divCards } = createPlayerSpace(idPlayer, getCard, stopCard);

    configPlayer(players, false, {
        inputRef: divInput,
        divSpaceRef: divSpace,
        h4PlayerRef: h4Player,
        divCardsRef: divCards,
        id: idPlayer,
    })

    playersInputs.append( divInput );
    containerPlayers.append( divSpace );
}

const setPlayerName = (idPlayer, namePlayer) => {
    const player = players.find(p => p.id === idPlayer);

    player.h4PlayerRef.innerText = namePlayer;
    player.name = namePlayer;
}

const deletePlayer = (idPlayer) => {
    const index = players.findIndex(p => p.id === idPlayer)

    players[index].inputRef.remove();
    players[index].divSpaceRef.remove();
    players.splice(index, 1);
}

const configDealer = () => {
    if (players.at(-1).isDealer) return;

    const idPlayer = new Date().getTime();
    const h4 = document.createElement('h4');
    const div = document.createElement('div');

    h4.classList.add('head');
    div.classList.add('body');

    configPlayer(players, true, {
        inputRef: null,
        divSpaceRef: null,
        h4PlayerRef: h4,
        divCardsRef: div,
        id: idPlayer,
    })

    dealerSpace.append(h4, div);
    setPlayerName(idPlayer, 'Dealer');
}

const getCard = (idPlayer) => {
    const player = players.find(p => p.id === idPlayer);

    setCardPlayer( player );
    if (player.score >= 21) nextPlayer();
}

const stopCard = () => {
    nextPlayer();
}

const setCardPlayer = (player) => {
    const card = getCardDeck(deck);

    player.cards.push( card );
    player.score = calculateScore( player.cards );

    removeCardDeck();
    drawCardsPlayer( player );
}

const removeCardDeck = () => {
    const [ deckImg ] = deckImgs.splice(-1, 1);

    deckImg.remove();
}

const startDistribution = async () => {
    const iterators = players.length * 2;

    for (let i = 0; i < iterators; i++) {
        await new Promise(resolve => setTimeout(() => resolve(), 500));

        const player = players[i] || players[i - players.length];

        setCardPlayer( player );
    }
}

const showDealerCard = (dealer) => {
    const img = dealer.divCardsRef.querySelector('img');
    img.src = `./assets/cards/${ dealer.cards[0] }.png`;
}

const isDealerTurn = () => {
    const dealer = players.at(-1);
    showDealerCard(dealer);
    
    do {
        const nextCard = deck.at(-1);
        const nextScore = calculateScore([ ...dealer.cards, nextCard ]);
        
        if (nextScore > 21) break;

        setCardPlayer( dealer );
    } while (dealer.score >= 21);

    defineWinners( players, startRound );
}

const nextPlayer = () => {
    players[playerTurn]?.divSpaceRef?.classList.remove('current');
    playerTurn++;
    players[playerTurn]?.divSpaceRef?.classList.add('current');
    players[playerTurn].isDealer && isDealerTurn();
}

const startRound = async () => {
    playerTurn = -1;
    resetPlayers( players );
    await startDistribution();
    nextPlayer();
}

const startNewGame = async () => {
    wasNotPlayers = !players.length;
    if (wasNotPlayers) return toggleModal();
    if (!players.at(-1).isDealer) configDealer();

    deck = createDeck( suits, cards );
    deckImgs = createDeckImgs( deck );
    containerDeck.innerHTML = '';
    containerDeck.append( ...deckImgs );
    configDealer();
    startRound();
}

btnNewGame.addEventListener('click', startNewGame);
btnConfPlayers.addEventListener('click', toggleModal);
btnCloseModal.addEventListener('click', closeModal);
btnAddPlayer.addEventListener('click', addPlayer);
