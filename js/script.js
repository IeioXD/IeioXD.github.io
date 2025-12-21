/**
 * ARCHIVO: script.js
 * Descripción: Control de carga y animaciones de entrada automáticas.
 */
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Esto es para que el botón también cambie visualmente (opcional)
    menuBtn.classList.toggle('is-active');
});
// 1. Función para activar las animaciones (la que probaste en consola)
function animateContent() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-load');
    elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('is-visible');
        }, index * 150); 
    });
}

// 2. Disparador Automático
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const statusPercent = document.getElementById('status-percent');

    // CASO A: Si existe el Loader (ej. en index o pantalla de carga)
    if (loader) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5; 
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    // IMPORTANTE: Llamar a la animación después de que el loader se va
                    animateContent(); 
                }, 500); 
            }
            if (statusPercent) statusPercent.innerText = progress;
        }, 100);
    } 
    // CASO B: Si NO existe el Loader (como en tu main.html actual)
    else {
        console.log("Sistema: No se detectó loader. Animando contenido directamente.");
        animateContent();
    }
});
// --- 3. EFECTO PARALAJE SUAVE ---
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Calculamos el desplazamiento basado en la posición del mouse
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    parallaxElements.forEach(el => {
        // Obtenemos la intensidad del movimiento desde un atributo data o usamos 1 por defecto
        const speed = el.getAttribute('data-speed') || 1;
        
        const xMove = x * speed;
        const yMove = y * speed;

        el.style.transform = `translateX(${xMove}px) translateY(${yMove}px)`;
    });
});