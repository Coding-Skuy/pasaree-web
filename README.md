# pasaree-web

Web lapak dan admin Marketplace Pasaree. Divisi Pasaree (Marketplace), org Coding-Skuy. Template Opsi A.

Rujukan utama: [Pasaree-TownHall](https://github.com/Coding-Skuy/Pasaree-TownHall) — baca `lapak/10-sop-tayang-produk.md`, `produk/21-kontrak-api-web-bun.md`, `platform/50-web-bun-svelte.md`.

## Peran

- Pendaftaran lapak, draf produk, stok dan harga, pesanan masuk, kurasi.
- Tidak ada alur beli di sini. Beli hanya di `pasaree-app-kmp`.
- Autosave dan outbox IndexedDB untuk draf. Aksi bayar tidak ada di web.

## Stack Terkunci

- Bun 1.4.x
- Svelte 5
- SvelteKit 2
- TypeScript 5.9.x
- Via browser saja. Tanpa Electron dan tanpa Tauri.

## Struktur

```
src/routes/+page.svelte   Dasbor lapak
src/lib/lapak.ts          Tipe Lapak, Produk, status draf dan tayang
svelte.config.js          Adapter otomatis
```

## Mulai Cepat

1. Pasang Bun 1.4.x.
2. Jalankan `bun install`.
3. Jalankan `bun run dev` lalu buka alamat yang tampil.
4. Salin `.env.example` menjadi `.env` dan isi `PASAREE_API_BASE_URL` ke `pasaree-backend-service`.
