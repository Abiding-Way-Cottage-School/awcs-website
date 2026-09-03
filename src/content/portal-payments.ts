import { school } from './site';

/**
 * Copy for the directors' Payments page and the family Home page. Chrome
 * copy (navigation, sign-in) lives in portal.ts; this file is only the two
 * pages this module owns.
 */

export const adminPayments = {
  eyebrow: 'Admin',
  heading: 'Payments',
  lead: 'Charges families owe, paid by Venmo and marked here by a director.',

  add: {
    heading: 'Add a charge',
    recipient: 'Charge to',
    recipientPlaceholder: 'Choose a family',
    everyone: 'Every active family',
    description: 'Description',
    descriptionHint: 'What the family sees, e.g. "Fall tuition" or "Nature journal supplies".',
    amount: 'Amount',
    amountHint: 'In dollars, e.g. 45 or 45.50.',
    dueAt: 'Due date',
    dueAtHint: 'Optional.',
    button: 'Add charge',
    pending: 'Adding…',
    noFamilies:
      'No active families yet. Add a family on the Users page and the charge form will list them.',
    addedOne: (family: string) => `Charge added for ${family}.`,
    addedAll: (count: number) =>
      count === 1 ? 'Charge added for 1 family.' : `Charge added for ${count} families.`,
    chooseRecipient: 'Choose a family, or every active family.',
    unknownRecipient: 'That family is not on the list any more. Choose again.',
    nobodyActive: 'There are no active families to charge.',
    invalidAmount: 'Enter the amount in dollars, e.g. 45 or 45.50.',
  },

  list: {
    heading: 'Charges',
    filterLabel: 'Filter charges',
    filters: { unpaid: 'Unpaid', all: 'All' },
    columns: {
      family: 'Family',
      description: 'Description',
      amount: 'Amount',
      due: 'Due',
      status: 'Status',
      actions: 'Actions',
    },
    empty: {
      unpaid: 'Nothing is owed right now.',
      all: 'No charges yet. Add one above.',
    },
    summary: (count: number, total: string) =>
      count === 1 ? `1 charge due, ${total} in all.` : `${count} charges due, ${total} in all.`,
    noDue: 'No due date',
    settled: (status: string, date: string | null) => (date ? `${status} ${date}` : status),
  },

  actions: {
    markPaid: 'Mark paid',
    waive: 'Waive',
    delete: 'Delete',
    cancel: 'Cancel',
    note: 'Note',
    noteHint: 'Optional — a Venmo reference, or why it was waived.',
    confirmPaid: 'Confirm paid',
    confirmWaive: 'Confirm waive',
    confirmDelete: 'Yes, delete it',
    deleteWarning: 'This removes the charge for good. The family will no longer see it.',
    waiveWarning: 'The family will see this charge as waived, with the note if you add one.',
    pending: 'Saving…',
    marked: 'Marked paid.',
    waived: 'Waived.',
    deleted: 'Deleted.',
    alreadySettled: 'That charge has already been settled or removed. The list has been refreshed.',
    invalid: 'Check the note and try again.',
  },

  status: { due: 'Due', paid: 'Paid', waived: 'Waived' } as const,
};

export const familyHome = {
  eyebrow: 'Family Portal',
  heading: (familyName: string | null) =>
    familyName ? `Welcome, ${familyName} family.` : 'Welcome.',
  lead: 'Anything the co-op needs from you is here: forms to sign and payments due.',
  denied: 'That page is for directors.',
  signed: 'Thank you — your signature has been recorded.',

  tasks: {
    heading: 'New tasks',
    empty: 'Nothing to do right now. We will list forms to sign and payments due here.',
    form: 'Read and sign',
    payment: 'See payments',
    formKind: 'Form to sign',
    paymentKind: 'Payment due',
    due: (date: string) => `Due ${date}`,
  },

  payments: {
    heading: 'Payments',
    totalDue: 'Total due',
    nothingDue: 'Nothing is owed right now.',
    dueHeading: 'Due',
    due: (date: string) => `Due ${date}`,
    venmo: 'Pay with Venmo',
    instruction: (amount: string) =>
      `Send ${amount} to ${school.venmoHandle} with your family name in the note; a director will mark it paid.`,
    historyHeading: 'History',
    historyEmpty: 'No past payments yet.',
    noDue: 'No due date',
  },

  status: { due: 'Due', paid: 'Paid', waived: 'Waived' } as const,
};
