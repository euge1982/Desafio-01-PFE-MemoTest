const cards = document.querySelectorAll('.card'); // Selecciona todas las tarjetas
let flippedCards = []; // Array para almacenar las tarjetas volteadas
let matchedPairs = 0; // Contador de pares coincidentes
const totalPairs = 6; // Número total de pares en el juego

// Inicializa el juego
function initializeGame() {
    const numbers = generateNumbers(); // Genera los números para las tarjetas
    assignNumbersToCards(numbers); // Asigna los números a las tarjetas
    cards.forEach(card => {
        card.addEventListener('click', () => flipCard(card)); // Agrega el evento de clic a cada tarjeta
    });
}

// Genera un array con números del 0 al 5, duplicados
function generateNumbers() {
    return [...Array(totalPairs).keys(), ...Array(totalPairs).keys()];
}

// Asigna números aleatorios a las tarjetas
function assignNumbersToCards(numbers) {
    shuffle(numbers).forEach((number, index) => {
        cards[index].dataset.number = number; // Asigna un número a cada tarjeta
        cards[index].textContent = ''; // Asegúrate de que el texto esté vacío al inicio
    });
}

// Mezcla un array usando el algoritmo de Fisher-Yates
function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Voltea una tarjeta y verifica si hay coincidencias
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.textContent = card.dataset.number; // Muestra el número en la tarjeta
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch(); // Verifica si las dos tarjetas volteadas coinciden
        }
    }
}

// Verifica si las dos tarjetas volteadas coinciden
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.number === card2.dataset.number) {
        card1.classList.add('match');
        card2.classList.add('match');
        matchedPairs++;
        // Verifica si se han encontrado todos los pares
        if (matchedPairs === totalPairs) {
            
            document.getElementById('message').textContent = '¡Felicidades! Has completado el juego.';
        }
    } else {
        // Si no coinciden, oculta los números después de un breve retraso
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
    flippedCards = []; // Resetea el array de tarjetas volteadas
}

// Reinicia el juego
function restartGame() {
    flippedCards.forEach(card => {
        card.classList.remove('flipped', 'match');
        card.textContent = '';
    });
    flippedCards = [];
    matchedPairs = 0;
    initializeGame(); // Reinicia el juego
}

// Inicializa el juego al cargar la página
initializeGame();

// Agrega el evento de clic al botón de reinicio
document.getElementById('restart-button').addEventListener('click', restartGame);

