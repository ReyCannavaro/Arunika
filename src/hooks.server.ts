import { lucia } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

const PROTECTED_USER  = ['/dashboard', '/daftar', '/profil'];
const PROTECTED_ADMIN = ['/admin'];
const GUEST_ONLY = ['/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
	} else {
		const { session, user } = await lucia.validateSession(sessionId);

		if (session?.fresh) {
			const cookie = lucia.createSessionCookie(session.id);
			event.cookies.set(cookie.name, cookie.value, { path: '/', ...cookie.attributes });
		}
		if (!session) {
			const cookie = lucia.createBlankSessionCookie();
			event.cookies.set(cookie.name, cookie.value, { path: '/', ...cookie.attributes });
		}

		event.locals.user    = user;
		event.locals.session = session;
	}

	const path = event.url.pathname;

	if (!event.locals.user) {
		if (PROTECTED_USER.some((p) => path.startsWith(p)) ||
		    PROTECTED_ADMIN.some((p) => path.startsWith(p))) {
			redirect(302, `/login?redirect=${encodeURIComponent(path)}`);
		}
	}

	if (event.locals.user && GUEST_ONLY.some((p) => path.startsWith(p))) {
		redirect(302, event.locals.user.role === 'admin' ? '/admin' : '/dashboard');
	}

	if (event.locals.user?.role === 'user' && PROTECTED_ADMIN.some((p) => path.startsWith(p))) {
		redirect(302, '/dashboard');
	}

	return resolve(event);
};
