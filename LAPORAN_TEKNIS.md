# LAPORAN TEKNIK WEBPAGE PORTAL PT SINAR PANGAN DIGITAL

---

## 1. PENJELASAN STRUKTUR FOLDER

Proyek dikembangkan menggunakan arsitektur web statis multi-halaman berbasis **HTML5**, **CSS3 (Vanilla)**, dan **JavaScript (Vanilla ES6)** tanpa ketergantungan pada backend server-side. Struktur folder disusun dengan prinsip modularitas, efisiensi pemeliharaan (*maintainability*), dan standar industri front-end.

```
d:\xampp\htdocs\uji kompetensi\
├── index.html           # Halaman Utama / Beranda (Hero Section & Stat Perusahaan)
├── tentang.html         # Halaman Profil Perusahaan (Sejarah, Profil, Visi & Misi)
├── produk.html          # Halaman Katalog Produk (Integrasi Filter Kategori JS)
├── artikel.html         # Halaman Artikel & Tips Pangan (Blog Grid)
├── kontak.html          # Halaman Kontak & Form Pesan (Integrasi Validasi JS)
├── css/
│   └── style.css        # Stylesheet utama (Design Tokens, Glassmorphism, Responsive Breakpoints)
├── js/
│   └── app.js           # Logic skrip interaktif (Filter Produk, Validasi Form, Toast Notif)
└── img/
    ├── logo.svg         # Logo vektor identitas PT Sinar Pangan Digital
    ├── bg.jpg           # Gambar latar belakang (background) utama website
    └── bg.svg           # File pola latar belakang vektor cadangan
```

### Fungsi Utama Setiap Komponen:
- **Root `.html` Files**: Setiap halaman HTML merupakan file independen yang memuat konten spesifik namun berbagi stylesheet (`css/style.css`) dan skrip (`js/app.js`) yang sama.
- **Folder `css/`**: Menyimpan file `style.css` yang mendefinisikan *Design System* (Custom Variables `:root`), layout responsif, efek *glassmorphism*, typography, dan styling gambar background.
- **Folder `js/`**: Menyimpan file `app.js` yang mengontrol seluruh logika interaktif *client-side*. Skrip ini mendeteksi keberadaan elemen DOM secara kondisional sehingga aman dieksekusi di halaman mana pun.
- **Folder `img/`**: Wadah terpusat untuk seluruh aset gambar web, termasuk logo perusahaan (`logo.svg`) dan gambar latar belakang (`bg.jpg`).

---

## 2. DESAIN NAVIGASI

Desain navigasi dirancang dengan pendekatan **Mobile-First** dan memenuhi prinsip **Web Accessibility (A11y)** untuk memastikan pengalaman pengguna (UX) yang mulus di berbagai perangkat.

### Elemen & Karakteristik Navigasi:
1. **Header Navigasi Melayang (*Sticky Glassmorphism Navbar*)**:
   - Memanfaatkan properti `position: sticky; top: 0;` dengan kombinasi `backdrop-filter: blur(24px)` dan background semi-transparan (`rgba(6,13,19,.88)`).
   - Menjaga navigasi tetap dapat diakses di mana saja saat pengguna melakukan *scroll*.
2. **Indikator Halaman Aktif (*Active State Indicator*)**:
   - Setiap halaman memiliki penanda visual jelas pada menu navigasi (`.nav-link.active`) menggunakan gradien hijau khas perusahaan dan bayangan berpijar (*glow shadow*).
   - Dilengkapi atribut `aria-current="page"` untuk mendukung pembaca layar (*screen readers*).
3. **Responsif Multi-Device (3 Breakpoints)**:
   - **Layar Ponsel (<768px)**: Menu otomatis terlipat ke dalam tombol *hamburger toggle* Bootstrap 5.
   - **Layar Tablet (768px - 1023px)**: Penyesuaian jarak (*padding*) dan ukuran teks agar pas di layar sedang.
   - **Layar Komputer (≥1024px)**: Menu horizontal penuh dengan efek transisi *hover* yang lembut.
4. **Prinsip Aksesibilitas & Ramah Pengguna**:
   - **Skip Link**: Menyediakan tautan tersembunyi `Langsung ke konten utama` bagi pengguna navigasi keyboard (`Tab`).
   - **Focus Visible**: Menggunakan garis luar hijau menyala (`outline: 3px solid #34d399`) untuk indikasi fokus keyboard yang jelas.
5. **Footer Navigasi Terpadu**:
   - Menyediakan tautan pintas (*sitemap*) dan kategori produk di bagian bawah setiap halaman.

---

## 3. FITUR INTERAKTIF YANG DIBUAT

Seluruh fitur interaktif dikembangkan menggunakan **Vanilla JavaScript murni** (tanpa library berat seperti jQuery), menghasilkan performa eksekusi yang sangat cepat dan ringan.

### A. Filter Kategori Produk Dinamis (`initProductFilter`)
- **Lokasi**: [produk.html](file:///d:/xampp/htdocs/uji%20kompetensi/produk.html) & [js/app.js](file:///d:/xampp/htdocs/uji%20kompetensi/js/app.js)
- **Fungsi**: Menyaring daftar produk secara instan tanpa melakukan *reload* halaman.
- **Kategori**: Semua, Beras, Minyak Goreng, Tepung, Bumbu & Rempah, Gula.
- **Mekanisme Kerja**:
  1. Data produk disimpan dalam array JavaScript bermuatan objek.
  2. Saat tombol kategori diklik, skrip memicu efek menghilang (*fade-out & scale down*) pada kartu yang ada.
  3. Menggunakan `setTimeout`, DOM memperbarui item yang sesuai kriteria filter dan memunculkannya kembali dengan animasi bertahap (*staggered animation*).
  4. Badge jumlah produk (`#productCount`) diupdate secara dinamis (contoh: "Menampilkan 6 produk").

### B. Validasi Form Kontak Real-Time (`initContactForm`)
- **Lokasi**: [kontak.html](file:///d:/xampp/htdocs/uji%20kompetensi/kontak.html) & [js/app.js](file:///d:/xampp/htdocs/uji%20kompetensi/js/app.js)
- **Fungsi**: Memastikan keabsahan data sebelum formulir dikirimkan.
- **Aturan Validasi**:
  - **Nama Lengkap**: Wajib diisi, minimal 3 karakter, maksimal 100 karakter.
  - **Email**: Wajib diisi, harus memenuhi ekspresi reguler (Regex) standar email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  - **No. Telepon**: Wajib diisi, harus sesuai format nomor telepon Indonesia (diawali `08` atau `+62` dengan panjang 10-15 digit).
  - **Subjek**: Wajib memilih salah satu opsi dropdown.
  - **Pesan**: Wajib diisi, minimal 10 karakter, maksimal 500 karakter.
- **Fitur Interaktif Tambahan**:
  - **Real-time Feedback**: Input diperiksa pada event `blur` (saat meninggalkan field) dan event `input` saat ada perbaikan. Field valid akan bergaris hijau (`.is-valid`), sedangkan field salah bergaris merah (`.is-invalid`) lengkap dengan pesan error spesifik.
  - **Live Character Counter**: Menampilkan jumlah karakter pesan secara *real-time* (`#charCount`, contoh: `45/500`) dan berubah warna menjadi kuning/merah jika mendekati batas.
  - **Submission Handling**: Jika ada kesalahan, fokus otomatis diarahkan ke field error pertama. Saat valid, tombol berubah menjadi status *loading spinner*, mereset form, dan memunculkan notifikasi sukses.

### C. Sistem Notifikasi Toast Global (`showToast`)
- **Lokasi**: [js/app.js](file:///d:/xampp/htdocs/uji%20kompetensi/js/app.js)
- **Fungsi**: Widget notifikasi melayang yang muncul dari sudut kanan bawah dengan animasi *cubic-bezier spring*.
- **Indikator**: Varian `success` (hijau) untuk respon berhasil, dan `error` (merah) untuk respon kesalahan.

### D. Pengaturan Gambar Latar Belakang Kustom (*Custom Image Background*)
- **Lokasi**: [css/style.css](file:///d:/xampp/htdocs/uji%20kompetensi/css/style.css)
- **Fungsi**: Mengatur gambar latar belakang secara terpusat melalui file `img/bg.jpg`.
- **Fitur**: Dilengkapi overlay gradien semi-transparan `linear-gradient(rgba(6, 13, 19, 0.75), rgba(6, 13, 19, 0.75))` untuk menjaga kontras rasio legibilitas teks di atas latar belakang foto.

---
*Laporan Teknik disiapkan untuk Dokumentasi Pengembangan Website PT Sinar Pangan Digital.*
