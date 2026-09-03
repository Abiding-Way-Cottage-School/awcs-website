import { defineConfig } from 'drizzle-kit';

/**
 * drizzle-kit reads ./.env on its own and never .env.local, which is where
 * Next.js keeps secrets — so the db:migrate and db:studio scripts in
 * package.json pass `--env-file=.env.local` to Node. `db:generate` only reads
 * the schema and never connects, so it works with no environment at all.
 */
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_URL ?? '' },
});
