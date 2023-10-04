export const drawCardsPlayer = ( player ) => {
    const imgs = player.divCardsRef.querySelectorAll('img');

    player.cards.forEach((card, index) => {
        if (imgs[index]) return;

        const img = document.createElement('img');

        img.classList.add('card');
        img.src = player.isDealer && !index
            ? './public/assets/cards/red_back.png'
            : `./public/assets/cards/${ card }.png`;

        player.divCardsRef.append( img );
    });
}
