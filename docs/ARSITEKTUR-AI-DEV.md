# Arsitektur AI-dev pasaree-web

Dokumen tambahan untuk `versions/v1.0.0/docs/40-TECHSTACK.md` dan `60-BLAST-RADIUS.md` (kedua file itu beku v1.0.0 dan hanya berisi ringkasan; jangan ditimpa). Rujukan versi: [Pasaree-TownHall v1.0.0](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/platform/versions/v1.0.0/CHANGELOG.md).

## Matriks stack dan fitur

| Aspek | Terkunci | Catatan |
|---|---|---|
| Runtime | Bun 1.4.x (`engines`: >=1.4.0 <1.5.0) | versi exact dikunci saat coding kickoff |
| UI | Svelte 5 + SvelteKit 2 | |
| Bahasa | TypeScript 5.9.x | |
| Pemanggilan API | server load/actions (`+server.ts` proksi) | token tidak terekspos ke browser; CSRF untuk cookie session |
| Draf offline | autosave 10 dtk + outbox IndexedDB | aksi bayar tidak ada di web |
| Delivery | browser saja | tanpa Electron dan tanpa Tauri |

Larangan: Next.js dan React; alur beli/bayar di web; menyimpan JWT di `localStorage`.

| Fitur | Produsen | Operator lapak | Kurator | Admin |
|---|---|---|---|---|
| CRUD draf + ajukan kurasi | ya | ya | - | - |
| Stok dan harga | ya | ya | - | - |
| Ubah rekening payout | ya | tidak | - | - |
| Pesanan masuk (konfirmasi, serah trip) | ya | ya | - | - |
| Setujui/revisi/tolak/takedown | - | - | ya | ya |
| Kategori, tarif komisi, takedown permanen | - | - | - | ya |
| Kalkulator komisi + laporan CSV | ya | ya | - | ya |

## Blast radius

Batas context repo (townhall-roadmap §2: komisi 8% transparan, escrow T+1; katalog jujur; fulfillment wajib via trip Lumbung).

Boleh disentuh:

- UI lapak/admin/kurasi, proksi server SvelteKit ke API Pasaree v1 (`/web/*`).
- IndexedDB untuk draf dan outbox.

Dilarang:

- Alur beli/bayar; membuat trip atau mengubah ongkir (milik Lumbung).
- Mengubah slug lapak atau SKU setelah produk pertama tayang.
- Akses langsung ke DB atau ke API Lumbung.

Kontrak dikonsumsi:

- REST Pasaree v1 (kontrak `produk/21-kontrak-api-web-bun.md`).

Kontrak diproduksi:

- Tidak memproduksi API; hanya klien.

Catatan: Pasaree tidak mengonsumsi modul `:shared:pantry-resep` (milik Pawonee). Failure utama: kontrak berubah tanpa update SRS, test tidak mengikuti acceptance criteria, rollback tidak siap. Rollback: revert commit repo ini dan kembali ke kontrak Pasaree-TownHall v1.0.0.
