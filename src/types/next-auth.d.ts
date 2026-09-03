import type { DefaultSession } from 'next-auth';

import type { Role } from '@/db/schema';

/**
 * Auth.js only types `id`, `name`, `email` and `image` on a user. The portal
 * adds a role and the family's name, which the callbacks in auth.config.ts
 * carry from the database row into the token and out into the session.
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role;
      familyName: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    role?: Role;
    familyName?: string | null;
  }
}

/**
 * `next-auth/jwt` only re-exports `@auth/core/jwt` (`export *`), and the
 * callbacks are typed against the latter, so the token augmentation has to
 * land on `@auth/core/jwt` to reach `callbacks.jwt`. The `next-auth/jwt`
 * declaration is kept for anything that imports the type from there.
 */
declare module '@auth/core/jwt' {
  interface JWT {
    id?: string;
    role?: Role;
    familyName?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: Role;
    familyName?: string | null;
  }
}
