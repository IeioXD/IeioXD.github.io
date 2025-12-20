const rotatingConfig = {
    texts: ['Aparecer en Google', 'Vender mas', 'Ubicarse Facil', 'Vender en linea', 'Modernizarse', 'Crecer rapido'],
    staggerDuration: 25, 
    rotationInterval: 3000, 
};

const container = document.getElementById('rotating-text');
let currentIndex = 0;

// Dentro de getNewWidth en main.js
function getNewWidth(text) {
    const fakeSpan = document.createElement('span');
    fakeSpan.style.visibility = 'hidden';
    fakeSpan.style.position = 'absolute';
    fakeSpan.style.whiteSpace = 'nowrap';
    
    // Es vital copiar exactamente estos estilos para que el cálculo sea real
    const style = window.getComputedStyle(container);
    fakeSpan.style.fontSize = style.fontSize;
    fakeSpan.style.fontWeight = style.fontWeight;
    fakeSpan.style.fontFamily = style.fontFamily;
    fakeSpan.style.letterSpacing = style.letterSpacing;
    
    fakeSpan.innerText = text;
    document.body.appendChild(fakeSpan);
    
    // Calculamos el ancho + el padding dinámico
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const width = fakeSpan.offsetWidth + padding;
    
    document.body.removeChild(fakeSpan);
    return width;
}

function renderWord(text) {
    const newWidth = getNewWidth(text);
    container.style.width = `${newWidth}px`;

    container.innerHTML = '';
    const chars = [...text];
    
    chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'text-rotate-element';
        
        const delay = (chars.length - 1 - i) * rotatingConfig.staggerDuration;
        span.style.transitionDelay = `${delay}ms`;
        
        container.appendChild(span);
        requestAnimationFrame(() => {
            setTimeout(() => span.classList.add('active'), 50);
        });
    });
}

function rotate() {
    const currentSpans = container.querySelectorAll('.text-rotate-element');
    
    currentSpans.forEach((span, i) => {
        const delay = (currentSpans.length - 1 - i) * rotatingConfig.staggerDuration;
        span.style.transitionDelay = `${delay}ms`;
        span.classList.remove('active');
        span.classList.add('exit');
    });

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % rotatingConfig.texts.length;
        renderWord(rotatingConfig.texts[currentIndex]);
    }, 500); 
}

window.addEventListener('resize', () => {
    const currentText = rotatingConfig.texts[currentIndex];
    container.style.width = `${getNewWidth(currentText)}px`;
});

// Inicialización
// Forzamos un ancho inicial para que la primera transición funcione
container.style.width = `${getNewWidth(rotatingConfig.texts[0])}px`;
renderWord(rotatingConfig.texts[currentIndex]);
setInterval(rotate, rotatingConfig.rotationInterval);
