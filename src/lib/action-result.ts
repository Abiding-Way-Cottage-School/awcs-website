/**
 * What a server action hands back to `useActionState`.
 *
 * Expected failures — bad input, an address not on the list — are values, not
 * exceptions, so the form can show them. Anything thrown is a real error and
 * reaches the nearest error boundary. `redirect()` also throws, on purpose;
 * never catch it.
 */
export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; message: string; errors?: Record<string, string[]> };

export function fail(message: string, errors?: Record<string, string[]>): ActionResult {
  return errors ? { ok: false, message, errors } : { ok: false, message };
}

export function succeed(message?: string): ActionResult {
  return message === undefined ? { ok: true } : { ok: true, message };
}

/** The first message for one field from an action's result, if any. */
export function fieldError(state: ActionResult | undefined, name: string): string | undefined {
  if (!state || state.ok) return undefined;
  return state.errors?.[name]?.[0];
}
