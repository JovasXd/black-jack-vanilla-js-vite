export const resetPlayers = (players) => {
    players.forEach(player => {
        !player.isDealer && player.divSpaceRef.classList.remove('current');
        player.cards = [];
        player.score = 0;
        player.divSpaceRef?.classList.remove('current', 'winner', 'loser');
        player.divCardsRef.innerHTML = '';
    });
}
