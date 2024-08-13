const cards = document.querySelectorAll('.card');   //Selecciona todas las tarjetas
let cardsVolteadas = [];   //Array para almacenar las tarjetas volteadas
let paresArmados = 0;   //Contador de pares coincidentes
const totalPares = 6;   //Número total de pares en el juego

//Inicializa el juego
function jugar() {
    const numeros = generarNumeros();   //Genera los numeros para las tarjetas
    asignar(numeros);   //Asigna los numeros a las tarjetas

    //Para que cada tarjeta tenga el evento click asignado
    cards.forEach(card => {
        card.addEventListener('click', manejoDeClick);
    });
}

//Genera un array con numeros del 0 al 5, duplicados
function generarNumeros() {
    return [...Array(totalPares).keys(), ...Array(totalPares).keys()];
}

//Asigna numeros aleatorios a las tarjetas
function asignar(numeros) {
    mezclar(numeros).forEach((numero, index) => {
        cards[index].dataset.numero = numero;   //Asigna un numero a cada tarjeta
        cards[index].textContent = '';   //Asegura que el texto este vacio al inicio
    });
}

//Se mezcla el array usando el algoritmo de Fisher-Yates
function mezclar(array) {
    let currentIndex = array.length;   //Empieza de atras hacia adelante
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);   //Calcula el indice de manera random(devuelve entre 0 y 1, se multiplca por currentIndex, y se abtiene con floorla parte entera) 
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

//Maneja el clic en una tarjeta
function manejoDeClick() {
    voltear(this);   //Llama a voltear(cardClickeada)
}

//Voltea una card y verifica si hay coincidencias
function voltear(card) {
    if (cardsVolteadas.length < 2 && !card.classList.contains('volteada')) {
        card.classList.add('volteada');   //Le pone volteada a la card
        card.textContent = card.dataset.numero;   //Muestra el numero en la tarjeta
        cardsVolteadas.push(card);

        if (cardsVolteadas.length === 2) {
            checkMatch();   //Verifica si las dos tarjetas volteadas coinciden
        }
    }
}

//Verifica si las dos tarjetas volteadas coinciden
function checkMatch() {
    const [card1, card2] = cardsVolteadas;

    if (card1.dataset.numero === card2.dataset.numero) {
        card1.classList.add('match');
        card2.classList.add('match');
        paresArmados++;
        //Verifica si se encontraron todos los pares
        if (paresArmados === totalPares) {
            document.getElementById('mensaje').textContent = 'Felicidades!!! GANASTE!!!';
        }
    } else {
        //Si no coinciden, oculta los numeros despues de un tiempo dado
        setTimeout(() => {
            card1.classList.remove('volteada');
            card2.classList.remove('volteada');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
    cardsVolteadas = [];   //Resetea el array de tarjetas volteadas
}

//Reinicia el juego
function reiniciarJuego() {
    
    //Resetea todas las tarjetas
    cards.forEach(card => {
        card.classList.remove('volteada', 'match');
        card.textContent = '';
    });
    cardsVolteadas = [];
    paresArmados = 0;
    document.getElementById('mensaje').textContent = '';

    // Vuelve a inicializar el juego
    jugar();
}

// Inicializa el juego al cargar la página
jugar();

// Agrega el evento de clic al botón de reinicio
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);
