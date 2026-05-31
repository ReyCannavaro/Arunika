# DESIGN.md — LKBB Arunika

Dokumen ini adalah **single source of truth** untuk seluruh keputusan desain project LKBB Arunika.
Setiap komponen, halaman, dan interaksi harus mengacu pada panduan ini agar tampilan tetap konsisten.

---

## 1. Filosofi Desain

**"Tegas tapi ringan. Resmi tapi modern."**

LKBB Arunika adalah lomba yang serius — tapi platformnya harus terasa seperti produk startup 2025, bukan portal pemerintah. Desain mengutamakan:

- **Clarity** — informasi mudah dibaca, hierarki visual jelas
- **Confidence** — merah yang berani, tipografi yang tegas, bukan pastel atau malu-malu
- **Restraint** — warna aksen digunakan sparingly, bukan dihamburkan di mana-mana
- **Breathability** — whitespace yang generous, tidak padat atau sesak

---

## 2. Color Palette

### Warna Primer

```
--color-primary:        #CC1F1F   /* Merah utama — CTA, aktif, highlight */
--color-primary-hover:  #B01818   /* Hover state merah */
--color-primary-light:  #FEF1F1   /* Background merah sangat muda */
--color-primary-muted:  #F5CBCB   /* Border / accent merah tipis */
```

### Warna Netral (Base)

```
--color-black:          #0F0F0F   /* Heading utama */
--color-gray-900:       #1A1A1A   /* Body text utama */
--color-gray-700:       #3D3D3D   /* Body text sekunder */
--color-gray-500:       #737373   /* Placeholder, caption */
--color-gray-300:       #C4C4C4   /* Border default */
--color-gray-100:       #F4F4F4   /* Background card ringan */
--color-gray-50:        #FAFAFA   /* Background section */
--color-white:          #FFFFFF   /* Base background */
```

### Warna Aksen (Digunakan Sparingly — maks 1-2 per halaman)

Aksen digunakan untuk status badge, tag, highlight kecil — BUKAN untuk background section besar.

```
--color-accent-gold:        #D4A017   /* Juara / highlight penting */
--color-accent-gold-light:  #FDF6E3

--color-accent-blue:        #2563EB   /* Informasi / link */
--color-accent-blue-light:  #EFF6FF

--color-accent-green:       #16A34A   /* Sukses / terverifikasi */
--color-accent-green-light: #F0FDF4

--color-accent-orange:      #EA580C   /* Warning / pending */
--color-accent-orange-light:#FFF7ED

--color-accent-purple:      #7C3AED   /* Label spesial / kategori */
--color-accent-purple-light:#F5F3FF
```

### Penggunaan Warna Aksen

| Konteks                  | Warna yang Digunakan          |
|--------------------------|-------------------------------|
| Status: Terverifikasi    | `accent-green`                |
| Status: Pending          | `accent-orange`               |
| Status: Ditolak          | `color-primary` (merah)       |
| Badge: Kategori/Juri     | `accent-purple`               |
| Badge: Info              | `accent-blue`                 |
| Highlight: Juara/Unggulan| `accent-gold`                 |
| CTA Utama                | `color-primary`               |
| CTA Sekunder             | border `color-gray-900`       |

---

## 3. Typography

Font dipilih untuk memberi kesan **modern, tegas, dan professional** — menghindari Inter/Roboto yang terlalu generik.

```css
/* Import di app.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display:ital@0;1&display=swap');
```

### Font Stack

```
--font-sans:    'DM Sans', system-ui, sans-serif      /* Body, UI, semua teks umum */
--font-display: 'DM Serif Display', Georgia, serif    /* Hero heading, section title besar */
--font-mono:    'JetBrains Mono', monospace           /* Kode, nomor peserta */
```

> **Aturan:** `font-display` HANYA untuk heading hero dan section title utama (H1 di beranda).
> Semua teks UI, label, body — gunakan `font-sans`.

### Type Scale

```
--text-xs:   0.75rem  / 12px   — caption, helper text, timestamp
--text-sm:   0.875rem / 14px   — label form, badge, sub-info
--text-base: 1rem     / 16px   — body text standar
--text-lg:   1.125rem / 18px   — body text besar, card description
--text-xl:   1.25rem  / 20px   — sub-heading kecil
--text-2xl:  1.5rem   / 24px   — heading section (H3)
--text-3xl:  1.875rem / 30px   — heading section (H2)
--text-4xl:  2.25rem  / 36px   — heading halaman (H1 dalam)
--text-5xl:  3rem     / 48px   — hero heading (H1 beranda)
--text-6xl:  3.75rem  / 60px   — hero super besar (desktop)
```

### Font Weight

```
400 — regular body text
500 — medium, UI label, nav link
600 — semibold, card heading, button
700 — bold, section heading
```

### Line Height & Letter Spacing

```
/* Heading */
line-height: 1.1–1.2    letter-spacing: -0.02em   (tight, modern)

/* Body */
line-height: 1.6–1.7    letter-spacing: 0

/* Caption / Label */
line-height: 1.4        letter-spacing: 0.01em
```

---

## 4. Navbar — iOS Floating Style

Navbar mengambang di atas konten dengan efek **backdrop blur** ala iOS/macOS.

### Spesifikasi

```css
.navbar {
  position: fixed;
  top: 16px;                          /* Jarak dari atas layar */
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);           /* Menyisakan margin kiri-kanan */
  max-width: 1200px;
  z-index: 9999;

  /* iOS blur effect */
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  /* Bentuk & border */
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 0 0 0.5px rgba(0, 0, 0, 0.08);

  /* Layout internal */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 56px;
}
```

### Behavior Scroll

```
- Default (top of page): background rgba(255,255,255,0.72), blur aktif
- Setelah scroll 50px: background rgba(255,255,255,0.88), shadow sedikit lebih kuat
- Transisi: transition: all 0.3s ease
```

### Implementasi SvelteKit

```svelte
<script>
  import { onMount } from 'svelte';
  let scrolled = false;

  onMount(() => {
    const handler = () => scrolled = window.scrollY > 50;
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  });
</script>

<nav class="navbar" class:scrolled>
  <!-- Logo -->
  <a href="/" class="logo">
    <img src="/images/logo-arunika-white.png" alt="LKBB Arunika" />
    <span>Arunika</span>
  </a>

  <!-- Nav links -->
  <div class="nav-links">
    <a href="#tentang">Tentang</a>
    <a href="#juri">Dewan Juri</a>
    <a href="#kontak">Kontak</a>
  </div>

  <!-- CTA -->
  <div class="nav-actions">
    <a href="/login" class="btn-ghost">Masuk</a>
    <a href="/register" class="btn-primary">Daftar</a>
  </div>
</nav>

<!-- Spacer supaya konten tidak tertutup navbar -->
<div style="height: 88px;" />
```

### Dark / Hero Section

Saat navbar berada di atas hero section gelap (overlay hitam), aktifkan mode dark:

```css
.navbar.on-dark {
  background: rgba(15, 15, 15, 0.65);
  border-color: rgba(255, 255, 255, 0.12);
  color: white;
}
```

---

## 5. Spacing System

Berbasis kelipatan **4px**, mengikuti Tailwind default.

```
4px   — gap antar elemen sangat rapat (ikon + label)
8px   — gap internal komponen kecil
12px  — padding kecil (badge, tag)
16px  — padding default (card, input)
20px  — padding navbar, gap antar nav item
24px  — gap grid kecil
32px  — gap section dalam halaman
48px  — padding section vertikal (mobile)
64px  — padding section vertikal (desktop)
80px  — section besar (desktop)
120px — hero padding
```

---

## 6. Border Radius

```
--radius-sm:   6px    — input, badge kecil
--radius-md:   10px   — card, button, dropdown
--radius-lg:   14px   — modal, panel besar
--radius-xl:   20px   — section card besar
--radius-full: 9999px — pill badge, avatar
--radius-navbar: 16px — navbar floating (fixed)
```

---

## 7. Shadow System

Shadows digunakan **minimal** — hanya untuk elemen yang perlu elevasi visual.

```
--shadow-xs:  0 1px 2px rgba(0,0,0,0.05)                              — input focus ring subtle
--shadow-sm:  0 2px 8px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.08) — card default, navbar
--shadow-md:  0 4px 16px rgba(0,0,0,0.10)                              — dropdown, popover
--shadow-lg:  0 8px 32px rgba(0,0,0,0.14)                              — modal, dialog
--shadow-cta: 0 4px 14px rgba(204,31,31,0.35)                          — tombol CTA merah (hover)
```

---

## 8. Komponen UI

### Button

```
Tipe          Background         Text        Border            Hover
─────────────────────────────────────────────────────────────────────────
primary       #CC1F1F            white       none              #B01818 + shadow-cta
secondary     white              #0F0F0F     1px #C4C4C4       bg #F4F4F4
ghost         transparent        #3D3D3D     none              bg #F4F4F4
danger        #FEF1F1            #CC1F1F     1px #F5CBCB       bg #F5CBCB
```

Ukuran:

```
sm:  height 32px, padding 0 12px, text-sm,  radius-md
md:  height 40px, padding 0 18px, text-base, radius-md   ← default
lg:  height 48px, padding 0 24px, text-lg,  radius-md
```

### Input & Form

```css
.input {
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  background: white;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(204, 31, 31, 0.12);
  outline: none;
}

.input.error {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}
```

Label selalu di atas input, font-weight 500, font-size text-sm.

### Card

```css
.card {
  background: white;
  border: 1px solid var(--color-gray-200, #E5E5E5);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.card:hover {
  border-color: var(--color-gray-300);
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
}
```

### Badge / Status Pill

```
Status         Background            Text Color          Border
────────────────────────────────────────────────────────────────
Terverifikasi  accent-green-light    accent-green        none
Pending        accent-orange-light   accent-orange       none
Ditolak        primary-light         primary             none
Draf           gray-100              gray-500            none
Aktif          accent-blue-light     accent-blue         none
```

Ukuran badge: `padding: 3px 10px`, `border-radius: full`, `font-size: text-xs`, `font-weight: 500`.

---

## 9. Layout & Grid

### Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;   /* mobile */
}

@media (min-width: 768px) {
  .container { padding: 0 40px; }
}

@media (min-width: 1280px) {
  .container { padding: 0 48px; }
}
```

### Grid System

```
1 kolom  — mobile default (< 768px)
2 kolom  — tablet (768px+) untuk card grid
3 kolom  — desktop (1024px+) untuk fitur/keunggulan
4 kolom  — desktop lebar untuk statistik / mini card
```

### Breakpoints (sesuai Tailwind)

```
sm:   640px
md:   768px
lg:   1024px
xl:   1280px
2xl:  1536px
```

---

## 10. Iconography

Gunakan **Lucide Icons** (sudah bundled di shadcn-svelte). Jangan mix dengan library lain.

```
Ukuran default: 20px (w-5 h-5)
Ukuran kecil:   16px (w-4 h-4) — dalam badge, label
Ukuran besar:   24px (w-6 h-6) — standalone icon
Stroke width:   1.5 (default Lucide)
```

Warna ikon mengikuti parent text color — jangan hardcode warna ikon.

---

## 11. Animasi & Transisi

Prinsip: **purposeful, cepat, tidak mengganggu.**

```css
/* Durasi standar */
--duration-fast:   150ms   — hover state tombol, badge
--duration-normal: 250ms   — dropdown, tooltip
--duration-slow:   350ms   — modal masuk, page transition

/* Easing */
--ease-default: cubic-bezier(0.16, 1, 0.3, 1)    /* snappy, terasa iOS */
--ease-in:      cubic-bezier(0.4, 0, 1, 1)
--ease-out:     cubic-bezier(0, 0, 0.2, 1)
```

### Aturan Animasi

- Hover button: `transition: background-color 150ms, box-shadow 150ms`
- Dropdown masuk: slide down 8px + fade, 250ms ease-out
- Modal masuk: scale dari 0.96 + fade, 300ms ease-out
- Page transition: fade 200ms (via SvelteKit `fly` transition)
- Navbar scroll: `transition: background 300ms, box-shadow 300ms`

**Jangan animasikan:**
- Layout shifts (width/height)
- Konten yang sedang di-load (gunakan skeleton saja)
- Lebih dari 3 elemen sekaligus di satu layar

---

## 12. Halaman Spesifik — Panduan

### Beranda (`/`)

- **Hero:** Full-width, background gambar dengan overlay `rgba(0,0,0,0.52)`, navbar mode dark
- **Heading hero:** `font-display`, ukuran 5xl–6xl, warna white
- **CTA button:** Primary (merah) + Secondary (outline putih)
- **Section keunggulan:** Background `gray-50`, 3 kartu putih dengan ikon `accent-*` masing-masing berbeda warna
- **Section tentang:** Background white, layout 2 kolom (gambar | teks)
- **Section juri:** Background `gray-50`, card juri dengan foto bulat
- **Warna aksen yang boleh muncul:** gold (juara highlight), blue (info), green (statistik positif)

### Form Pendaftaran (`/daftar/[eventId]`)

- Step indicator di atas: 3 langkah, step aktif merah, selesai dengan checkmark hijau
- Layout single column, max-width 680px, centered
- Setiap step dalam satu card putih dengan shadow-sm
- Upload area: border dashed gray-300, hover border primary, background primary-light saat ada file

### Dashboard Peserta (`/dashboard`)

- Layout 2 kolom: sidebar kiri (info tim) + konten kanan (status detail)
- Status pembayaran badge prominent di atas
- Jika ditolak: banner merah dengan catatan admin

### Dashboard Admin (`/admin`)

- Stat cards di atas (4 kolom desktop): total tim, pending, terverifikasi, ditolak
- Warna stat card: hitam (total), orange (pending), green (terverifikasi), merah (ditolak)
- Tabel data dengan zebra striping subtle (row alt: `gray-50`)
- Tombol aksi: "Verifikasi" = green variant, "Tolak" = danger variant

---

## 13. Do's & Don'ts

### ✅ Do

- Gunakan whitespace secara generous — jangan takut kosong
- Satu halaman maksimal 2 warna aksen yang muncul bersamaan
- Konsisten dengan border-radius per tipe komponen
- Navbar selalu floating di semua halaman
- Gunakan `font-display` hanya untuk hero heading

### ❌ Don't

- Jangan gunakan gradien kecuali overlay hero (gradient hitam di atas foto)
- Jangan campur lebih dari 2 font family dalam satu halaman
- Jangan hardcode warna — selalu gunakan CSS variable
- Jangan tambah aksen warna baru di luar palette di atas tanpa diskusi
- Jangan gunakan `font-weight: 800` atau `900` — terlalu berat
- Jangan animasikan `width`, `height`, atau `margin` (costly re-layout)
- Jangan tampilkan lebih dari 3 badge warna berbeda dalam satu komponen

---

## 14. Tailwind Config

```js
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CC1F1F',
          hover:   '#B01818',
          light:   '#FEF1F1',
          muted:   '#F5CBCB',
        },
        accent: {
          gold:    '#D4A017',
          'gold-light': '#FDF6E3',
          blue:    '#2563EB',
          'blue-light': '#EFF6FF',
          green:   '#16A34A',
          'green-light': '#F0FDF4',
          orange:  '#EA580C',
          'orange-light': '#FFF7ED',
          purple:  '#7C3AED',
          'purple-light': '#F5F3FF',
        }
      },
      fontFamily: {
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        navbar: '16px',
        xl:     '20px',
      },
      boxShadow: {
        'cta':  '0 4px 14px rgba(204,31,31,0.35)',
        'card': '0 2px 8px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
```

---

*DESIGN.md — LKBB Arunika | Terakhir diperbarui: Mei 2026 | Versi 1.0*
