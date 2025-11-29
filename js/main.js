// Copy to Clipboard Functionality
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Especificaciones copiadas: ' + text);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Weather and Time Widget
async function fetchWeatherAndTime() {
    const cities = [
        {
            id: 'bogota',
            lat: 4.6097,
            lon: -74.0817,
            timezone: 'America/Bogota'
        },
        {
            id: 'santiago',
            lat: -33.4569,
            lon: -70.6483,
            timezone: 'America/Santiago'
        }
    ];

    for (const city of cities) {
        // Update Time immediately and set interval
        updateTime(city.id, city.timezone);
        setInterval(() => updateTime(city.id, city.timezone), 60000);

        // Fetch Weather
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
            const data = await response.json();
            const temp = Math.round(data.current_weather.temperature);
            const tempElement = document.getElementById(`temp-${city.id}`);
            if (tempElement) {
                tempElement.textContent = `${temp}°C`;
            }
        } catch (error) {
            console.error(`Error fetching weather for ${city.id}:`, error);
            const tempElement = document.getElementById(`temp-${city.id}`);
            if (tempElement) tempElement.textContent = 'N/A';
        }
    }
}

function updateTime(cityId, timezone) {
    const timeElement = document.getElementById(`time-${cityId}`);
    if (timeElement) {
        const now = new Date();
        const timeString = new Intl.DateTimeFormat('es-ES', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(now);
        timeElement.textContent = timeString;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Only run on index page where elements exist
    if (document.getElementById('regional-info')) {
        fetchWeatherAndTime();
    }
});

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
