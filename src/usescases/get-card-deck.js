export const getCardDeck = ( deck ) => {
    if (!deck.length) return;

    const [ card ] = deck.splice(-1, 1);

    return card;
}

export const getCardValue = ( card ) => {
    const value = card.slice(0, -1);

    return !isNaN(value)
        ? [ Number( value ) ]
        : value === 'A'
            ? [ 11, 1 ]
            : [ 10 ]
};

export const calculateScore = ( cards ) => {
    let score1 = 0;
    let score2 = 0;

    cards.forEach(card => {
        const [val1, val2] = getCardValue( card );

        score1 += val1;
        score2 += val2 || val1;
    });

    return score2 <= score1 && score1 <= 21
        ? score1
        : score2;
}
