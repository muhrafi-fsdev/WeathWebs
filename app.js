// ========================================
// Cuaca Nusantara - Indonesia Weather App
// ========================================

// Initialize App
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    setupNavigation();
    initMap();
    updateTime();
    setInterval(updateTime, 60000);
}

// Navigation
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.section;
            
            // Update nav buttons
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update sections
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(`${sectionId}-section`).classList.add('active');
            
            // Update tags
            document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
            document.querySelector(`.tag:nth-child(${getTagIndex(sectionId)})`).classList.add('active');
            
            // Reinitialize map if earthquake section
            if (sectionId === 'earthquake') {
                setTimeout(() => {
                    if (window.earthquakeMap) {
                        window.earthquakeMap.invalidateSize();
                    }
                }, 100);
            }
        });
    });
    
    // Tag clicks
    document.querySelectorAll('.tag').forEach((tag, index) => {
        tag.addEventListener('click', () => {
            const sections = ['weather', 'earthquake', 'maritime', 'alerts'];
            document.querySelectorAll('.nav-item')[index].click();
        });
    });
}

function getTagIndex(section) {
    const map = { weather: 1, earthquake: 2, maritime: 3, alerts: 4 };
    return map[section] || 1;
}

// Initialize Map
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    try {
        window.earthquakeMap = L.map('map', {
            center: [-2.5, 118],
            zoom: 4,
            zoomControl: true
        });
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap, © CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(window.earthquakeMap);
        
        // Demo earthquake markers
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
                fillColor: color,
                color: color,
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.4
            }).bindPopup(`
                <div style="font-family: 'Outfit', sans-serif; padding: 5px;">
                    <strong style="font-size: 14px;">M${eq.mag}</strong><br>
                    <span style="color: #666;">${eq.location}</span>
                </div>
            `).addTo(window.earthquakeMap);
        });
        
        // Latest earthquake pulse marker
        const pulseIcon = L.divIcon({
            className: 'pulse-marker',
            html: `<div style="
                width: 20px; 
                height: 20px; 
                background: #ef4444; 
                border-radius: 50%; 
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
                animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            "></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        L.marker([-4.12, 101.45], { icon: pulseIcon })
            .bindPopup('<strong>GEMPA TERBARU</strong><br>M5.2 - Bengkulu')
            .addTo(window.earthquakeMap);
            
    } catch (error) {
        console.error('Map initialization error:', error);
    }
}

// Update Time
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const statusTime = document.querySelector('.status-time');
    if (statusTime) {
        statusTime.textContent = `Terakhir update: ${timeStr}`;
    }
}

// Add pulse animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-ring {
        0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
    
    .leaflet-popup-content-wrapper {
        background: #1a1230 !important;
        color: white !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important;
    }
    
    .leaflet-popup-tip {
        background: #1a1230 !important;
    }
    
    .leaflet-control-zoom a {
        background: #1a1230 !important;
        color: white !important;
        border-color: rgba(139, 92, 246, 0.2) !important;
    }
    
    .leaflet-control-zoom a:hover {
        background: #2d1f4e !important;
    }
`;
document.head.appendChild(style);
