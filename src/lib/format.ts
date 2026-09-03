/**
 * Money and dates as the portal prints them.
 *
 * Plain functions with no server or client dependency, so pages, server
 * components and client components share one set. A moment something
 * happened reads in the co-op's own time zone, whatever the server's. A due
 * date is a calendar day — stored at a fixed UTC time by the module that owns
 * it — and prints as that day, so it never slips to the evening before.
 */

type DateInput = Date | string | null | undefined;

const timeZone = 'America/New_York';

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone });
const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone,
});
const dayFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

/** What an absent date prints as. */
export const NONE = '—';

function toDate(value: DateInput): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "Sep 3, 2026" in the co-op's time zone; a dash when absent. */
export function formatDate(value: DateInput): string {
  const date = toDate(value);
  return date ? dateFormat.format(date) : NONE;
}

/** "Sep 3, 2026, 4:15 PM" in the co-op's time zone; a dash when absent. */
export function formatDateTime(value: DateInput): string {
  const date = toDate(value);
  return date ? dateTimeFormat.format(date) : NONE;
}

/** A due date as the calendar day it names; a dash when absent. */
export function formatDueDate(value: DateInput): string {
  const date = toDate(value);
  return date ? dayFormat.format(date) : NONE;
}

/** Whole cents as "$12.50". */
export function formatCents(cents: number): string {
  return usd.format(cents / 100);
}

/** Blank lines separate paragraphs; single line breaks are kept inside one. */
export function paragraphs(body: string): string[] {
  return body
    .replace(/\r\n?/g, '\n')
    .split(/\n[ \t]*\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}
