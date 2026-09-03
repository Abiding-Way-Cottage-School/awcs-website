import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

/**
 * The Family Portal's tables.
 *
 * JS keys are camelCase; database names are snake_case. The first four tables
 * are the exact shape @auth/drizzle-adapter needs. Its contract is the JS
 * keys, not the column names, which is why `refresh_token` and friends keep
 * their snake_case keys: Auth.js spreads the raw token response straight into
 * `linkAccount`, and Drizzle drops any key that does not match a column.
 *
 * No `import 'server-only'` here on purpose: drizzle-kit loads this file in a
 * plain Node process to generate migrations, and that marker would break it.
 * `src/db/index.ts` carries the marker instead, and it is the only module
 * that opens a connection.
 */

export type Role = 'admin' | 'family';
export type DocumentKind = 'file' | 'link';
export type PaymentStatus = 'due' | 'paid' | 'waived';

const uuidId = () =>
  text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

const createdAt = () =>
  timestamp('created_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull();

// ---- Auth.js ---------------------------------------------------------------

export const users = pgTable('user', {
  id: uuidId(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  // Portal fields. The adapter's createUser inserts only what Auth.js knows
  // about, so each of these must be nullable or carry a default.
  role: text('role').$type<Role>().notNull().default('family'),
  familyName: text('family_name'),
  active: boolean('active').notNull().default(true),
  createdAt: createdAt(),
  createdBy: text('created_by'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (t) => [primaryKey({ columns: [t.provider, t.providerAccountId] })],
);

export const sessions = pgTable('session', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

// ---- Portal ----------------------------------------------------------------

/**
 * A resource on the family Resources page: either an external link or a file
 * in Vercel Blob. For files `url` is the private blob URL, which the browser
 * can never fetch — it stays on the server and downloads go through the
 * authenticated route handler.
 */
export const documents = pgTable(
  'documents',
  {
    id: uuidId(),
    title: text('title').notNull(),
    description: text('description'),
    category: text('category').notNull().default('General'),
    kind: text('kind').$type<DocumentKind>().notNull(),
    url: text('url').notNull(),
    blobPathname: text('blob_pathname'),
    filename: text('filename'),
    contentType: text('content_type'),
    sizeBytes: integer('size_bytes'),
    sortOrder: integer('sort_order').notNull().default(0),
    visible: boolean('visible').notNull().default(true),
    createdAt: createdAt(),
    createdBy: text('created_by'),
  },
  (t) => [index('documents_category_sort_idx').on(t.category, t.sortOrder)],
);

/** A form families sign. Editing an assigned form bumps `version`. */
export const forms = pgTable('forms', {
  id: uuidId(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  version: integer('version').notNull().default(1),
  active: boolean('active').notNull().default(true),
  createdAt: createdAt(),
  createdBy: text('created_by'),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }),
});

/**
 * One family's copy of one version of a form. Signing snapshots the body so
 * the record stays true to what was on the screen even if the form changes.
 */
export const formAssignments = pgTable(
  'form_assignments',
  {
    id: uuidId(),
    formId: text('form_id')
      .notNull()
      .references(() => forms.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    assignedAt: timestamp('assigned_at', { withTimezone: true, mode: 'date' })
      .defaultNow()
      .notNull(),
    assignedBy: text('assigned_by'),
    dueAt: timestamp('due_at', { withTimezone: true, mode: 'date' }),
    signedAt: timestamp('signed_at', { withTimezone: true, mode: 'date' }),
    signerName: text('signer_name'),
    signerIp: text('signer_ip'),
    signerUserAgent: text('signer_user_agent'),
    formVersion: integer('form_version').notNull(),
    formBodySnapshot: text('form_body_snapshot'),
  },
  (t) => [
    uniqueIndex('form_assignments_form_user_version_uidx').on(
      t.formId,
      t.userId,
      t.formVersion,
    ),
    index('form_assignments_user_idx').on(t.userId),
  ],
);

/**
 * A charge against a family. Paid by Venmo and marked by a director today;
 * `method` and `note` leave room for Stripe to write here later.
 */
export const payments = pgTable(
  'payments',
  {
    id: uuidId(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    description: text('description').notNull(),
    amountCents: integer('amount_cents').notNull(),
    dueAt: timestamp('due_at', { withTimezone: true, mode: 'date' }),
    status: text('status').$type<PaymentStatus>().notNull().default('due'),
    paidAt: timestamp('paid_at', { withTimezone: true, mode: 'date' }),
    markedBy: text('marked_by'),
    method: text('method').default('venmo'),
    note: text('note'),
    createdAt: createdAt(),
    createdBy: text('created_by'),
  },
  (t) => [index('payments_user_status_idx').on(t.userId, t.status)],
);

// ---- Row types -------------------------------------------------------------

export type UserRow = typeof users.$inferSelect;
export type DocumentRow = typeof documents.$inferSelect;
export type FormRow = typeof forms.$inferSelect;
export type FormAssignmentRow = typeof formAssignments.$inferSelect;
export type PaymentRow = typeof payments.$inferSelect;
