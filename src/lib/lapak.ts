export type StatusProduk = 'draf' | 'menunggu_kurasi' | 'tayang' | 'ditolak';

export interface Lapak {
	id: string;
	nama: string;
	titik_serah_lumbung_id: string;
	aktif: boolean;
}

export interface Produk {
	id: string;
	lapak_id: string;
	nama: string;
	harga_idr: number;
	stok: number;
	status: StatusProduk;
}

export function dapatTayang(p: Produk): boolean {
	return p.status === 'tayang' && p.stok > 0 && p.harga_idr > 0;
}

export const CONTOH_LAPAK: Lapak = {
	id: '01J0000000000000000000000',
	nama: 'Lapak Contoh Sleman',
	titik_serah_lumbung_id: 'titik-sleman-01',
	aktif: true
};
