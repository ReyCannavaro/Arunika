import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tims, events, personils } from '../../db/schema';
import { eq } from 'drizzle-orm';
export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const tim = await db
		.select({
			id:                 tims.id,
			asalSekolah:        tims.asalSekolah,
			namaSatuan:         tims.namaSatuan,
			namaPasukan:        tims.namaPasukan,
			jumlahPasukan:      tims.jumlahPasukan,
			statusPembayaran:   tims.statusPembayaran,
			buktiPembayaranUrl: tims.buktiPembayaranUrl,
			catatanAdmin:       tims.catatanAdmin,
			createdAt:          tims.createdAt,
			namaEvent:          events.namaEvent,
			tahunEvent:         events.tahun,
			statusEvent:        events.status,
			eventId:            events.id,
		})
		.from(tims)
		.leftJoin(events, eq(tims.eventId, events.id))
		.where(eq(tims.userId, user.id))
		.limit(1)
		.then((rows) => rows[0] ?? null);

	const anggota = tim
		? await db
				.select()
				.from(personils)
				.where(eq(personils.timId, tim.id))
		: [];

	const activeEvent = !tim
		? await db.query.events
				.findFirst({ where: eq(events.status, 'aktif') })
				.catch(() => null)
		: null;

	return {
		user: {
			id:       user.id,
			username: user.username,
			email:    user.email,
		},
		tim,
		anggota,
		activeEvent,
	};
};
