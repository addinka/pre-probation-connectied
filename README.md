# Hani & Andi — Digital Wedding Invitation

Undangan pernikahan digital satu halaman yang dibuat berdasarkan file desain `Hani & Andi-Desktop Preview.pdf`.

## Menjalankan project

1. Letakkan folder project di dalam `htdocs` XAMPP.
2. Jalankan Apache.
3. Buka `http://localhost/connected/`.

Koneksi internet diperlukan untuk memuat library dari CDN.

## Stack wajib

- HTML5
- Bootstrap 4.6.2
- jQuery 3.4.1
- AOS 2.3.1
- Swiper 11
- Fancybox 3.5.7

## Fitur

- Layout desktop mengikuti artboard desain 1440 px.
- Layout mobile reflow khusus, tanpa horizontal overflow.
- Countdown aktif menuju 19 September 2026.
- Galeri mobile menggunakan Swiper dan seluruh foto dapat dibuka dengan Fancybox.
- Modal lokasi berbasis Bootstrap.
- Form RSVP dan Wedding Wishes dengan feedback interaktif.
- Musik latar dengan kontrol play/pause yang muncul setelah hero.
- AOS untuk animasi scroll desktop dan dukungan `prefers-reduced-motion`.

## Struktur utama

- `index.html` — struktur dan konten halaman.
- `style.css` — layout desktop, responsive mobile, typography, dan visual.
- `script.js` — countdown, Swiper, Fancybox, musik, RSVP, wishes, dan navigasi.
- `assets/` — font, audio, foto, serta visual underlay hasil ekstraksi desain.

## Catatan aset

`assets/images/design-underlay.svg` mempertahankan pattern, ornament, crop, dan clipping mask dari desain PDF. Teks, form, tombol, navigasi, countdown, galeri, modal, dan seluruh interaksi tetap diimplementasikan sebagai elemen web.

Divider judul, ikon lokasi/upload/kirim, serta transisi antarseksi berakhiran `-ai` diekstrak langsung dari path atau artboard sumber. Tidak ada SVG ornamen dekoratif hasil gambar ulang yang digunakan pada halaman.

Audio latar diberikan oleh pengguna dan dapat dilindungi hak cipta. Pastikan izin publikasi sebelum mengunggah project ke repository publik.
