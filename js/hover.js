document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.grid-container');
    
    if (container) {
        // 1. Generar los cuadros dinámicamente
        const numItems = 700; 
        for (let i = 0; i < numItems; i++) {
            const item = document.createElement('div');
            item.classList.add('grid-item');
            container.appendChild(item);
        }

        // 2. Soporte para móviles (Touch)
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);

            if (element && element.classList.contains('grid-item')) {
                element.style.boxShadow = "0 0 15px var(--color-ciber)";
                element.style.zIndex = "5";
                element.style.setProperty('--after-bg', 'var(--color-ciber)');

                setTimeout(() => {
                    element.style.boxShadow = "";
                    element.style.zIndex = "1";
                    element.style.setProperty('--after-bg', 'var(--color-base)');
                }, 1000); 
            }
        }, { passive: true });
    }
});