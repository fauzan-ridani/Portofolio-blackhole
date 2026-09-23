# Portfolio — Black Hole hero

Struktur Next.js (App Router) dengan latar animasi "black hole" (dari
`Blackhole.zip` kamu) yang punya efek parallax mengikuti pointer.

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Yang perlu kamu ganti

1. **`lib/data.js`** — semua teks: nama, headline, deskripsi proyek,
   email, link sosial. Semua yang ditandai `← GANTI` wajib diisi.
2. **Font** — `app/globals.css` memuat font (Fraunces + Inter) lewat
   `@import` dari Google Fonts, supaya pratinjau cepat. Untuk produksi,
   pindahkan ke `next/font/google` di `app/layout.jsx` supaya font
   ikut di-cache dan tidak flash saat load:

   ```jsx
   import { Fraunces, Inter } from "next/font/google";
   const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
   const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
   // lalu tempel fraunces.variable + inter.variable ke className <body>,
   // dan hapus baris --font-display / --font-body dari :root di globals.css
   ```

3. **Favicon & metadata** — `app/layout.jsx` (`metadata.title`,
   `metadata.description`).

## Tentang latar black hole (`lib/blackHole.js`)

Ini hasil port dari `script.js` di `Blackhole.zip`, dengan perubahan:

- **Parallax** — lapisan canvas, glow, dan aura bergeser tipis mengikuti
  posisi pointer (dihaluskan, bukan langsung nempel). Elemen lain bisa
  ikut efek yang sama cukup dengan menambah atribut
  `data-parallax="0.25"` (angka = seberapa jauh geraknya, 0–1-an).
  Contoh sudah dipasang di `.hero-inner` (lihat `components/Hero.jsx`).
- **Di HP** (layar sentuh, tidak ada mouse) parallax pointer diganti
  gerak melayang pelan otomatis, supaya tetap terasa hidup.
- **`prefers-reduced-motion`** dihormati: kalau pengguna mematikan
  animasi di OS-nya, latar jadi satu frame statis tanpa parallax.
- Animasi berhenti dihitung kalau posisi scroll sudah jauh dari hero
  (hemat CPU/baterai saat orang sedang baca bagian bawah halaman).
- Semua `requestAnimationFrame` dan event listener dilepas dengan benar
  saat komponen unmount (aman dipakai di Next.js / React).
- Tidak ada lagi dependensi ke CDN (`esm.sh`) seperti versi aslinya.

## Struktur

```
app/
  layout.jsx     ← shell HTML + metadata
  page.jsx        ← menyusun semua section
  globals.css     ← semua styling
components/
  BlackHole.jsx   ← wrapper React untuk latar animasi
  Navbar.jsx
  Hero.jsx
  Work.jsx        ← daftar proyek
  About.jsx
  Contact.jsx
lib/
  blackHole.js    ← engine canvas + parallax (plain JS, tanpa React)
  data.js         ← SEMUA teks/konten ada di sini
```

## Menambah proyek

Tambah objek baru ke array `projects` di `lib/data.js` — otomatis
muncul di daftar "Selected work".
# Portofolio-blackhole
