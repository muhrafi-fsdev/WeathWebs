// ========================================
// Cuaca Nusantara - Indonesia Weather App
// ========================================

const locations = {
    'jakarta-pusat': { name: 'Jakarta Pusat', lat: -6.1862, lon: 106.8342, temp: 31, humidity: 75, wind: 12, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'jakarta-utara': { name: 'Jakarta Utara', lat: -6.1219, lon: 106.9285, temp: 32, humidity: 78, wind: 15, desc: 'Berawan', icon: 'cloudy' },
    'jakarta-selatan': { name: 'Jakarta Selatan', lat: -6.2615, lon: 106.8106, temp: 29, humidity: 80, wind: 8, desc: 'Hujan Ringan', icon: 'rain' },
    'jakarta-timur': { name: 'Jakarta Timur', lat: -6.2250, lon: 106.9004, temp: 30, humidity: 76, wind: 12, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'jakarta-barat': { name: 'Jakarta Barat', lat: -6.1352, lon: 106.7431, temp: 31, humidity: 74, wind: 11, desc: 'Cerah', icon: 'sunny' },
    'bandung': { name: 'Bandung', lat: -6.9175, lon: 107.6191, temp: 24, humidity: 85, wind: 8, desc: 'Hujan Ringan', icon: 'rain' },
    'bekasi': { name: 'Bekasi', lat: -6.2349, lon: 106.9896, temp: 32, humidity: 72, wind: 10, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'depok': { name: 'Depok', lat: -6.4025, lon: 106.7942, temp: 28, humidity: 82, wind: 7, desc: 'Hujan Ringan', icon: 'rain' },
    'bogor': { name: 'Bogor', lat: -6.5971, lon: 106.8060, temp: 26, humidity: 88, wind: 6, desc: 'Hujan Sedang', icon: 'heavy-rain' },
    'tangerang': { name: 'Tangerang', lat: -6.1783, lon: 106.6319, temp: 31, humidity: 73, wind: 13, desc: 'Berawan', icon: 'cloudy' },
    'serang': { name: 'Serang', lat: -6.1103, lon: 106.1640, temp: 30, humidity: 75, wind: 14, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'semarang': { name: 'Semarang', lat: -6.9666, lon: 110.4196, temp: 32, humidity: 70, wind: 15, desc: 'Cerah', icon: 'sunny' },
    'solo': { name: 'Solo', lat: -7.5755, lon: 110.8243, temp: 31, humidity: 72, wind: 10, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'surabaya': { name: 'Surabaya', lat: -7.2575, lon: 112.7521, temp: 33, humidity: 68, wind: 18, desc: 'Cerah', icon: 'sunny' },
    'malang': { name: 'Malang', lat: -7.9666, lon: 112.6326, temp: 25, humidity: 80, wind: 8, desc: 'Berawan', icon: 'cloudy' },
    'medan': { name: 'Medan', lat: 3.5952, lon: 98.6722, temp: 30, humidity: 78, wind: 10, desc: 'Hujan Ringan', icon: 'rain' },
    'palembang': { name: 'Palembang', lat: -2.9761, lon: 104.7754, temp: 32, humidity: 75, wind: 8, desc: 'Cerah Berawan', icon: 'partly-cloudy' },
    'padang': { name: 'Padang', lat: -0.9471, lon: 100.4172, temp: 28, humidity: 85, wind: 12, desc: 'Hujan Sedang', icon: 'heavy-rain' },
    'pekanbaru': { name: 'Pekanbaru', lat: 0.5071, lon: 101.4478, temp: 31, humidity: 80, wind: 6, desc: 'Berawan', icon: 'cloudy' },
    'lampung': { name: 'Bandar Lampung', lat: -5.3971, lon: 105.2668, temp: 29, humidity: 82, wind: 10, desc: 'Hujan Ringan', icon: 'rain' }
};

const earthquakes = [
    { lat: -4.12, lon: 101.45, mag: 5.2, location: 'Bengkulu', time: '14:30 WIB' },
    { lat: -6.8, lon: 107.5, mag: 4.5, location: 'Bandung', time: '12:15 WIB' },
    { lat: -7.5, lon: 110.4, mag: 3.8, location: 'Semarang', time: '10:22 WIB' },
    { lat: 0.5, lon: 101.4, mag: 4.2, location: 'Riau', time: '08:45 WIB' },
    { lat: -5.4, lon: 105.2, mag: 5.0, location: 'Lampung', time: '06:30 WIB' },
    { lat: 3.5, lon: 98.7, mag: 4.8, location: 'Medan', time: '04:15 WIB' }
];

const windPatterns = [
    { lat: -6.2, lon: 106.8, dir: 225, speed: 15, label: 'Jakarta' },
    { lat: -6.9, lon: 107.6, dir: 220, speed: 12, label: 'Bandung' },
    { lat: -7.0, lon: 110.4, dir: 230, speed: 18, label: 'Semarang' },
    { lat: -7.3, lon: 112.7, dir: 225, speed: 20, label: 'Surabaya' },
    { lat: 3.6, lon: 98.7, dir: 215, speed: 14, label: 'Medan' },
    { lat: -3.0, lon: 104.8, dir: 220, speed: 10, label: 'Palembang' },
    { lat: -0.9, lon: 100.4, dir: 210, speed: 16, label: 'Padang' }
];

let selectedLocation = 'jakarta-pusat';
let weatherMap = null, windMap = null, earthquakeMap = null;

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    setupNavigation();
    setupLocationSelector();
    updateWeatherDisplay();
}

function enterDashboard(section = 'weather') {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    setTimeout(() => {
        initWeatherMap();
        initWindMap();
        initEarthquakeMap();
        if (section !== 'weather') {
            document.querySelector('[data-section="' + section + '"]').click();
        }
    }, 200);
}

function showLanding() {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('landingPage').style.display = 'block';
}

function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var sectionId = btn.dataset.section;
            document.querySelectorAll('.nav-item').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
            document.getElementById(sectionId + '-section').classList.add('active');
            setTimeout(function () {
                if (sectionId === 'weather' && weatherMap) weatherMap.invalidateSize();
                if (sectionId === 'wind' && windMap) windMap.invalidateSize();
                if (sectionId === 'earthquake' && earthquakeMap) earthquakeMap.invalidateSize();
            }, 100);
        });
    });
}

function setupLocationSelector() {
    var selector = document.getElementById('locationSelector');
    if (!selector) return;
    selector.addEventListener('change', function (e) {
        selectedLocation = e.target.value;
        updateWeatherDisplay();
        if (weatherMap) {
            var loc = locations[selectedLocation];
            weatherMap.setView([loc.lat, loc.lon], 8);
        }
    });
}

function updateWeatherDisplay() {
    var loc = locations[selectedLocation];
    if (!loc) return;
    document.getElementById('weatherCity').textContent = loc.name;
    document.getElementById('weatherTemp').innerHTML = loc.temp + '<sup>°C</sup>';
    document.getElementById('weatherDesc').textContent = loc.desc;
    document.getElementById('statHumidity').textContent = loc.humidity + '%';
    document.getElementById('statWind').textContent = loc.wind + ' km/j';
    updateWeatherIcon(loc.icon);
}

function updateWeatherIcon(iconType) {
    var iconContainer = document.getElementById('weatherIconLarge');
    if (!iconContainer) return;
    var icons = {
        'sunny': '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="25" fill="#fbbf24"/><circle cx="48" cy="48" r="20" fill="#fde68a"/></svg>',
        'partly-cloudy': '<svg viewBox="0 0 100 100"><circle cx="40" cy="40" r="20" fill="#fbbf24"/><g fill="#e5e7eb"><ellipse cx="65" cy="60" rx="25" ry="18"/><ellipse cx="50" cy="65" rx="20" ry="15"/></g></svg>',
        'cloudy': '<svg viewBox="0 0 100 100"><g fill="#9ca3af"><ellipse cx="50" cy="50" rx="35" ry="22"/><ellipse cx="30" cy="55" rx="25" ry="18"/></g></svg>',
        'rain': '<svg viewBox="0 0 100 100"><g fill="#6b7280"><ellipse cx="50" cy="35" rx="30" ry="18"/></g><g stroke="#60a5fa" stroke-width="3"><line x1="35" y1="60" x2="30" y2="75"/><line x1="50" y1="60" x2="45" y2="75"/><line x1="65" y1="60" x2="60" y2="75"/></g></svg>',
        'heavy-rain': '<svg viewBox="0 0 100 100"><g fill="#374151"><ellipse cx="50" cy="30" rx="35" ry="20"/></g><g stroke="#3b82f6" stroke-width="3"><line x1="25" y1="55" x2="18" y2="75"/><line x1="40" y1="55" x2="33" y2="75"/><line x1="55" y1="55" x2="48" y2="75"/><line x1="70" y1="55" x2="63" y2="75"/></g></svg>'
    };
    iconContainer.innerHTML = icons[iconType] || icons['partly-cloudy'];
}

function getWeatherColor(icon) {
    var colors = { 'sunny': '#fbbf24', 'partly-cloudy': '#a78bfa', 'cloudy': '#9ca3af', 'rain': '#60a5fa', 'heavy-rain': '#3b82f6' };
    return colors[icon] || '#a78bfa';
}

function initWeatherMap() {
    var el = document.getElementById('weatherMap');
    if (!el || weatherMap) return;

    weatherMap = L.map('weatherMap').setView([-2.5, 106], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(weatherMap);

    Object.keys(locations).forEach(function (key) {
        var loc = locations[key];
        var color = getWeatherColor(loc.icon);
        L.circleMarker([loc.lat, loc.lon], {
            radius: 8, fillColor: color, color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.8
        }).bindPopup('<b>' + loc.name + '</b><br>' + loc.temp + '°C - ' + loc.desc)
            .on('click', function () {
                document.getElementById('locationSelector').value = key;
                selectedLocation = key;
                updateWeatherDisplay();
            }).addTo(weatherMap);
    });
}

function initWindMap() {
    var el = document.getElementById('windMap');
    if (!el || windMap) return;

    windMap = L.map('windMap').setView([-2.5, 106], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(windMap);

    windPatterns.forEach(function (wp) {
        L.marker([wp.lat, wp.lon], {
            icon: L.divIcon({
                className: 'wind-arrow',
                html: '<div style="transform:rotate(' + wp.dir + 'deg);color:#8b5cf6;font-size:20px;">→</div>',
                iconSize: [24, 24]
            })
        }).bindPopup('<b>' + wp.label + '</b><br>Angin: ' + wp.speed + ' km/j').addTo(windMap);
    });
}

function initEarthquakeMap() {
    var el = document.getElementById('earthquakeMap');
    if (!el || earthquakeMap) return;

    earthquakeMap = L.map('earthquakeMap').setView([-2.5, 106], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(earthquakeMap);

    earthquakes.forEach(function (eq, i) {
        var color = eq.mag >= 5 ? '#ef4444' : eq.mag >= 4 ? '#f59e0b' : '#10b981';
        L.circleMarker([eq.lat, eq.lon], {
            radius: eq.mag * 3, fillColor: color, color: color, weight: 2, opacity: 0.8, fillOpacity: 0.5
        }).bindPopup('<b>M' + eq.mag + '</b><br>' + eq.location + '<br>' + eq.time).addTo(earthquakeMap);
    });
}

var style = document.createElement('style');
style.textContent = '@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}';
document.head.appendChild(style);
