import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
    if (!event.locals.session) redirect(302, '/login');

    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '/', ...sessionCookie.attributes
    });

    redirect(302, '/');
  }
};