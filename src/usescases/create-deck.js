export const createDeck = (suits, cards) => {
    const deck = [];

    suits.forEach(suit => {
        cards.forEach((card) => {
            deck.push(`${ card }${ suit }`);
        });
    });

    return deck.sort(() => Math.random() - 0.5);
}

export const createDeckImgs = (deck) => {
    return deck.map(() => {
        const img = document.createElement('img');

        img.src = './public/assets/cards/red_back.png';
        img.classList.add('card');

        return img;
    })
}