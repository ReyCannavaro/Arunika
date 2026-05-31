import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { lucia } from '$lib/server/auth';
import { users } from '../../db/schema';
import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { Actions } from './$types';

const registerSchema = z.object({
  email:    z.string().email('Email tidak valid'),
  username: z.string().min(3, 'Username minimal 3 karakter').max(30),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const raw = {
      email:    formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
    };

    const result = registerSchema.safeParse(raw);
    if (!result.success) {
      return fail(400, { errors: result.error.flatten().fieldErrors });
    }

    const { email, username, password } = result.data;

    const existing = await db.query.users.findFirst({
      where: eq(users.email, email)
    });
    if (existing) {
      return fail(400, { errors: { email: ['Email sudah terdaftar'] } });
    }

    const passwordHash = await hash(password, {
      memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1
    });
    const userId = generateIdFromEntropySize(10);

    await db.insert(users).values({
      id: userId, email, username, passwordHash, role: 'user'
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '/', ...sessionCookie.attributes
    });

    redirect(302, '/dashboard');
  }
};