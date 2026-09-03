import { z } from 'zod';

/**
 * Input schemas shared by the portal's server actions.
 *
 * Schemas check shape only. Every action still has to confirm the caller may
 * touch the row in question — a well-formed id is not a permission.
 */

export const emailSchema = z
  .string({ error: 'Enter your email address.' })
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: 'Enter a valid email address.' }));

export const familyNameSchema = z
  .string({ error: 'Enter the family name.' })
  .trim()
  .min(1, { error: 'Enter the family name.' })
  .max(80, { error: 'Keep the family name under 80 characters.' });

export const roleSchema = z.enum(['admin', 'family'], {
  error: 'Choose a role.',
});

/** Links must be https; a file document's URL is set by the server, never the form. */
export const httpsUrlSchema = z.url({
  protocol: /^https$/,
  error: 'Enter a full https:// address.',
});

const documentBase = {
  title: z
    .string({ error: 'Enter a title.' })
    .trim()
    .min(1, { error: 'Enter a title.' })
    .max(120, { error: 'Keep the title under 120 characters.' }),
  description: z.string().trim().max(500).optional(),
  category: z
    .string({ error: 'Enter a category.' })
    .trim()
    .min(1, { error: 'Enter a category.' })
    .max(40, { error: 'Keep the category under 40 characters.' }),
};

export const documentBaseSchema = z.object(documentBase);

export const documentSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('link'), ...documentBase, url: httpsUrlSchema }),
  z.object({ kind: z.literal('file'), ...documentBase }),
]);

export const formSchema = z.object({
  title: z
    .string({ error: 'Enter a title.' })
    .trim()
    .min(1, { error: 'Enter a title.' })
    .max(120, { error: 'Keep the title under 120 characters.' }),
  body: z
    .string({ error: 'Enter the text of the form.' })
    .trim()
    .min(1, { error: 'Enter the text of the form.' })
    .max(20_000, { error: 'Keep the form under 20,000 characters.' }),
});

/** A row id arriving from the browser — bound to an action, or in a path. Shape only. */
export const idSchema = z.string().trim().min(1).max(64);

/** Form fields arrive as strings; an empty one means "not given". */
export const blankToUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

/** An optional due date from a form: blank means none, otherwise YYYY-MM-DD. */
export const optionalDueDateSchema = z.preprocess(
  blankToUndefined,
  z.iso.date({ error: 'Enter the due date as YYYY-MM-DD.' }).optional(),
);

export const paymentSchema = z.object({
  description: z
    .string({ error: 'Describe the charge.' })
    .trim()
    .min(1, { error: 'Describe the charge.' })
    .max(160, { error: 'Keep the description under 160 characters.' }),
  amountCents: z.preprocess(
    blankToUndefined,
    z.coerce
      .number({ error: 'Enter an amount.' })
      .int({ error: 'Amounts are whole cents.' })
      .min(0, { error: 'Amounts cannot be negative.' })
      .max(1_000_000, { error: 'That is more than $10,000; check the amount.' }),
  ),
  dueAt: optionalDueDateSchema,
});

/**
 * `Object.fromEntries(formData)` minus the `$ACTION_*` bookkeeping React adds.
 * Repeated keys keep the last value; use `formData.getAll()` for lists.
 */
export function stripActionKeys(formData: FormData): Record<string, FormDataEntryValue> {
  const out: Record<string, FormDataEntryValue> = {};
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith('$ACTION_')) out[key] = value;
  }
  return out;
}

/** Zod's per-field messages in the shape `ActionResult.errors` expects. */
export function fieldErrors(error: z.ZodError): Record<string, string[]> {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  const out: Record<string, string[]> = {};
  for (const [key, messages] of Object.entries(flat)) {
    if (messages?.length) out[key] = messages;
  }
  return out;
}
