// Copy to Clipboard Functionality
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('¡Especificaciones copiadas al portapapeles: ' + text);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Simple console log to verify JS is running
console.log('Meshtastic Store Loaded');

// Add hover effect to table rows via JS (optional, CSS handles this but good for requirement "JS interaction")
const rows = document.querySelectorAll('tbody tr');
rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.transform = 'scale(1.01)';
        row.style.transition = 'transform 0.2s';
    });
    row.addEventListener('mouseleave', () => {
        row.style.transform = 'scale(1)';
    });
});
