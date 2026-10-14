# AGENTS.md — pasaree-web

Web lapak/admin Pasaree: pendaftaran lapak, draf produk, stok/harga, pesanan masuk, kurasi, komisi. Repo ini bagian dari divisi Pasaree (Epic E2 Stabil di Hilir).

## Sumber kebenaran

| Dokumen | Tautan |
|---|---|
| BRD Katalog & Produk (BR-201..BR-206) | [BRD/20-katalog-produk.md](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/platform/versions/v1.0.0/BRD/20-katalog-produk.md) |
| BRD Keuangan & Komisi (BR-301..BR-306) | [BRD/30-keuangan-komisi.md](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/platform/versions/v1.0.0/BRD/30-keuangan-komisi.md) |
| PRD (pengguna, alur, kriteria) | [PRD/](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/platform/versions/v1.0.0/PRD/) |
| FSD (alur, model data, kontrak) | [FSD/](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/platform/versions/v1.0.0/FSD/) |
| SRS (fungsional, non-fungsional, acceptance criteria QA) | [SRS/](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/platform/versions/v1.0.0/SRS/) |
| SOP tayang produk (living) | [lapak/10-sop-tayang-produk.md](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/lapak/10-sop-tayang-produk.md) |
| Piagam kurasi (living) | [lapak/00-piagam-kurasi.md](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/lapak/00-piagam-kurasi.md) |
| Kontrak API web Bun (living) | [produk/21-kontrak-api-web-bun.md](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/produk/21-kontrak-api-web-bun.md) |
| Model data katalog (living) | [katalog/10-model-data.md](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/katalog/10-model-data.md) |
| Komisi transparan (living) | [keuangan/10-komisi-transparan.md](https://github.com/Coding-Skuy/Pasaree-TownHall/blob/main/keuangan/10-komisi-transparan.md) |
| Konteks lintas divisi | [KONTEKS-LINTAS-DIVISI.md](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/KONTEKS-LINTAS-DIVISI.md) |
| Roadmap master | [townhall-roadmap.md](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/townhall-roadmap.md) |

Aturan: dilarang menduplikasi requirement di repo kode ini. Requirement berubah = PR di `Pasaree-TownHall` terlebih dahulu (dokumen `platform/versions/v1.0.0/` beku; perubahan masuk versi baru). Dokumen BRD/PRD/FRD/FSD/SRS v1.0.0 sebagian masih templat; sumber isi sah ada di folder living TownHall (`produk/`, `keuangan/`, `katalog/`, `lapak/`, `metrik/`) yang dirujuk di atas.

## Tech stack terkunci

| Aspek | Terkunci | Catatan |
|---|---|---|
| Runtime | Bun 1.4.x (`engines`: >=1.4.0 <1.5.0) | versi exact dikunci saat coding kickoff |
| UI | Svelte 5 + SvelteKit 2 | |
| Bahasa | TypeScript 5.9.x | |
| Pemanggilan API | server load/actions (`+server.ts` proksi) | token tidak terekspos ke browser; CSRF untuk cookie session |
| Draf offline | autosave 10 dtk + outbox IndexedDB | aksi bayar tidak ada di web |
| Delivery | browser saja | tanpa Electron dan tanpa Tauri |

Larangan: Next.js dan React; alur beli/bayar di web; menyimpan JWT di `localStorage`.

Repo sudah di Svelte 5 + SvelteKit 2 + Bun, jadi tidak ada kewajiban migrasi dari Next.js/React. Versi exact (lockfile) ditetapkan saat coding kickoff lewat ADR baru. Catatan: TownHall `produk/10-alur-beli.md` menyebut 'web etalase' untuk pembeli, sedangkan README repo menyatakan tidak ada alur beli di web; sampai TownHall diselaraskan, web hanya lapak/admin.

## Aturan kerja AI

1. Baca `AGENTS.md` ini dan semua ADR di `docs/decisions/` sebelum menulis kode.
2. TDD merah-hijau: tulis test dari acceptance criteria SRS dulu; rilis diblokir bila QA gate gagal.
3. Kontrak API/event hanya diubah lewat bump versi + ADR baru.
4. Commit memakai prefiks `docs:`/`feat:`/`fix:` dan wajib memperbarui `CHANGELOG.md` repo.
5. Keputusan arsitektur baru = tambah ADR bernomor di `docs/decisions/`; jangan edit ADR lama (immutable, sama seperti aturan versi TownHall).
6. Dilarang menyentuh DB divisi lain (DB per service; Titeny read-only). DB milik repo ini: `pasaree`; JWT audiens `pasaree`.
7. Aturan uang Pasaree: Komisi 8% (paket-hampers 10%, lapak baru 5% selama 30 hari) dipotong dari payout lapak, BUKAN dari pembeli; biaya layanan Rp2.000 per checkout masuk operasional Pasaree; ongkir 100% ke kas trip Lumbung; escrow via kasir, payout dieksekusi Lumbung T+1 hari kerja; uang integer IDR, komisi `floor()`.
8. Dokumen v1.0.0 di `versions/v1.0.0/docs/` beku dan tidak ditimpa; tambahan arsitektur ada di `docs/ARSITEKTUR-AI-DEV.md`.

## Definisi selesai

Dari [townhall-roadmap.md](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/townhall-roadmap.md) §6:

- Dokumen versi lengkap (BRD/FRD/FSD/PRD/SRS) + `SNAPSHOT-ROADMAP.md` di TownHall.
- QA gate berbasis SRS lulus (TDD merah-hijau); rilis diblokir bila gagal.
- Kontrak API terbit; audit keamanan bersih (JWT audiens `pasaree` + DB per service).
- Bukti metrik lintas-divisi (KONTEKS §7) tercatat.
- CHANGELOG versi diperbarui; dokumen beku tidak diedit.
