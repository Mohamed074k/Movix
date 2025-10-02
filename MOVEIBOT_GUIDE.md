# 🤖 MoveiBot - Panduan Lengkap

## Apa itu MoveiBot?

MoveiBot adalah asisten AI cerdas yang terintegrasi dengan website MoveiHub. Bot ini dirancang untuk membantu pengguna menemukan film dan serial TV yang sesuai dengan preferensi mereka.

## ✨ Fitur Utama

### 🎯 **Rekomendasi Otomatis**
MoveiBot dapat memberikan rekomendasi film berdasarkan:
- Genre favorit (Action, Drama, Komedi, Horror, Sci-fi)
- Film terbaru (2023-2024)
- Rating tertinggi
- Film klasik yang wajib ditonton

### 🧠 **AI Cerdas**
- Menggunakan OpenAI GPT-3.5 Turbo untuk respons yang natural
- Fallback mode dengan database film yang sudah diprogram
- Pattern matching yang canggih untuk memahami pertanyaan

### 📱 **Responsif & User-Friendly**
- Tampilan optimal di semua device
- Mode fullscreen untuk mobile
- Animasi yang smooth dan menarik

## 🚀 Cara Menggunakan

### 1. **Akses MoveiBot**
- Klik tombol chat di pojok kanan bawah website
- MoveiBot akan muncul dengan pesan selamat datang

### 2. **Ajukan Pertanyaan**
Ketik pertanyaan Anda di kotak input dan tekan Enter atau klik tombol kirim.

### 3. **Dapatkan Respons**
MoveiBot akan memberikan jawaban yang relevan dan informatif.

## 💬 Contoh Pertanyaan

### 🎬 **Rekomendasi Umum**
```
"Rekomendasikan film terbaik"
"Saran film yang bagus"
"Apa film yang sedang populer?"
"Film apa yang wajib ditonton?"
```

### 🎭 **Berdasarkan Genre**
```
"Film action terbaik"
"Rekomendasi film drama"
"Film komedi yang lucu"
"Horror film yang menakutkan"
"Sci-fi film terbaik"
```

### 📅 **Film Terbaru**
```
"Film terbaru 2024"
"Film baru yang bagus"
"Apa film terbaru yang patut ditonton?"
```

### ⭐ **Berdasarkan Rating**
```
"Film dengan rating tertinggi"
"Film IMDb terbaik"
"Film dengan score tinggi"
```

### 📺 **Serial TV**
```
"Serial TV terbaik"
"Rekomendasi series"
"TV show yang bagus"
```

### 🎭 **Aktor & Sutradara**
```
"Aktor terbaik Hollywood"
"Sutradara film terbaik"
"Film Leonardo DiCaprio"
"Film Christopher Nolan"
```

### 🎬 **Film Spesifik**
```
"Film Inception"
"The Dark Knight"
"Parasite film"
"Interstellar"
```

## 🔧 Mode Operasi

### 1. **OpenAI Mode** (Primary)
- Menggunakan GPT-3.5 Turbo
- Respons yang sangat natural dan kontekstual
- Memerlukan API key OpenAI
- Dapat menjawab pertanyaan kompleks

### 2. **Fallback Mode** (Backup)
- Database film yang sudah diprogram
- Pattern matching untuk kata kunci
- Berfungsi tanpa API key
- Respons cepat dan akurat

## 🎯 Pattern Matching

MoveiBot menggunakan sistem pattern matching yang canggih:

### **Genre Detection**
- Action: "action", "petualangan", "laga", "fight", "perang"
- Drama: "drama", "serius", "emosional", "sedih", "touching"
- Komedi: "komedi", "lucu", "humor", "comedy", "funny", "tawa"
- Horror: "horror", "seram", "menakutkan", "scary", "hantu"
- Sci-fi: "sci-fi", "fiksi ilmiah", "futuristik", "space", "robot", "alien"

### **Kategori Lain**
- Rekomendasi: "rekomendasi", "saran", "recommend", "apa yang bagus"
- Rating: "rating", "score", "imdb"
- Terbaru: "terbaru", "baru", "2024", "2023"
- Serial: "serial", "tv", "series", "show"
- Aktor: "aktor", "actor", "pemeran"
- Sutradara: "sutradara", "director"

## 📊 Database Film

MoveiBot memiliki database film yang luas termasuk:

### **Film Klasik**
- The Shawshank Redemption (1994)
- The Godfather (1972)
- The Dark Knight (2008)
- Inception (2010)
- Interstellar (2014)

### **Film Terbaru**
- Dune: Part Two (2024)
- Poor Things (2023)
- Oppenheimer (2023)
- Barbie (2023)
- Killers of the Flower Moon (2023)

### **Serial TV**
- Breaking Bad (2008-2013)
- Game of Thrones (2011-2019)
- Stranger Things (2016-sekarang)
- The Crown (2016-2023)
- Wednesday (2022-sekarang)

## 🔧 Setup & Konfigurasi

### **Untuk OpenAI Mode:**
1. Daftar di [platform.openai.com](https://platform.openai.com)
2. Buat API key
3. Tambahkan ke `.env.local`:
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   ```
4. Restart server

### **Fallback Mode:**
- Berfungsi otomatis tanpa setup tambahan
- Database film sudah terprogram
- Respons cepat dan akurat

## 🎨 Fitur UI/UX

### **Animasi**
- Slide-in animations
- Typing indicator
- Hover effects
- Pulse animations

### **Responsivitas**
- Mobile: Mode fullscreen dengan toggle
- Tablet: Ukuran optimal
- Desktop: Floating window

### **Aksesibilitas**
- Keyboard shortcuts (Enter untuk kirim)
- Screen reader support
- High contrast mode

## 🚀 Tips Penggunaan

### **Pertanyaan Efektif**
- Gunakan kata kunci yang spesifik
- Sebutkan genre yang Anda suka
- Tanyakan tentang film terbaru atau klasik
- Minta rekomendasi berdasarkan rating

### **Contoh Pertanyaan Bagus**
```
"Rekomendasikan film action terbaru dengan rating tinggi"
"Film drama yang menyentuh hati"
"Sci-fi film yang mind-blowing"
"Horror film yang tidak terlalu menakutkan"
"Film komedi romantis yang lucu"
```

## 🔍 Troubleshooting

### **MoveiBot Tidak Merespons**
1. Periksa koneksi internet
2. Refresh halaman
3. Coba pertanyaan yang berbeda
4. Periksa console untuk error

### **Respons Tidak Akurat**
1. Gunakan kata kunci yang lebih spesifik
2. Coba pertanyaan dalam bahasa Indonesia
3. Sebutkan genre yang Anda inginkan

### **OpenAI Error**
1. Periksa API key di `.env.local`
2. Pastikan ada kredit di akun OpenAI
3. Fallback mode akan aktif otomatis

## 📈 Pengembangan Selanjutnya

### **Fitur yang Direncanakan**
- Integrasi dengan database TMDB real-time
- Voice input/output
- Personalisasi berdasarkan riwayat chat
- Multi-language support
- Advanced filtering options

### **Peningkatan AI**
- Machine learning untuk personalisasi
- Sentiment analysis
- Context awareness yang lebih baik
- Integration dengan user preferences

---

**MoveiBot** - Your AI Movie Companion 🎬✨

*Dibuat dengan ❤️ untuk pengalaman menonton yang lebih baik* 