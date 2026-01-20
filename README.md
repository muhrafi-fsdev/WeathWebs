# 🌤️ CuacaKu Indonesia - BMKG Weather App

Aplikasi prakiraan cuaca Indonesia dengan data real-time dari **BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)**. Menampilkan informasi cuaca, gempa bumi, gelombang laut, dan peringatan dini bencana.

![CuacaKu Preview](screenshots/preview.png)

## ✨ Fitur

### 🌡️ Prakiraan Cuaca
- Prakiraan cuaca per kelurahan/desa di seluruh Indonesia
- Data 3 harian dengan update per 3 jam
- Informasi lengkap: suhu, kelembaban, angin, tutupan awan, jarak pandang
- Pencarian lokasi berdasarkan nama kelurahan/kecamatan/kota

### 🌍 Informasi Gempa Bumi
- Gempa terbaru secara real-time
- Daftar 15 gempa terakhir (M5.0+)
- Peta interaktif dengan lokasi gempa
- Shakemap dari BMKG
- **Notifikasi otomatis** untuk gempa signifikan (M ≥ 4.0)

### 🌊 Cuaca Maritim
- Prakiraan gelombang laut di perairan Indonesia
- Klasifikasi gelombang (Tenang, Rendah, Sedang, Tinggi)
- Kecepatan dan arah angin laut
- Peta interaktif perairan

### ⚠️ Peringatan Dini
- Peringatan cuaca ekstrem (nowcast)
- Notifikasi push untuk peringatan penting
- Tingkat peringatan: Info, Waspada, Bahaya

## 🚀 Deploy ke GitHub Pages

### Langkah 1: Fork/Clone Repository
```bash
git clone https://github.com/yourusername/cuacaku-indonesia.git
cd cuacaku-indonesia
```

### Langkah 2: Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit - CuacaKu Weather App"
git branch -M main
git remote add origin https://github.com/yourusername/cuacaku-indonesia.git
git push -u origin main
```

### Langkah 3: Aktifkan GitHub Pages
1. Buka repository di GitHub
2. Pergi ke **Settings** > **Pages**
3. Di bagian "Source", pilih **Deploy from a branch**
4. Pilih branch `main` dan folder `/ (root)`
5. Klik **Save**

Dalam beberapa menit, website akan tersedia di:
```
https://yourusername.github.io/cuacaku-indonesia/
```

## 📁 Struktur File

```
cuacaku-indonesia/
├── index.html          # Halaman utama
├── app.js              # Logic aplikasi & API calls
├── sw.js               # Service Worker untuk PWA
├── manifest.json       # PWA manifest
├── icons/              # App icons
│   ├── icon.svg
│   ├── icon-192.png
│   └── icon-512.png
└── README.md           # Dokumentasi
```

## 🔗 API BMKG yang Digunakan

### Prakiraan Cuaca
```
https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={kode_wilayah}
```
- Kode wilayah mengacu pada [Keputusan Mendagri No. 100.1.1-6117 Tahun 2022](https://www.kemendagri.go.id/)
- Contoh: `31.71.03.1001` untuk Kemayoran, Jakarta Pusat

### Gempa Bumi
```
https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json     # Gempa terbaru
https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json  # 15 gempa M5.0+
https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json # Gempa dirasakan
```

### Cuaca Maritim
```
https://peta-maritim.bmkg.go.id/public_api/perairan
```

### Peringatan Dini (CAP Format)
```
https://data.bmkg.go.id/DataMKG/MEWS/
```

## 🛠️ Teknologi

- **HTML5, CSS3, JavaScript** - Frontend
- **Leaflet.js** - Peta interaktif
- **PWA** - Progressive Web App dengan offline support
- **Service Worker** - Background sync & push notifications
- **BMKG Open Data API** - Sumber data resmi

## 📱 PWA Features

- ✅ Installable sebagai aplikasi
- ✅ Offline support
- ✅ Push notifications untuk gempa & peringatan
- ✅ Background sync untuk update data
- ✅ Responsive design (mobile & desktop)

## ⚡ Penggunaan

### Pencarian Lokasi
Ketik nama kelurahan, kecamatan, atau kota di kotak pencarian untuk mendapatkan prakiraan cuaca lokasi spesifik.

### Notifikasi
Klik tombol "Aktifkan Notifikasi" untuk menerima peringatan gempa dan cuaca ekstrem.

### Offline Mode
Aplikasi akan tetap berfungsi saat offline dengan data yang sudah di-cache.

## 📋 Kode Wilayah

Beberapa contoh kode wilayah yang tersedia:

| Kode | Lokasi |
|------|--------|
| 31.71.01.1001 | Gambir, Jakarta Pusat |
| 31.71.03.1001 | Kemayoran, Jakarta Pusat |
| 32.75.01.1001 | Bekasi Utara |
| 32.73.01.1001 | Bandung Wetan |
| 35.78.01.1001 | Surabaya Pusat |
| 51.71.01.1001 | Denpasar Utara |

## 📄 Lisensi

MIT License - Bebas digunakan dan dimodifikasi.

## 🙏 Credits

- Data resmi dari [BMKG](https://www.bmkg.go.id)
- Maps dari [OpenStreetMap](https://www.openstreetmap.org) & [CARTO](https://carto.com)
- Icons dari Emoji standard

---

**⚠️ Disclaimer**: Aplikasi ini menggunakan data resmi dari BMKG. Selalu ikuti arahan resmi dari BMKG dan BNPB untuk keselamatan.

**📧 Kontak**: Untuk pertanyaan atau saran, silakan buat issue di repository ini.
