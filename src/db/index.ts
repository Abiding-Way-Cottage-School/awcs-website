import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

/**
 * The database handle, created on first use.
 *
 * Nothing here runs at import time: `next build` evaluates every server
 * module with no environment variables at all, and `neon()` throws without a
 * connection string. So the connection is a lazy singleton and callers write
 * `db().select()...` rather than `db.select()...`. The extra parentheses are
 * the whole cost of a build that never needs a database.
 *
 * Neon's HTTP driver has no interactive transactions — `db().transaction()`
 * type-checks but throws at runtime. Use `db().batch([...])` for atomic
 * multi-statement writes.
 */

type Db = ReturnType<typeof connect>;

let instance: Db | undefined;

function connect() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Copy .env.example to .env.local and fill it in, or set it in the Vercel project.',
    );
  }
  return drizzle(neon(url), { schema });
}

export function getDb(): Db {
  return (instance ??= connect());
}

/** Shorthand for `getDb()`; read `db()` as "the database". */
export function db(): Db {
  return getDb();
}

export { schema };
