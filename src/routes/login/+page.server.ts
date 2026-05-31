import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { lucia } from '$lib/server/auth';
import { users } from '../../db/schema';
import { verify } from '@node-rs/argon2';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { Actions } from './$types';

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const result = loginSchema.safeParse({
      email:    formData.get('email'),
      password: formData.get('password'),
    });

    if (!result.success) {
      return fail(400, { message: 'Input tidak valid' });
    }

    const { email, password } = result.data;

    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    });

    if (!user) {
      return fail(400, { message: 'Email atau password salah' });
    }

    const validPassword = await verify(user.passwordHash, password);
    if (!validPassword) {
      return fail(400, { message: 'Email atau password salah' });
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '/', ...sessionCookie.attributes
    });

    // Role-based redirect
    redirect(302, user.role === 'admin' ? '/admin' : '/dashboard');
  }
};