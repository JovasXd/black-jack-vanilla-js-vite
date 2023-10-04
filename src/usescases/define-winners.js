export const defineWinners = ( players, cb ) => {
    const dealerScore = players.at(-1).score;

    for (let i = 0; i < players.length - 1; i++) {
        players[i].divSpaceRef.classList.add(
            players[i].score > dealerScore && players[i].score <= 21
                ? 'winner'
                : 'loser'
        );
    }

    setTimeout(() => {
        cb();
    }, 5000);
}