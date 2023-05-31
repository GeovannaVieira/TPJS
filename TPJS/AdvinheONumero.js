const targetNumber = Math.floor(Math.random() * 100) + 1;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const result = document.getElementById('result');

guessButton.addEventListener('click', function() {
    
    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        result.textContent = 'Por favor, insira um número válido.';
        return;
    }

    if (guess === targetNumber) {
        result.textContent = 'Parabéns! Você acertou!';
    } else if (guess < targetNumber) {
        result.textContent = 'Tente um número maior.';
    } else {
        result.textContent = 'Tente um número menor.';
    }
});