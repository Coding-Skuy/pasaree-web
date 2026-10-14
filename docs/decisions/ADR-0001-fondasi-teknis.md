# ADR-0001 — Fondasi teknis pasaree-web

Status: Diterima | Tanggal: 2026-10-14

## Konteks

pasaree-web adalah repo `web` divisi Pasaree. Spesifikasi v1.0.0 dibekukan 2026-10-07 di Pasaree-TownHall (`platform/versions/v1.0.0/`). Dokumen TECHSTACK dan BLAST-RADIUS v1.0.0 di repo ini masih ringkas, sehingga fondasi teknis dikunci di ADR ini sebelum coding kickoff.

## Keputusan

1. Stack terkunci: Bun 1.4.x + Svelte 5 + SvelteKit 2 + TypeScript 5.9.x; dilarang Next.js/React; versi exact dikunci saat coding kickoff.
2. Web hanya untuk lapak, kurator, dan admin; alur beli dan bayar hanya di `pasaree-app-kmp`.
3. Token tidak pernah sampai ke browser: semua panggilan API lewat server load/actions SvelteKit; JWT audiens `pasaree`.
4. Draf produk dijaga autosave 10 detik + outbox IndexedDB agar tidak hilang saat luring.
5. Uang selalu integer IDR; komisi dibulatkan ke bawah (`floor()`) per baris item. Komisi 8% (paket-hampers 10%, lapak baru 5% selama 30 hari) dipotong dari payout lapak, BUKAN dari pembeli; biaya layanan Rp2.000 per checkout masuk operasional Pasaree; ongkir 100% ke kas trip Lumbung; escrow via kasir, payout dieksekusi Lumbung T+1 hari kerja; uang integer IDR, komisi `floor()`.
6. Katalog jujur: harga tampil = harga bayar sebelum ongkir; komisi tertera terpisah dan tidak dibebankan ke pembeli; dilarang mark-up tersembunyi.
7. Fulfillment fisik wajib via trip Lumbung; Pasaree tidak membangun armada, gudang, atau kasir kas sendiri.
8. Rekonsiliasi Pasaree-Lumbung harian; selisih >Rp1.000 atau status menggantung >2x24 jam menjadi tiket prioritas tinggi.
9. Perubahan tarif umum diumumkan 14 hari sebelum berlaku.

## Konsekuensi

- Semua pekerjaan repo ini mengikuti `AGENTS.md`; menyimpang dari keputusan di atas butuh ADR baru bernomor berikutnya.
- Dokumen TownHall tetap sumber requirement; repo ini tidak menyalin requirement, hanya menautkannya.
- Pelanggaran batas (DB lintas divisi, komisi ke pembeli, fulfillment di luar trip Lumbung) dianggap cacat dan diblokir di review.
