export const configPlayer = (players, isDealer, config) => {
    const isDealerExists = players.at(-1)?.isDealer;
    const player = {
        ...config,
        isDealer,
        name: '',
        cards: [],
        score: 0
    };

    if (isDealer && isDealerExists) {
        throw new Error('Ya hay un dealer')
    }

    isDealerExists
        ? players.splice(-1, 0, player)
        : players.push( player );
}