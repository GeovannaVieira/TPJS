var gameForm = document.getElementById('Form');

gameForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var gameInput = document.getElementById('game');

    var isValid = true;

    if (!nameInput.value) {
        nameInput.classList.add('invalid');
        isValid = false;
    } else {
        nameInput.classList.remove('invalid');
    }

    if (!emailInput.value || !validateEmail(emailInput.value)) {
        emailInput.classList.add('invalid');
        isValid = false;
    } else {
        emailInput.classList.remove('invalid');
    }

    if (!gameInput.value) {
        gameInput.classList.add('invalid');
        isValid = false;
    } else {
        gameInput.classList.remove('invalid');
    }

    if (isValid) {
        alert('Formulário enviado com sucesso!');
        gameForm.reset();
    }
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}