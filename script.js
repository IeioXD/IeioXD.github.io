// Archivo: script.js (Mínimo necesario para generar los cuadros)

const container = document.querySelector('.grid-container');
const numItems = 500; // Suficientes cuadros para la cobertura

for (let i = 0; i < numItems; i++) {
    const item = document.createElement('div');
    item.classList.add('grid-item');
    container.appendChild(item);
}