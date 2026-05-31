import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user
			? {
					username: locals.user.username,
					role: locals.user.role
				}
			: null
	};
};
