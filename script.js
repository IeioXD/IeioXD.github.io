/**
 * ARCHIVO: script.js
 * Descripción: Control de rejilla interactiva (Mouse y Touch), 
 * Loader con audio, animaciones de entrada y efecto Matrix.
 */

// 1. GENERACIÓN DE LA REJILLA
const container = document.querySelector('.grid-container');
if (container) {
    const numItems = 700; 
    for (let i = 0; i < numItems; i++) {
        const item = document.createElement('div');
        item.classList.add('grid-item');
        container.appendChild(item);
    }
}
function generarRejilla() {
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        gridContainer.innerHTML = ''; // Limpia cualquier residuo
        const numItems = 700; 
        for (let i = 0; i < numItems; i++) {
            const item = document.createElement('div');
            item.classList.add('grid-item');
            gridContainer.appendChild(item);
        }
        console.log("Rejilla generada con 700 ítems");
    }
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', generarRejilla);
// 2. INTERACTIVIDAD TÁCTIL (Para iluminación al deslizar en móviles)
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    // Detecta qué elemento está bajo el dedo
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.classList.contains('grid-item')) {
        // Aplicamos brillo y color de fondo dinámico
        element.style.boxShadow = "0 0 15px var(--color-ciber)";
        element.style.zIndex = "5";
        element.style.setProperty('--after-bg', 'var(--color-ciber)');

        // Efecto estela: se apaga lentamente tras 1 segundo
        setTimeout(() => {
            element.style.boxShadow = "";
            element.style.zIndex = "1";
            element.style.setProperty('--after-bg', 'var(--color-base)');
        }, 1000); 
    }
}, { passive: true });

// 3. LÓGICA DEL LOADER (Solo en main.html)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const statusPercent = document.getElementById('status-percent');
    const bootAudio = document.getElementById('boot-audio');
    let progress = 0;

    if (loader) {
        // Intentar reproducir sonido de arranque
        if (bootAudio) {
            bootAudio.volume = 0.5;
            bootAudio.play().catch(() => console.log("Audio en espera de interacción."));
        }

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5; 
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    if (bootAudio) {
                        bootAudio.pause();
                        bootAudio.currentTime = 0;
                    }
                    // Activa animaciones de entrada
                    animateContent(); 
                }, 500); 
            }
            if (statusPercent) statusPercent.innerText = progress;
        }, 100);
    } else {
        // Si no hay loader, animar contenido directamente
        animateContent();
    }
});

// 4. FUNCIÓN DE ANIMACIÓN DE ENTRADA
function animateContent() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-load');
    elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('is-visible');
        }, index * 100); // Aparecen uno tras otro
    });
}

// 5. EFECTO MATRIX (Especial para demostrar músculo técnico en About)
function getRandomCodeString(length) {
    const chars = '01F.TXYZ{}+_'; 
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const techMatrix = document.getElementById('tech-matrix');
if (techMatrix) {
    const matrixLines = 25; 

    for (let i = 0; i < matrixLines; i++) {
        const line = document.createElement('div');
        line.classList.add('matrix-line');
        line.innerText = getRandomCodeString(Math.floor(Math.random() * 15) + 5);
        
        line.style.left = `${Math.random() * 95}%`; 
        line.style.animationDelay = `${Math.random() * -5}s`; 
        line.style.fontSize = `${Math.random() * 0.4 + 0.7}em`; 

        techMatrix.appendChild(line);
    }

    // Actualización dinámica de caracteres
    setInterval(() => {
        const lines = techMatrix.querySelectorAll('.matrix-line');
        lines.forEach(line => {
            if (Math.random() < 0.15) { 
                line.innerText = getRandomCodeString(Math.floor(Math.random() * 15) + 5);
            }
        });
    }, 300);
}
