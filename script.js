// Archivo: script.js (Mínimo necesario para generar los cuadros)

const container = document.querySelector('.grid-container');
const numItems = 500; // Suficientes cuadros para la cobertura

for (let i = 0; i < numItems; i++) {
    const item = document.createElement('div');
    item.classList.add('grid-item');
    container.appendChild(item);

}
// Detectar el deslizamiento táctil para iluminar la cuadrícula
document.addEventListener('touchmove', (e) => {
    // Obtenemos la posición del toque
    const touch = e.touches[0];
    // Buscamos qué elemento de la cuadrícula está en esa posición
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.classList.contains('grid-item')) {
        // Simulamos el hover añadiendo una clase temporal
        element.style.boxShadow = "0 0 15px var(--color-ciber)";
        element.style.zIndex = "5";
        
        // Accedemos al pseudo-elemento a través de una transición de color manual
        const inner = element; 
        inner.style.setProperty('--after-bg', 'var(--color-ciber)'); // Necesitarías un pequeño cambio en CSS si quieres cambiar el color del fondo interno exactamente igual

        // Limpiamos el efecto después de un momento (efecto estela)
        setTimeout(() => {
            element.style.boxShadow = "";
            element.style.zIndex = "1";
        }, 1000); // 1 segundo para que coincida con tu --transition-slow
    }
}, { passive: true });
