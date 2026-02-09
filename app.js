// ========================================
// Cuaca Nusantara - Indonesia Weather App
// Jawa & Sumatra Edition with Wind Tracking
// ========================================

// Location Data - Jawa & Sumatra
const locations = {
    // Jakarta
    'jakarta-pusat': { name: 'Jakarta Pusat', lat: -6.1862, lon: 106.8342, temp: 31, humidity: 75, wind: 12, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'jakarta-utara': { name: 'Jakarta Utara', lat: -6.1219, lon: 106.9285, temp: 32, humidity: 78, wind: 15, desc: 'Berawan', icon: 'cloudy' },
    'jakarta-selatan': { name: 'Jakarta Selatan', lat: -6.2615, lon: 106.8106, temp: 29, humidity: 80, wind: 8, desc: 'Hujan Ringan', icon: 'rain' },
    'jakarta-timur': { name: 'Jakarta Timur', lat: -6.2250, lon: 106.9004, temp: 30, humidity: 76, wind: 12, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'jakarta-barat': { name: 'Jakarta Barat', lat: -6.1352, lon: 106.7431, temp: 31, humidity: 74, wind: 11, desc: 'Cerah', icon: 'sunny' },
    // Jawa Barat
    'bandung': { name: 'Bandung', lat: -6.9175, lon: 107.6191, temp: 24, humidity: 85, wind: 8, desc: 'Hujan Ringan', icon: 'rain' },
    'bekasi': { name: 'Bekasi', lat: -6.2349, lon: 106.9896, temp: 32, humidity: 72, wind: 10, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'depok': { name: 'Depok', lat: -6.4025, lon: 106.7942, temp: 28, humidity: 82, wind: 7, desc: 'Hujan Ringan', icon: 'rain' },
    'bogor': { name: 'Bogor', lat: -6.5971, lon: 106.8060, temp: 26, humidity: 88, wind: 6, desc: 'Hujan Sedang', icon: 'heavy-rain' },
    // Banten
    'tangerang': { name: 'Tangerang', lat: -6.1783, lon: 106.6319, temp: 31, humidity: 73, wind: 13, desc: 'Berawan', icon: 'cloudy' },
    'serang': { name: 'Serang', lat: -6.1103, lon: 106.1640, temp: 30, humidity: 75, wind: 14, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    // Jawa Tengah
    'semarang': { name: 'Semarang', lat: -6.9666, lon: 110.4196, temp: 32, humidity: 70, wind: 15, desc: 'Cerah', icon: 'sunny' },
    'solo': { name: 'Solo', lat: -7.5755, lon: 110.8243, temp: 31, humidity: 72, wind: 10, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    // Jawa Timur
    'surabaya': { name: 'Surabaya', lat: -7.2575, lon: 112.7521, temp: 33, humidity: 68, wind: 18, desc: 'Cerah', icon: 'sunny' },
    'malang': { name: 'Malang', lat: -7.9666, lon: 112.6326, temp: 25, humidity: 80, wind: 8, desc: 'Berawan', icon: 'cloudy' },
    // Sumatra
    'medan': { name: 'Medan', lat: 3.5952, lon: 98.6722, temp: 30, humidity: 78, wind: 10, desc: 'Hujan Ringan', icon: 'rain' },
    'palembang': { name: 'Palembang', lat: -2.9761, lon: 104.7754, temp: 32, humidity: 75, wind: 8, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'padang': { name: 'Padang', lat: -0.9471, lon: 100.4172, temp: 28, humidity: 85, wind: 12, desc: 'Hujan Sedang', icon: 'heavy-rain' },
    'pekanbaru': { name: 'Pekanbaru', lat: 0.5071, lon: 101.4478, temp: 31, humidity: 80, wind: 6, desc: 'Berawan', icon: 'cloudy' },
    'lampung': { name: 'Bandar Lampung', lat: -5.3971, lon: 105.2668, temp: 29, humidity: 82, wind: 10, desc: 'Hujan Ringan', icon: 'rain' }
};

// Earthquake data
const earthquakes = [
    { lat: -4.12, lon: 101.45, mag: 5.2, location: 'Bengkulu', time: '14:30 WIB' },
    { lat: -6.8, lon: 107.5, mag: 4.5, location: 'Bandung', time: '12:15 WIB' },
    { lat: -7.5, lon: 110.4, mag: 3.8, location: 'Semarang', time: '10:22 WIB' },
    { lat: 0.5, lon: 101.4, mag: 4.2, location: 'Riau', time: '08:45 WIB' },
    { lat: -5.4, lon: 105.2, mag: 5.0, location: 'Lampung', time: '06:30 WIB' },
    { lat: 3.5, lon: 98.7, mag: 4.8, location: 'Medan', time: '04:15 WIB' },
    { lat: -7.8, lon: 112.0, mag: 4.0, location: 'Surabaya', time: '02:00 WIB' }
];

// Wind pattern data
const windPatterns = [
    { lat: -6.2, lon: 106.8, dir: 225, speed: 15, label: 'Jakarta' },
    { lat: -6.9, lon: 107.6, dir: 220, speed: 12, label: 'Bandung' },
    { lat: -7.0, lon: 110.4, dir: 230, speed: 18, label: 'Semarang' },
    { lat: -7.3, lon: 112.7, dir: 225, speed: 20, label: 'Surabaya' },
    { lat: 3.6, lon: 98.7, dir: 215, speed: 14, label: 'Medan' },
    { lat: -3.0, lon: 104.8, dir: 220, speed: 10, label: 'Palembang' },
    { lat: -0.9, lon: 100.4, dir: 210, speed: 16, label: 'Padang' },
    { lat: -5.4, lon: 105.3, dir: 230, speed: 12, label: 'Lampung' }
];

let selectedLocation = 'jakarta-pusat';
let weatherMap = null;
let windMap = null;
let earthquakeMap = null;

// Initialize App
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    setupNavigation();
    setupLocationSelector();
    updateWeatherDisplay();
}

// Landing Page Functions
function enterDashboard(section = 'weather') {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');

    // Initialize maps after dashboard is visible
    setTimeout(() => {
        initWeatherMap();
        initWindMap();
        initEarthquakeMap();

        if (section !== 'weather') {
            document.querySelector(`[data-section="${section}"]`).click();
        }
    }, 100);
}

function showLanding() {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('landingPage').style.display = 'block';
}

// Navigation
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.section;

            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(`${sectionId}-section`).classList.add('active');

            // Resize maps when section changes
            setTimeout(() => {
                if (sectionId === 'weather' && weatherMap) weatherMap.invalidateSize();
                if (sectionId === 'wind' && windMap) windMap.invalidateSize();
                if (sectionId === 'earthquake' && earthquakeMap) earthquakeMap.invalidateSize();
            }, 100);
        });
    });
}

// Location Selector
function setupLocationSelector() {
    const selector = document.getElementById('locationSelector');
    if (!selector) return;

    selector.addEventListener('change', (e) => {
        selectedLocation = e.target.value;
        updateWeatherDisplay();
        if (weatherMap) {
            const loc = locations[selectedLocation];
            weatherMap.setView([loc.lat, loc.lon], 8);
        }
    });
}

// Update Weather Display
function updateWeatherDisplay() {
    const loc = locations[selectedLocation];
    if (!loc) return;

    document.getElementById('weatherCity').textContent = loc.name;
    document.getElementById('weatherTemp').innerHTML = loc.temp + '<sup>°C</sup>';
    document.getElementById('weatherDesc').textContent = loc.desc;
    document.getElementById('statHumidity').textContent = loc.humidity + '%';
    document.getElementById('statWind').textContent = loc.wind + ' km/j';

    updateWeatherIcon(loc.icon);
}

// Weather Icons
function updateWeatherIcon(iconType) {
    const iconContainer = document.getElementById('weatherIconLarge');
    if (!iconContainer) return;

    const icons = {
        'sunny': `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="25" fill="#fbbf24"/><circle cx="48" cy="48" r="20" fill="#fde68a"/></svg>`,
        'partly-cloudy': `<svg viewBox="0 0 100 100"><circle cx="40" cy="40" r="20" fill="#fbbf24"/><circle cx="35" cy="38" r="16" fill="#fde68a"/><g fill="#f3f4f6"><ellipse cx="65" cy="60" rx="25" ry="18"/><ellipse cx="50" cy="65" rx="20" ry="15"/></g></svg>`,
        'cloudy': `<svg viewBox="0 0 100 100"><g fill="#9ca3af"><ellipse cx="50" cy="50" rx="35" ry="22"/><ellipse cx="30" cy="55" rx="25" ry="18"/></g></svg>`,
        'rain': `<svg viewBox="0 0 100 100"><g fill="#6b7280"><ellipse cx="50" cy="35" rx="30" ry="18"/><ellipse cx="30" cy="40" rx="22" ry="15"/></g><g stroke="#60a5fa" stroke-width="3"><line x1="35" y1="60" x2="30" y2="75"/><line x1="50" y1="60" x2="45" y2="75"/><line x1="65" y1="60" x2="60" y2="75"/></g></svg>`,
        'heavy-rain': `<svg viewBox="0 0 100 100"><g fill="#374151"><ellipse cx="50" cy="30" rx="35" ry="20"/><ellipse cx="25" cy="35" rx="25" ry="17"/></g><g stroke="#3b82f6" stroke-width="3"><line x1="25" y1="55" x2="18" y2="75"/><line x1="40" y1="55" x2="33" y2="75"/><line x1="55" y1="55" x2="48" y2="75"/><line x1="70" y1="55" x2="63" y2="75"/></g></svg>`,
        'thunderstorm': `<svg viewBox="0 0 100 100"><g fill="#1f2937"><ellipse cx="50" cy="25" rx="38" ry="20"/></g><path d="M55 45 L45 60 L55 60 L45 80" stroke="#fbbf24" stroke-width="4" fill="none"/></svg>`
    };
    iconContainer.innerHTML = icons[iconType] || icons['partly-cloudy'];
}

// Initialize Weather Map (Jawa & Sumatra)
function initWeatherMap() {
    const el = document.getElementById('weatherMap');
    if (!el || weatherMap) return;

    weatherMap = L.map('weatherMap', {
        center: [-2.5, 106],
        zoom: 5,
        zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CARTO',
        maxZoom: 19
    }).addTo(weatherMap);

    // Add markers for all locations
    Object.entries(locations).forEach(([key, loc]) => {
        const color = getWeatherColor(loc.icon);

        L.circleMarker([loc.lat, loc.lon], {
            radius: 10,
            fillColor: color,
            color: color,
            weight: 2,
            opacity: 1,
            fillOpacity: 0.6
        }).bindPopup(`
            <div style="font-family: 'Inter', sans-serif; padding: 8px; text-align: center;">
                <strong style="font-size: 14px; color: #6366f1;">${loc.name}</strong><br>
                <span style="font-size: 24px; font-weight: 700;">${loc.temp}°C</span><br>
                <span style="color: #a5b4fc;">${loc.desc}</span>
            </div>
        `).on('click', () => {
            document.getElementById('locationSelector').value = key;
            selectedLocation = key;
            updateWeatherDisplay();
        }).addTo(weatherMap);
    });
}

// Initialize Wind Map
function initWindMap() {
    const el = document.getElementById('windMap');
    if (!el || windMap) return;

    windMap = L.map('windMap', {
        center: [-2.5, 106],
        zoom: 5,
        zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CARTO',
        maxZoom: 19
    }).addTo(windMap);

    // Add wind arrows
    windPatterns.forEach(wp => {
        const arrowIcon = L.divIcon({
            className: 'wind-arrow',
            html: `<div style="
                font-size: 24px;
                transform: rotate(${wp.dir}deg);
                color: #a78bfa;
                text-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
            ">➤</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        L.marker([wp.lat, wp.lon], { icon: arrowIcon })
            .bindPopup(`
                <div style="font-family: 'Inter', sans-serif; padding: 8px;">
                    <strong style="color: #8b5cf6;">${wp.label}</strong><br>
                    <span>Kecepatan: ${wp.speed} km/j</span><br>
                    <span>Arah: ${getWindDirection(wp.dir)}</span>
                </div>
            `)
            .addTo(windMap);
    });

    // Add monsoon indicator
    L.polyline([
        [10, 90], [-10, 115]
    ], {
        color: '#8b5cf6',
        weight: 3,
        opacity: 0.5,
        dashArray: '10, 10'
    }).addTo(windMap);
}

function getWindDirection(deg) {
    const dirs = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
    return dirs[Math.round(deg / 45) % 8];
}

// Initialize Earthquake Map
function initEarthquakeMap() {
    const el = document.getElementById('earthquakeMap');
    if (!el || earthquakeMap) return;

    earthquakeMap = L.map('earthquakeMap', {
        center: [-2.5, 106],
        zoom: 5,
        zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CARTO',
        maxZoom: 19
    }).addTo(earthquakeMap);

    // Add earthquake markers
    earthquakes.forEach((eq, index) => {
        const color = eq.mag >= 5 ? '#ef4444' : eq.mag >= 4 ? '#f59e0b' : '#10b981';

        L.circleMarker([eq.lat, eq.lon], {
            radius: Math.max(8, eq.mag * 4),
            fillColor: color,
            color: color,
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.4
        }).bindPopup(`
            <div style="font-family: 'Inter', sans-serif; padding: 8px;">
                <strong style="font-size: 16px;">M${eq.mag}</strong><br>
                <span>${eq.location}</span><br>
                <span style="color: #94a3b8; font-size: 12px;">${eq.time}</span>
            </div>
        `).addTo(earthquakeMap);

        // Pulse for latest earthquake
        if (index === 0) {
            const pulseIcon = L.divIcon({
                className: 'pulse-marker',
                html: `<div style="width: 20px; height: 20px; background: #ef4444; border-radius: 50%; animation: pulse-ring 1.5s infinite;"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            L.marker([eq.lat, eq.lon], { icon: pulseIcon }).addTo(earthquakeMap);
        }
    });
}

function getWeatherColor(icon) {
    const colors = {
        'sunny': '#fbbf24',
        'partly-cloudy': '#a78bfa',
        'cloudy': '#9ca3af',
        'rain': '#60a5fa',
        'heavy-rain': '#3b82f6',
        'thunderstorm': '#8b5cf6'
    };
    return colors[icon] || '#a78bfa';
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-ring {
        0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);
