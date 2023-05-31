var cards = document.getElementsByClassName('card');
var flippedCards = [];
var numMatches = 0;

function flipCard() {
    if (!this.classList.contains('flipped') && flippedCards.length < 2) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    var card1 = flippedCards[0];
    var card2 = flippedCards[1];
    var back1 = card1.getAttribute('data-card');
    var back2 = card2.getAttribute('data-card');

    if (back1 === back2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        numMatches++;

        if (numMatches === cards.length / 2) {
            setTimeout(showGameComplete, 500);
        }
    } else {
        card1.classList.add('wrong');
        card2.classList.add('wrong');

        setTimeout(function () {
            card1.classList.remove('flipped', 'wrong');
            card2.classList.remove('flipped', 'wrong');
        }, 1000);
    }

    flippedCards = [];
}

function showGameComplete() {
    alert('Parabéns! Você completou o jogo!');
}

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard);
}
