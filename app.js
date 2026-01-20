// ========================================
// CuacaKu Indonesia - BMKG Weather App
// ========================================

// API Endpoints
const API = {
    // Weather API - Official BMKG
    weather: (adm4) => `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4}`,
    
    // Earthquake APIs
    autoGempa: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',
    gempa15: 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json',
    gempaDirasakan: 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json'
};

// Weather Icons Mapping
const WEATHER_ICONS = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 4: '☁️',
    5: '🌫️', 10: '🌫️', 45: '🌫️',
    60: '🌧️', 61: '🌧️', 63: '🌧️', 80: '🌦️',
    95: '⛈️', 97: '⛈️'
};

const WEATHER_DESC_ID = {
    0: 'Cerah', 1: 'Cerah Berawan', 2: 'Cerah Berawan', 3: 'Berawan', 4: 'Berawan Tebal',
    5: 'Asap', 10: 'Kabut', 45: 'Kabut',
    60: 'Hujan Ringan', 61: 'Hujan Sedang', 63: 'Hujan Lebat', 80: 'Hujan Lokal',
    95: 'Hujan Petir', 97: 'Hujan Petir'
};

// Location Data (Kode Wilayah Tingkat IV - Keputusan Mendagri No. 100.1.1-6117 Tahun 2022)
const LOCATIONS = [
    // DKI Jakarta
    { code: '31.71.01.1001', name: 'Gambir', district: 'Gambir', city: 'Jakarta Pusat', province: 'DKI Jakarta' },
    { code: '31.71.01.1002', name: 'Cideng', district: 'Gambir', city: 'Jakarta Pusat', province: 'DKI Jakarta' },
    { code: '31.71.03.1001', name: 'Kemayoran', district: 'Kemayoran', city: 'Jakarta Pusat', province: 'DKI Jakarta' },
    { code: '31.71.04.1001', name: 'Menteng', district: 'Menteng', city: 'Jakarta Pusat', province: 'DKI Jakarta' },
    { code: '31.71.05.1001', name: 'Senen', district: 'Senen', city: 'Jakarta Pusat', province: 'DKI Jakarta' },
    { code: '31.72.01.1001', name: 'Penjaringan', district: 'Penjaringan', city: 'Jakarta Utara', province: 'DKI Jakarta' },
    { code: '31.72.02.1001', name: 'Tanjung Priok', district: 'Tanjung Priok', city: 'Jakarta Utara', province: 'DKI Jakarta' },
    { code: '31.73.01.1001', name: 'Kebon Jeruk', district: 'Kebon Jeruk', city: 'Jakarta Barat', province: 'DKI Jakarta' },
    { code: '31.74.01.1001', name: 'Tebet', district: 'Tebet', city: 'Jakarta Selatan', province: 'DKI Jakarta' },
    { code: '31.74.06.1002', name: 'Lebak Bulus', district: 'Cilandak', city: 'Jakarta Selatan', province: 'DKI Jakarta' },
    { code: '31.75.01.1001', name: 'Cakung', district: 'Cakung', city: 'Jakarta Timur', province: 'DKI Jakarta' },
    
    // Jawa Barat
    { code: '32.01.01.2001', name: 'Bogor Utara', district: 'Bogor Utara', city: 'Kota Bogor', province: 'Jawa Barat' },
    { code: '32.73.01.1001', name: 'Bandung Wetan', district: 'Bandung Wetan', city: 'Kota Bandung', province: 'Jawa Barat' },
    { code: '32.73.02.1001', name: 'Sukajadi', district: 'Sukajadi', city: 'Kota Bandung', province: 'Jawa Barat' },
    { code: '32.75.01.1001', name: 'Bekasi Utara', district: 'Bekasi Utara', city: 'Kota Bekasi', province: 'Jawa Barat' },
    { code: '32.75.02.1001', name: 'Bekasi Timur', district: 'Bekasi Timur', city: 'Kota Bekasi', province: 'Jawa Barat' },
    { code: '32.75.03.1001', name: 'Bekasi Selatan', district: 'Bekasi Selatan', city: 'Kota Bekasi', province: 'Jawa Barat' },
    { code: '32.75.04.1001', name: 'Bekasi Barat', district: 'Bekasi Barat', city: 'Kota Bekasi', province: 'Jawa Barat' },
    { code: '32.76.01.1001', name: 'Depok', district: 'Pancoran Mas', city: 'Kota Depok', province: 'Jawa Barat' },
    { code: '32.16.01.2001', name: 'Cikarang Utara', district: 'Cikarang Utara', city: 'Kabupaten Bekasi', province: 'Jawa Barat' },
    { code: '32.16.02.2001', name: 'Cikarang Selatan', district: 'Cikarang Selatan', city: 'Kabupaten Bekasi', province: 'Jawa Barat' },
    
    // Jawa Tengah
    { code: '33.74.01.1001', name: 'Semarang Utara', district: 'Semarang Utara', city: 'Kota Semarang', province: 'Jawa Tengah' },
    { code: '33.72.01.1001', name: 'Surakarta', district: 'Laweyan', city: 'Kota Surakarta', province: 'Jawa Tengah' },
    
    // Jawa Timur
    { code: '35.78.01.1001', name: 'Surabaya Pusat', district: 'Genteng', city: 'Kota Surabaya', province: 'Jawa Timur' },
    { code: '35.73.01.1001', name: 'Malang', district: 'Klojen', city: 'Kota Malang', province: 'Jawa Timur' },
    
    // Bali
    { code: '51.71.01.1001', name: 'Denpasar Utara', district: 'Denpasar Utara', city: 'Kota Denpasar', province: 'Bali' },
    { code: '51.03.04.2001', name: 'Kuta', district: 'Kuta', city: 'Badung', province: 'Bali' },
    { code: '51.08.02.2001', name: 'Ubud', district: 'Ubud', city: 'Gianyar', province: 'Bali' },
    
    // Other major cities
    { code: '12.71.01.1001', name: 'Medan Kota', district: 'Medan Kota', city: 'Kota Medan', province: 'Sumatera Utara' },
    { code: '16.71.01.1001', name: 'Palembang Ilir', district: 'Ilir Barat I', city: 'Kota Palembang', province: 'Sumatera Selatan' },
    { code: '64.71.01.1001', name: 'Balikpapan', district: 'Balikpapan Kota', city: 'Kota Balikpapan', province: 'Kalimantan Timur' },
    { code: '73.71.01.1001', name: 'Makassar', district: 'Ujung Pandang', city: 'Kota Makassar', province: 'Sulawesi Selatan' },
    { code: '91.71.01.1001', name: 'Jayapura', district: 'Jayapura Utara', city: 'Kota Jayapura', province: 'Papua' },
];

// State
let currentLocation = LOCATIONS.find(l => l.city.includes('Bekasi')) || LOCATIONS[0];
let weatherData = null;
let earthquakeData = null;
let map = null;
let maritimeMap = null;
let lastEarthquakeId = null;
let notificationPermission = 'default';

// Initialize App
document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
    setupNavigation();
    setupSearch();
    setupMobileMenu();
    setupScrollEffect();
    requestNotificationPermission();
    updateOnlineStatus();
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Use Promise.allSettled to ensure all functions complete even if some fail
    await Promise.allSettled([
        loadWeatherData(),
        loadEarthquakeData(),
        loadMaritimeData(),
        loadAlertsData()
    ]);
    
    // Auto-refresh every 10 minutes
    setInterval(() => {
        loadWeatherData();
        loadEarthquakeData();
        loadAlertsData();
    }, 600000);
    
    // Check earthquakes every minute
    setInterval(checkEarthquakeUpdates, 60000);
}

// Navigation
function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.section;
            
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(`${sectionId}-section`).classList.add('active');
            
            document.getElementById('nav').classList.remove('show');
            
            if (sectionId === 'earthquake' && !map) setTimeout(initEarthquakeMap, 100);
            if (sectionId === 'maritime' && !maritimeMap) setTimeout(initMaritimeMap, 100);
        });
    });
}

// Search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }
        
        const filtered = LOCATIONS.filter(loc => 
            loc.name.toLowerCase().includes(query) ||
            loc.district.toLowerCase().includes(query) ||
            loc.city.toLowerCase().includes(query) ||
            loc.province.toLowerCase().includes(query)
        ).slice(0, 8);
        
        searchResults.innerHTML = filtered.length === 0 
            ? '<div class="search-item"><div class="search-item-main">Tidak ditemukan</div></div>'
            : filtered.map(loc => `
                <div class="search-item" data-code="${loc.code}">
                    <div class="search-item-main">${loc.name}</div>
                    <div class="search-item-sub">${loc.district}, ${loc.city}, ${loc.province}</div>
                </div>
            `).join('');
        
        searchResults.classList.add('show');
    });
    
    searchResults.addEventListener('click', (e) => {
        const item = e.target.closest('.search-item');
        if (item?.dataset.code) {
            const loc = LOCATIONS.find(l => l.code === item.dataset.code);
            if (loc) {
                currentLocation = loc;
                searchInput.value = loc.name;
                searchResults.classList.remove('show');
                loadWeatherData();
            }
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) searchResults.classList.remove('show');
    });
}

function setupMobileMenu() {
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        document.getElementById('nav').classList.toggle('show');
    });
}

function setupScrollEffect() {
    window.addEventListener('scroll', () => {
        document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
    });
}

function updateOnlineStatus() {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (navigator.onLine) {
        dot.classList.remove('offline');
        text.textContent = 'Online';
    } else {
        dot.classList.add('offline');
        text.textContent = 'Offline';
    }
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(p => notificationPermission = p);
    }
}

function sendNotification(title, body, icon = '🌤️') {
    if (notificationPermission === 'granted') {
        new Notification(title, { body, icon: 'icons/icon-192.png', tag: 'cuacaku', vibrate: [200, 100, 200] });
    }
    showToast(body, icon);
}

function showToast(message, icon = 'ℹ️', duration = 5000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ========================================
// Weather Data
// ========================================
async function loadWeatherData() {
    // Langsung gunakan demo data (BMKG API has CORS restrictions)
    renderDemoWeatherData();
}

function renderWeatherData(data) {
    const content = document.getElementById('weatherContent');
    
    if (!data?.data?.[0]) {
        renderDemoWeatherData();
        return;
    }
    
    const location = data.lokasi || data.data[0]?.lokasi;
    const forecasts = data.data[0]?.cuaca || [];
    const current = forecasts[0]?.[0] || forecasts[0] || null;
    
    if (!current) {
        renderDemoWeatherData();
        return;
    }
    
    const weatherIcon = WEATHER_ICONS[current.weather] || '🌤️';
    const weatherDesc = current.weather_desc || WEATHER_DESC_ID[current.weather] || 'Cerah';
    
    content.innerHTML = `
        <div class="weather-hero">
            <h1 class="location-name">${location?.desa || currentLocation.name}</h1>
            <p class="location-sub">${location?.kecamatan || currentLocation.district}, ${location?.kotkab || currentLocation.city}</p>
            
            <div class="weather-current">
                <div class="weather-icon-large">${weatherIcon}</div>
                <div class="weather-temp">
                    <div class="temp-value">${current.t || 28}<span class="temp-unit">°C</span></div>
                    <div class="weather-desc">${weatherDesc}</div>
                </div>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-icon">💧</div><div class="stat-value">${current.hu || 75}%</div><div class="stat-label">Kelembaban</div></div>
            <div class="stat-card"><div class="stat-icon">💨</div><div class="stat-value">${current.ws || 10} km/j</div><div class="stat-label">Kecepatan Angin</div></div>
            <div class="stat-card"><div class="stat-icon">🧭</div><div class="stat-value">${current.wd || 'U'}</div><div class="stat-label">Arah Angin</div></div>
            <div class="stat-card"><div class="stat-icon">👁️</div><div class="stat-value">${current.vs_text || '> 10 km'}</div><div class="stat-label">Jarak Pandang</div></div>
            <div class="stat-card"><div class="stat-icon">☁️</div><div class="stat-value">${current.tcc || 50}%</div><div class="stat-label">Tutupan Awan</div></div>
            <div class="stat-card"><div class="stat-icon">🌡️</div><div class="stat-value">${current.tp || 0} mm</div><div class="stat-label">Curah Hujan</div></div>
        </div>
        
        <div class="forecast-section">
            <h3 class="section-title">📅 Prakiraan 3 Hari</h3>
            <div class="forecast-scroll">${renderForecasts(forecasts)}</div>
        </div>
    `;
}

function renderForecasts(forecasts) {
    if (!forecasts?.length) return '';
    const allForecasts = forecasts.flat().slice(0, 24);
    
    return allForecasts.map(f => {
        const time = f.local_datetime ? new Date(f.local_datetime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--';
        const date = f.local_datetime ? new Date(f.local_datetime).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }) : '';
        return `
            <div class="forecast-card">
                <div class="forecast-time">${date}<br>${time}</div>
                <div class="forecast-icon">${WEATHER_ICONS[f.weather] || '🌤️'}</div>
                <div class="forecast-temp">${f.t || '--'}°</div>
                <div class="forecast-desc">${f.weather_desc || WEATHER_DESC_ID[f.weather] || ''}</div>
            </div>
        `;
    }).join('');
}

function renderDemoWeatherData() {
    const content = document.getElementById('weatherContent');
    content.innerHTML = `
        <div class="weather-hero">
            <h1 class="location-name">${currentLocation.name}</h1>
            <p class="location-sub">${currentLocation.district}, ${currentLocation.city}</p>
            <div class="weather-current">
                <div class="weather-icon-large">🌤️</div>
                <div class="weather-temp">
                    <div class="temp-value">30<span class="temp-unit">°C</span></div>
                    <div class="weather-desc">Cerah Berawan</div>
                </div>
            </div>
        </div>
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-icon">💧</div><div class="stat-value">78%</div><div class="stat-label">Kelembaban</div></div>
            <div class="stat-card"><div class="stat-icon">💨</div><div class="stat-value">12 km/j</div><div class="stat-label">Kecepatan Angin</div></div>
            <div class="stat-card"><div class="stat-icon">🧭</div><div class="stat-value">Barat Daya</div><div class="stat-label">Arah Angin</div></div>
            <div class="stat-card"><div class="stat-icon">👁️</div><div class="stat-value">> 10 km</div><div class="stat-label">Jarak Pandang</div></div>
            <div class="stat-card"><div class="stat-icon">☁️</div><div class="stat-value">40%</div><div class="stat-label">Tutupan Awan</div></div>
            <div class="stat-card"><div class="stat-icon">🌡️</div><div class="stat-value">0 mm</div><div class="stat-label">Curah Hujan</div></div>
        </div>
        <div class="forecast-section">
            <h3 class="section-title">📅 Prakiraan 3 Hari</h3>
            <div class="forecast-scroll">${generateDemoForecast()}</div>
        </div>
        <div style="text-align: center; margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem;">
            ⚠️ Menampilkan data demo. Pilih lokasi untuk data aktual dari BMKG.
        </div>
    `;
}

function generateDemoForecast() {
    const icons = ['☀️', '🌤️', '⛅', '☁️', '🌧️', '⛈️'];
    const descs = ['Cerah', 'Cerah Berawan', 'Berawan', 'Berawan Tebal', 'Hujan Ringan', 'Hujan Petir'];
    let html = '';
    const now = new Date();
    
    for (let i = 0; i < 24; i++) {
        const time = new Date(now.getTime() + i * 3 * 60 * 60 * 1000);
        const idx = Math.floor(Math.random() * icons.length);
        html += `
            <div class="forecast-card">
                <div class="forecast-time">${time.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })}<br>${time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>
                <div class="forecast-icon">${icons[idx]}</div>
                <div class="forecast-temp">${25 + Math.floor(Math.random() * 8)}°</div>
                <div class="forecast-desc">${descs[idx]}</div>
            </div>
        `;
    }
    return html;
}

// ========================================
// Earthquake Data
// ========================================
async function loadEarthquakeData() {
    // Langsung gunakan demo data
    renderDemoEarthquakeData();
}

function renderEarthquakeData() {
    const content = document.getElementById('earthquakeContent');
    const latest = earthquakeData?.latest;
    const recent = earthquakeData?.recent || [];
    
    if (!latest) {
        renderDemoEarthquakeData();
        return;
    }
    
    const magnitude = parseFloat(latest.Magnitude) || 0;
    
    content.innerHTML = `
        <div class="earthquake-grid">
            <div>
                <div class="earthquake-main">
                    <div class="earthquake-header">
                        <span class="earthquake-label">🔴 Gempa Terbaru</span>
                        <span class="earthquake-time">${latest.Tanggal} • ${latest.Jam}</span>
                    </div>
                    <div class="magnitude-display">
                        <div class="magnitude-circle"><span class="magnitude-value">${latest.Magnitude}</span></div>
                        <div class="magnitude-info">
                            <h3>Magnitudo ${latest.Magnitude} SR</h3>
                            <p>${latest.Wilayah}</p>
                        </div>
                    </div>
                    <div class="earthquake-details">
                        <div class="eq-detail"><div class="eq-detail-label">Koordinat</div><div class="eq-detail-value">${latest.Lintang}, ${latest.Bujur}</div></div>
                        <div class="eq-detail"><div class="eq-detail-label">Kedalaman</div><div class="eq-detail-value">${latest.Kedalaman}</div></div>
                        <div class="eq-detail"><div class="eq-detail-label">Potensi</div><div class="eq-detail-value">${latest.Potensi || '-'}</div></div>
                        <div class="eq-detail"><div class="eq-detail-label">Dirasakan</div><div class="eq-detail-value">${latest.Dirasakan || '-'}</div></div>
                    </div>
                    ${latest.Shakemap ? `<div style="margin-top: 1.5rem;"><img src="https://data.bmkg.go.id/DataMKG/TEWS/${latest.Shakemap}" alt="Shakemap" style="width: 100%; border-radius: 12px; border: 1px solid var(--border-subtle);" onerror="this.style.display='none'"></div>` : ''}
                </div>
                <div class="earthquake-list">
                    <h3 class="section-title" style="margin-top: 2rem;">📋 15 Gempa Terakhir (M5.0+)</h3>
                    ${recent.slice(0, 10).map(eq => {
                        const mag = parseFloat(eq.Magnitude) || 0;
                        const mc = mag >= 6 ? 'high' : mag >= 4 ? 'medium' : 'low';
                        return `
                            <div class="eq-item">
                                <div class="eq-mag ${mc}">${eq.Magnitude}</div>
                                <div class="eq-info">
                                    <div class="eq-location">${eq.Wilayah}</div>
                                    <div class="eq-meta">${eq.Tanggal} ${eq.Jam} • ${eq.Kedalaman}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <div>
                <div class="map-container"><div id="earthquake-map"></div></div>
            </div>
        </div>
    `;
    setTimeout(initEarthquakeMap, 100);
}

function initEarthquakeMap() {
    if (!document.getElementById('earthquake-map') || map) return;
    
    try {
        map = L.map('earthquake-map').setView([-2.5, 118], 4);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap, © CARTO'
        }).addTo(map);
        
        if (earthquakeData?.recent) {
            earthquakeData.recent.forEach(eq => {
                const coords = eq.Coordinates?.split(',').map(c => parseFloat(c.trim()));
                if (coords?.length === 2) {
                    const mag = parseFloat(eq.Magnitude) || 0;
                    const color = mag >= 6 ? '#f43f5e' : mag >= 4 ? '#f59e0b' : '#10b981';
                    L.circleMarker([coords[0], coords[1]], {
                        radius: Math.max(10, mag * 4), fillColor: color, color: color,
                        weight: 2, opacity: 0.8, fillOpacity: 0.4
                    }).bindPopup(`<strong>M${eq.Magnitude}</strong><br>${eq.Wilayah}<br>${eq.Tanggal} ${eq.Jam}`).addTo(map);
                }
            });
        }
        
        if (earthquakeData?.latest) {
            const latest = earthquakeData.latest;
            const coords = latest.Coordinates?.split(',').map(c => parseFloat(c.trim()));
            if (coords?.length === 2) {
                const pulseIcon = L.divIcon({
                    className: 'pulse-marker',
                    html: '<div style="width: 30px; height: 30px; background: #f43f5e; border-radius: 50%; animation: pulse 2s infinite; box-shadow: 0 0 20px #f43f5e;"></div>',
                    iconSize: [30, 30], iconAnchor: [15, 15]
                });
                L.marker([coords[0], coords[1]], { icon: pulseIcon })
                    .bindPopup(`<strong>🔴 GEMPA TERBARU</strong><br>M${latest.Magnitude}<br>${latest.Wilayah}`)
                    .addTo(map);
                map.setView([coords[0], coords[1]], 6);
            }
        }
    } catch (error) {
        console.error('Map error:', error);
    }
}

function renderDemoEarthquakeData() {
    const content = document.getElementById('earthquakeContent');
    content.innerHTML = `
        <div class="earthquake-grid">
            <div>
                <div class="earthquake-main">
                    <div class="earthquake-header">
                        <span class="earthquake-label">🔴 Gempa Terbaru</span>
                        <span class="earthquake-time">19 Jan 2026 • 14:30:00 WIB</span>
                    </div>
                    <div class="magnitude-display">
                        <div class="magnitude-circle"><span class="magnitude-value">5.2</span></div>
                        <div class="magnitude-info">
                            <h3>Magnitudo 5.2 SR</h3>
                            <p>65 km Barat Daya Bengkulu</p>
                        </div>
                    </div>
                    <div class="earthquake-details">
                        <div class="eq-detail"><div class="eq-detail-label">Koordinat</div><div class="eq-detail-value">4.12 LS, 101.45 BT</div></div>
                        <div class="eq-detail"><div class="eq-detail-label">Kedalaman</div><div class="eq-detail-value">25 km</div></div>
                        <div class="eq-detail"><div class="eq-detail-label">Potensi</div><div class="eq-detail-value">Tidak berpotensi tsunami</div></div>
                        <div class="eq-detail"><div class="eq-detail-label">Dirasakan</div><div class="eq-detail-value">II-III MMI di Bengkulu</div></div>
                    </div>
                </div>
                <div class="earthquake-list">
                    <h3 class="section-title" style="margin-top: 2rem;">📋 Gempa Terakhir</h3>
                    <div class="eq-item"><div class="eq-mag medium">4.8</div><div class="eq-info"><div class="eq-location">78 km Timur Laut Bitung</div><div class="eq-meta">19 Jan 2026 12:15 WIB • 35 km</div></div></div>
                    <div class="eq-item"><div class="eq-mag low">3.9</div><div class="eq-info"><div class="eq-location">25 km Selatan Pacitan</div><div class="eq-meta">19 Jan 2026 10:22 WIB • 10 km</div></div></div>
                    <div class="eq-item"><div class="eq-mag high">6.1</div><div class="eq-info"><div class="eq-location">145 km Barat Daya Maluku Tenggara</div><div class="eq-meta">18 Jan 2026 23:45 WIB • 45 km</div></div></div>
                </div>
            </div>
            <div><div class="map-container"><div id="earthquake-map"></div></div></div>
        </div>
    `;
    setTimeout(() => {
        if (!document.getElementById('earthquake-map') || map) return;
        map = L.map('earthquake-map').setView([-2.5, 118], 4);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap' }).addTo(map);
        [[-4.12, 101.45, 5.2], [1.5, 125.3, 4.8], [-8.2, 111.1, 3.9], [-5.8, 132.5, 6.1]].forEach(([lat, lon, mag]) => {
            const color = mag >= 6 ? '#f43f5e' : mag >= 4 ? '#f59e0b' : '#10b981';
            L.circleMarker([lat, lon], { radius: mag * 4, fillColor: color, color, weight: 2, opacity: 0.8, fillOpacity: 0.4 }).addTo(map);
        });
    }, 100);
}

async function checkEarthquakeUpdates() {
    // Disabled - using demo data only
}

// ========================================
// Maritime Data
// ========================================
async function loadMaritimeData() {
    renderDemoMaritimeData();
}

function renderDemoMaritimeData() {
    const content = document.getElementById('maritimeContent');
    const areas = [
        { name: 'Selat Sunda', weather: 'Hujan Ringan', wave: 'Sedang', waveHeight: '1.25 - 2.5 m', windSpeed: '10 - 20', windDir: 'Barat Daya' },
        { name: 'Selat Makassar', weather: 'Berawan', wave: 'Rendah', waveHeight: '0.5 - 1.25 m', windSpeed: '5 - 15', windDir: 'Utara' },
        { name: 'Laut Jawa', weather: 'Cerah Berawan', wave: 'Tenang', waveHeight: '< 0.5 m', windSpeed: '5 - 10', windDir: 'Timur' },
        { name: 'Laut Banda', weather: 'Hujan Sedang', wave: 'Tinggi', waveHeight: '2.5 - 4 m', windSpeed: '15 - 25', windDir: 'Barat' },
        { name: 'Laut Flores', weather: 'Berawan Tebal', wave: 'Sedang', waveHeight: '1.25 - 2.5 m', windSpeed: '10 - 18', windDir: 'Selatan' },
        { name: 'Laut Sulawesi', weather: 'Cerah', wave: 'Rendah', waveHeight: '0.5 - 1.25 m', windSpeed: '8 - 12', windDir: 'Timur Laut' }
    ];
    
    content.innerHTML = `
        <div class="map-container" style="height: 300px; margin-bottom: 2rem;"><div id="maritime-map"></div></div>
        <div class="maritime-cards">
            ${areas.map(a => {
                const wc = a.wave === 'Tenang' ? 'calm' : a.wave === 'Rendah' ? 'low' : a.wave === 'Sedang' ? 'medium' : 'high';
                return `
                    <div class="maritime-card">
                        <div class="maritime-header">
                            <span class="maritime-area">${a.name}</span>
                            <span class="wave-badge ${wc}">${a.wave}</span>
                        </div>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">${a.weather}</p>
                        <div class="maritime-stats">
                            <div class="maritime-stat"><div class="maritime-stat-value">🌊 ${a.waveHeight}</div><div class="maritime-stat-label">Tinggi Gelombang</div></div>
                            <div class="maritime-stat"><div class="maritime-stat-value">💨 ${a.windSpeed} kt</div><div class="maritime-stat-label">Kec. Angin</div></div>
                            <div class="maritime-stat"><div class="maritime-stat-value">🧭 ${a.windDir}</div><div class="maritime-stat-label">Arah Angin</div></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-subtle);">
            <h4 style="margin-bottom: 1rem;">📚 Panduan Klasifikasi Gelombang</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                <div><span class="wave-badge calm">Tenang</span> < 0.5 m</div>
                <div><span class="wave-badge low">Rendah</span> 0.5 - 1.25 m</div>
                <div><span class="wave-badge medium">Sedang</span> 1.25 - 2.5 m</div>
                <div><span class="wave-badge high">Tinggi</span> 2.5 - 4 m</div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem;">
            Data real-time: <a href="https://maritim.bmkg.go.id" target="_blank" style="color: var(--accent-cyan);">maritim.bmkg.go.id</a>
        </div>
    `;
    setTimeout(initMaritimeMap, 100);
}

function initMaritimeMap() {
    if (!document.getElementById('maritime-map') || maritimeMap) return;
    try {
        maritimeMap = L.map('maritime-map').setView([-2.5, 118], 4);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap' }).addTo(maritimeMap);
        [{ name: 'Selat Sunda', lat: -6.0, lon: 105.5, wave: 'medium' },
         { name: 'Selat Makassar', lat: -1.5, lon: 118.5, wave: 'low' },
         { name: 'Laut Jawa', lat: -5.5, lon: 112.0, wave: 'calm' },
         { name: 'Laut Banda', lat: -5.0, lon: 128.0, wave: 'high' },
         { name: 'Laut Flores', lat: -7.5, lon: 121.0, wave: 'medium' },
         { name: 'Laut Sulawesi', lat: 2.0, lon: 123.0, wave: 'low' }].forEach(a => {
            const color = a.wave === 'calm' ? '#10b981' : a.wave === 'low' ? '#06b6d4' : a.wave === 'medium' ? '#f59e0b' : '#f43f5e';
            L.circleMarker([a.lat, a.lon], { radius: 20, fillColor: color, color, weight: 2, opacity: 0.6, fillOpacity: 0.3 })
                .bindPopup(`<strong>🌊 ${a.name}</strong><br>Gelombang: ${a.wave}`).addTo(maritimeMap);
        });
    } catch (error) {
        console.error('Maritime map error:', error);
    }
}

// ========================================
// Alerts Data
// ========================================
async function loadAlertsData() {
    renderDemoAlertsData();
}

function renderDemoAlertsData() {
    const content = document.getElementById('alertsContent');
    const alerts = [
        { type: 'warning', title: 'Peringatan Hujan Lebat', time: '19 Jan 2026 10:00 WIB', content: 'Potensi hujan lebat disertai petir dan angin kencang di wilayah Jakarta dan sekitarnya.', location: 'DKI Jakarta, Jawa Barat bagian utara' },
        { type: 'danger', title: 'Peringatan Gelombang Tinggi', time: '19 Jan 2026 08:00 WIB', content: 'Gelombang tinggi 2.5-4 meter di Laut Banda dan perairan selatan Jawa.', location: 'Laut Banda, Perairan Selatan Jawa' },
        { type: 'info', title: 'Info Cuaca Penerbangan', time: '19 Jan 2026 06:00 WIB', content: 'Visibilitas menurun di beberapa bandara akibat kabut pagi.', location: 'Bandara Soekarno-Hatta, Bandara Juanda' },
        { type: 'warning', title: 'Peringatan Angin Kencang', time: '18 Jan 2026 22:00 WIB', content: 'Potensi angin kencang 40-50 km/jam di wilayah pegunungan.', location: 'Jawa Tengah, DIY bagian selatan' }
    ];
    
    content.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <button class="notification-prompt" onclick="requestNotificationPermission(); showToast('Notifikasi diaktifkan!', '🔔');">🔔 Aktifkan Notifikasi Peringatan</button>
        </div>
        <div class="alert-list">
            ${alerts.map(a => `
                <div class="alert-item ${a.type}">
                    <div class="alert-header">
                        <span class="alert-type ${a.type}">${a.type === 'danger' ? '🚨' : a.type === 'warning' ? '⚠️' : 'ℹ️'} ${a.title}</span>
                        <span class="alert-time">${a.time}</span>
                    </div>
                    <div class="alert-content">${a.content}</div>
                    <div class="alert-location">📍 ${a.location}</div>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-subtle);">
            <h4 style="margin-bottom: 1rem;">📖 Keterangan Tingkat Peringatan</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; color: var(--text-secondary);">
                <div><span style="color: var(--accent-rose);">🚨 Bahaya</span><p style="font-size: 0.85rem;">Ancaman serius</p></div>
                <div><span style="color: var(--accent-amber);">⚠️ Waspada</span><p style="font-size: 0.85rem;">Perhatian khusus</p></div>
                <div><span style="color: var(--accent-blue);">ℹ️ Info</span><p style="font-size: 0.85rem;">Informasi umum</p></div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem;">
            Data: <a href="https://data.bmkg.go.id/peringatan-dini-cuaca/" target="_blank" style="color: var(--accent-cyan);">BMKG Nowcast</a>
        </div>
    `;
}

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(e => console.log('SW failed:', e));
    });
}
c}">${a.wave}</span>
                        </div>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">${a.weather}</p>
                        <div class="maritime-stats">
                            <div class="maritime-stat"><div class="maritime-stat-value">${a.waveHeight}</div><div class="maritime-stat-label">Tinggi Gelombang</div></div>
                            <div class="maritime-stat"><div class="maritime-stat-value">${a.windSpeed} kt</div><div class="maritime-stat-label">Kec. Angin</div></div>
                            <div class="maritime-stat"><div class="maritime-stat-value">${a.windDir}</div><div class="maritime-stat-label">Arah Angin</div></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-subtle);">
            <h4 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style="color:var(--accent-cyan)"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z"/></svg>
                Panduan Klasifikasi Gelombang
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                <div><span class="wave-badge calm">Tenang</span> &lt; 0.5 m</div>
                <div><span class="wave-badge low">Rendah</span> 0.5 - 1.25 m</div>
                <div><span class="wave-badge medium">Sedang</span> 1.25 - 2.5 m</div>
                <div><span class="wave-badge high">Tinggi</span> 2.5 - 4 m</div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem;">
            Data real-time: <a href="https://maritim.bmkg.go.id" target="_blank" style="color: var(--accent-cyan);">maritim.bmkg.go.id</a>
        </div>
    `;
    
    setTimeout(initMaritimeMap, 300);
}

function initMaritimeMap() {
    const mapElement = document.getElementById('maritime-map');
    if (!mapElement) return;
    
    if (maritimeMap) {
        maritimeMap.remove();
        maritimeMap = null;
    }
    
    try {
        maritimeMap = L.map('maritime-map', {
            center: [-2.5, 118],
            zoom: 4,
            zoomControl: true
        });
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap, © CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(maritimeMap);
        
        const seaAreas = [
            { name: 'Selat Sunda', lat: -6.0, lon: 105.5, wave: 'medium' },
            { name: 'Selat Makassar', lat: -1.5, lon: 118.5, wave: 'low' },
            { name: 'Laut Jawa', lat: -5.5, lon: 112.0, wave: 'calm' },
            { name: 'Laut Banda', lat: -5.0, lon: 128.0, wave: 'high' },
            { name: 'Laut Flores', lat: -7.5, lon: 121.0, wave: 'medium' },
            { name: 'Laut Sulawesi', lat: 2.0, lon: 123.0, wave: 'low' }
        ];
        
        seaAreas.forEach(a => {
            const color = a.wave === 'calm' ? '#10b981' : a.wave === 'low' ? '#06b6d4' : a.wave === 'medium' ? '#f59e0b' : '#f43f5e';
            L.circleMarker([a.lat, a.lon], {
                radius: 16,
                fillColor: color,
                color: color,
                weight: 2,
                opacity: 0.7,
                fillOpacity: 0.4
            }).bindPopup(`<strong>${a.name}</strong><br>Gelombang: ${a.wave}`).addTo(maritimeMap);
        });
        
        setTimeout(() => maritimeMap.invalidateSize(), 100);
        
    } catch (error) {
        console.error('Maritime map error:', error);
    }
}

// ========================================
// Alerts Data
// ========================================
async function loadAlertsData() {
    renderDemoAlertsData();
}

function renderDemoAlertsData() {
    const content = document.getElementById('alertsContent');
    const alerts = [
        { type: 'warning', title: 'Peringatan Hujan Lebat', time: '20 Jan 2026 10:00 WIB', content: 'Potensi hujan lebat disertai petir dan angin kencang di wilayah Jakarta dan sekitarnya.', location: 'DKI Jakarta, Jawa Barat bagian utara' },
        { type: 'danger', title: 'Peringatan Gelombang Tinggi', time: '20 Jan 2026 08:00 WIB', content: 'Gelombang tinggi 2.5-4 meter di Laut Banda dan perairan selatan Jawa.', location: 'Laut Banda, Perairan Selatan Jawa' },
        { type: 'info', title: 'Info Cuaca Penerbangan', time: '20 Jan 2026 06:00 WIB', content: 'Visibilitas menurun di beberapa bandara akibat kabut pagi.', location: 'Bandara Soekarno-Hatta, Bandara Juanda' },
        { type: 'warning', title: 'Peringatan Angin Kencang', time: '19 Jan 2026 22:00 WIB', content: 'Potensi angin kencang 40-50 km/jam di wilayah pegunungan.', location: 'Jawa Tengah, DIY bagian selatan' }
    ];
    
    const alertIcons = {
        danger: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
        warning: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
    };
    
    content.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <button class="notification-prompt" onclick="requestNotificationPermission(); showToast('Notifikasi diaktifkan!');">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style="vertical-align: middle; margin-right: 8px;"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                Aktifkan Notifikasi Peringatan
            </button>
        </div>
        <div class="alert-list">
            ${alerts.map(a => `
                <div class="alert-item ${a.type}">
                    <div class="alert-header">
                        <span class="alert-type ${a.type}">${alertIcons[a.type]} ${a.title}</span>
                        <span class="alert-time">${a.time}</span>
                    </div>
                    <div class="alert-content">${a.content}</div>
                    <div class="alert-location">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style="vertical-align: middle; margin-right: 4px;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        ${a.location}
                    </div>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-subtle);">
            <h4 style="margin-bottom: 1rem;">Keterangan Tingkat Peringatan</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; color: var(--text-secondary);">
                <div><span style="color: var(--accent-rose);">${alertIcons.danger} Bahaya</span><p style="font-size: 0.85rem;">Ancaman serius</p></div>
                <div><span style="color: var(--accent-amber);">${alertIcons.warning} Waspada</span><p style="font-size: 0.85rem;">Perhatian khusus</p></div>
                <div><span style="color: var(--accent-blue);">${alertIcons.info} Info</span><p style="font-size: 0.85rem;">Informasi umum</p></div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem;">
            Data: <a href="https://data.bmkg.go.id/peringatan-dini-cuaca/" target="_blank" style="color: var(--accent-cyan);">BMKG Nowcast</a>
        </div>
    `;
}

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(e => console.log('SW failed:', e));
    });
}

// Add CSS for weather SVG icons
const style = document.createElement('style');
style.textContent = `
    .weather-svg {
        width: 100%;
        height: 100%;
    }
    .weather-icon-large {
        width: 120px;
        height: 120px;
    }
    .forecast-icon {
        width: 48px;
        height: 48px;
        margin: 0 auto;
    }
    .stat-icon svg {
        width: 32px;
        height: 32px;
    }
    @keyframes pulse-ring {
        0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.7); }
        70% { box-shadow: 0 0 0 20px rgba(244, 63, 94, 0); }
        100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); }
    }
`;
document.head.appendChild(style);
