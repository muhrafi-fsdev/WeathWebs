// ========================================
// Cuaca Nusantara - Indonesia Weather App
// JABODETABEK Edition
// ========================================

// JABODETABEK Location Data
const jabodetabekLocations = {
    'jakarta-pusat': { name: 'Jakarta Pusat', lat: -6.1862, lon: 106.8342, temp: 31, humidity: 75, wind: 10, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'jakarta-utara': { name: 'Jakarta Utara', lat: -6.1219, lon: 106.9285, temp: 32, humidity: 78, wind: 15, desc: 'Berawan', icon: 'cloudy' },
    'jakarta-selatan': { name: 'Jakarta Selatan', lat: -6.2615, lon: 106.8106, temp: 29, humidity: 80, wind: 8, desc: 'Hujan Ringan', icon: 'rain' },
    'jakarta-timur': { name: 'Jakarta Timur', lat: -6.2250, lon: 106.9004, temp: 30, humidity: 76, wind: 12, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'jakarta-barat': { name: 'Jakarta Barat', lat: -6.1352, lon: 106.7431, temp: 31, humidity: 74, wind: 11, desc: 'Cerah', icon: 'sunny' },
    'bekasi-kota': { name: 'Bekasi Kota', lat: -6.2349, lon: 106.9896, temp: 32, humidity: 72, wind: 9, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'bekasi-utara': { name: 'Bekasi Utara', lat: -6.1683, lon: 107.0220, temp: 33, humidity: 70, wind: 14, desc: 'Cerah', icon: 'sunny' },
    'depok': { name: 'Depok', lat: -6.4025, lon: 106.7942, temp: 28, humidity: 82, wind: 7, desc: 'Hujan Ringan', icon: 'rain' },
    'tangerang-kota': { name: 'Tangerang Kota', lat: -6.1783, lon: 106.6319, temp: 31, humidity: 73, wind: 13, desc: 'Berawan', icon: 'cloudy' },
    'tangerang-selatan': { name: 'Tangerang Selatan', lat: -6.2894, lon: 106.7108, temp: 29, humidity: 79, wind: 10, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'bogor-kota': { name: 'Bogor Kota', lat: -6.5971, lon: 106.8060, temp: 26, humidity: 88, wind: 6, desc: 'Hujan Sedang', icon: 'heavy-rain' },
    'bogor-kabupaten': { name: 'Bogor Kabupaten', lat: -6.6500, lon: 106.8167, temp: 25, humidity: 90, wind: 5, desc: 'Hujan Petir', icon: 'thunderstorm' }
};

let selectedLocation = 'jakarta-pusat';
let weatherMap = null;
let locationMarkers = {};

// Initialize App
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    setupNavigation();
    initMap();
    initWeatherMap();
    setupLocationSelector();
    updateWeatherDisplay();
    updateTime();
    setInterval(updateTime, 60000);
}

// Setup Location Selector
function setupLocationSelector() {
    const selector = document.getElementById('locationSelector');
    if (!selector) return;
    
    selector.addEventListener('change', (e) => {
        selectedLocation = e.target.value;
        updateWeatherDisplay();
        updateWeatherMapMarkers();
    });
}

// Update Weather Display
function updateWeatherDisplay() {
    const loc = jabodetabekLocations[selectedLocation];
    if (!loc) return;
    
    // Update hero section
    document.getElementById('weatherCity').textContent = loc.name + ', Jawa Barat';
    document.getElementById('weatherTemp').innerHTML = loc.temp + '<sup>°C</sup>';
    document.getElementById('weatherDesc').textContent = loc.desc;
    
    // Update stats
    document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = loc.humidity + '%';
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = loc.wind + ' km/j';
    
    // Update weather icon
    updateWeatherIcon(loc.icon);
    
    // Center weather map on selected location
    if (weatherMap) {
        weatherMap.setView([loc.lat, loc.lon], 11);
    }
}

// Update Weather Icon
function updateWeatherIcon(iconType) {
    const iconContainer = document.getElementById('weatherIconLarge');
    const icons = {
        'sunny': `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="25" fill="#fbbf24"/><circle cx="48" cy="48" r="20" fill="#fde68a"/></svg>`,
        'partly-cloudy': `<svg viewBox="0 0 100 100"><circle cx="40" cy="40" r="20" fill="#fbbf24"/><circle cx="35" cy="38" r="16" fill="#fde68a"/><g fill="#f3f4f6"><ellipse cx="65" cy="60" rx="25" ry="18"/><ellipse cx="50" cy="65" rx="20" ry="15"/><ellipse cx="75" cy="65" rx="15" ry="12"/></g></svg>`,
        'cloudy': `<svg viewBox="0 0 100 100"><g fill="#9ca3af"><ellipse cx="50" cy="50" rx="35" ry="22"/><ellipse cx="30" cy="55" rx="25" ry="18"/><ellipse cx="70" cy="55" rx="20" ry="15"/></g></svg>`,
        'rain': `<svg viewBox="0 0 100 100"><g fill="#6b7280"><ellipse cx="50" cy="35" rx="30" ry="18"/><ellipse cx="30" cy="40" rx="22" ry="15"/><ellipse cx="70" cy="40" rx="18" ry="12"/></g><g stroke="#60a5fa" stroke-width="3" stroke-linecap="round"><line x1="35" y1="60" x2="30" y2="75"/><line x1="50" y1="60" x2="45" y2="75"/><line x1="65" y1="60" x2="60" y2="75"/></g></svg>`,
        'heavy-rain': `<svg viewBox="0 0 100 100"><g fill="#374151"><ellipse cx="50" cy="30" rx="35" ry="20"/><ellipse cx="25" cy="35" rx="25" ry="17"/><ellipse cx="75" cy="35" rx="20" ry="14"/></g><g stroke="#3b82f6" stroke-width="3" stroke-linecap="round"><line x1="25" y1="55" x2="18" y2="75"/><line x1="40" y1="55" x2="33" y2="75"/><line x1="55" y1="55" x2="48" y2="75"/><line x1="70" y1="55" x2="63" y2="75"/></g></svg>`,
        'thunderstorm': `<svg viewBox="0 0 100 100"><g fill="#1f2937"><ellipse cx="50" cy="25" rx="38" ry="20"/><ellipse cx="20" cy="30" rx="25" ry="17"/><ellipse cx="80" cy="30" rx="22" ry="15"/></g><path d="M55 45 L45 60 L55 60 L45 80" stroke="#fbbf24" stroke-width="4" fill="none"/><g stroke="#60a5fa" stroke-width="2"><line x1="25" y1="50" x2="20" y2="65"/><line x1="75" y1="50" x2="70" y2="65"/></g></svg>`
    };
    iconContainer.innerHTML = icons[iconType] || icons['partly-cloudy'];
}

// Initialize Weather Map for JABODETABEK
function initWeatherMap() {
    const mapElement = document.getElementById('weatherMap');
    if (!mapElement) return;
    
    weatherMap = L.map('weatherMap', {
        center: [-6.2088, 106.8456],
        zoom: 10,
        zoomControl: true
    });
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(weatherMap);
    
    // Add markers for all JABODETABEK locations
    Object.entries(jabodetabekLocations).forEach(([key, loc]) => {
        const isSelected = key === selectedLocation;
        const markerColor = getWeatherColor(loc.icon);
        
        const marker = L.circleMarker([loc.lat, loc.lon], {
            radius: isSelected ? 14 : 10,
            fillColor: markerColor,
            color: isSelected ? '#fff' : markerColor,
            weight: isSelected ? 3 : 2,
            opacity: 1,
            fillOpacity: 0.7
        }).addTo(weatherMap);
        
        marker.bindPopup(`
            <div style="font-family: 'Outfit', sans-serif; padding: 8px; text-align: center;">
                <strong style="font-size: 14px; color: #8b5cf6;">${loc.name}</strong><br>
                <span style="font-size: 24px; font-weight: 700;">${loc.temp}°C</span><br>
                <span style="color: #a78bfa;">${loc.desc}</span>
            </div>
        `);
        
        marker.on('click', () => {
            document.getElementById('locationSelector').value = key;
            selectedLocation = key;
            updateWeatherDisplay();
            updateWeatherMapMarkers();
        });
        
        locationMarkers[key] = marker;
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

function updateWeatherMapMarkers() {
    Object.entries(locationMarkers).forEach(([key, marker]) => {
        const loc = jabodetabekLocations[key];
        const isSelected = key === selectedLocation;
        const markerColor = getWeatherColor(loc.icon);
        
        marker.setStyle({
            radius: isSelected ? 14 : 10,
            color: isSelected ? '#fff' : markerColor,
            weight: isSelected ? 3 : 2
        });
    });
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
            
            document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
            document.querySelector(`.tag:nth-child(${getTagIndex(sectionId)})`).classList.add('active');
            
            if (sectionId === 'earthquake') {
                setTimeout(() => { if (window.earthquakeMap) window.earthquakeMap.invalidateSize(); }, 100);
            }
            if (sectionId === 'weather') {
                setTimeout(() => { if (weatherMap) weatherMap.invalidateSize(); }, 100);
            }
        });
    });
    
    document.querySelectorAll('.tag').forEach((tag, index) => {
        tag.addEventListener('click', () => {
            document.querySelectorAll('.nav-item')[index].click();
        });
    });
}

function getTagIndex(section) {
    const map = { weather: 1, earthquake: 2, maritime: 3, alerts: 4 };
    return map[section] || 1;
}

// Initialize Earthquake Map
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    try {
        window.earthquakeMap = L.map('map', { center: [-2.5, 118], zoom: 4, zoomControl: true });
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap, © CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(window.earthquakeMap);
        
        const earthquakes = [
            { lat: -4.12, lon: 101.45, mag: 5.2, location: 'Bengkulu' },
            { lat: 1.5, lon: 125.3, mag: 4.8, location: 'Bitung' },
            { lat: -8.2, lon: 111.1, mag: 3.9, location: 'Pacitan' },
            { lat: -5.8, lon: 132.5, mag: 6.1, location: 'Maluku Tenggara' },
            { lat: 3.5, lon: 126.5, mag: 5.0, location: 'Melonguane' }
        ];
        
        earthquakes.forEach(eq => {
            const color = eq.mag >= 6 ? '#ef4444' : eq.mag >= 4 ? '#f59e0b' : '#10b981';
            L.circleMarker([eq.lat, eq.lon], {
                radius: Math.max(8, eq.mag * 4),
                fillColor: color, color: color, weight: 2, opacity: 0.8, fillOpacity: 0.4
            }).bindPopup(`<div style="font-family: 'Outfit', sans-serif; padding: 5px;"><strong style="font-size: 14px;">M${eq.mag}</strong><br><span style="color: #666;">${eq.location}</span></div>`).addTo(window.earthquakeMap);
        });
        
        const pulseIcon = L.divIcon({
            className: 'pulse-marker',
            html: `<div style="width: 20px; height: 20px; background: #ef4444; border-radius: 50%; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;"></div>`,
            iconSize: [20, 20], iconAnchor: [10, 10]
        });
        
        L.marker([-4.12, 101.45], { icon: pulseIcon }).bindPopup('<strong>GEMPA TERBARU</strong><br>M5.2 - Bengkulu').addTo(window.earthquakeMap);
    } catch (error) {
        console.error('Map initialization error:', error);
    }
}

// Update Time
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const statusTime = document.querySelector('.status-time');
    if (statusTime) statusTime.textContent = `Terakhir update: ${timeStr}`;
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-ring {
        0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
    .leaflet-popup-content-wrapper { background: #1a1230 !important; color: white !important; border-radius: 12px !important; box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important; }
    .leaflet-popup-tip { background: #1a1230 !important; }
    .leaflet-control-zoom a { background: #1a1230 !important; color: white !important; border-color: rgba(139, 92, 246, 0.2) !important; }
    .leaflet-control-zoom a:hover { background: #2d1f4e !important; }
`;
document.head.appendChild(style);
