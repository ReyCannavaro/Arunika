import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { events } from '../db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const activeEvent = await db.query.events.findFirst({
		where: eq(events.status, 'aktif'),
		orderBy: (e, { desc }) => [desc(e.createdAt)],
	}).catch(() => null);

	return {
		user: locals.user ?? null,
		activeEvent,
	};
};
