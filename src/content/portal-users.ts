/**
 * Copy for the directors' Users pages: the list, the add form, and a
 * family's detail page with its edit form, account switch and summaries.
 */

export const usersPage = {
  eyebrow: 'Admin',
  heading: 'Users',
  lead: 'Every family and director with a place in the portal. Add a family by email; the address they sign in with is the one you enter here.',
  columns: {
    familyName: 'Family',
    email: 'Email',
    role: 'Role',
    status: 'Status',
    created: 'Added',
  },
  roles: { admin: 'Director', family: 'Family' } as const,
  status: { active: 'Active', inactive: 'Closed' } as const,
  noFamilyName: 'No family name yet',
  empty: 'No one has been added yet. Add the first family below.',
  addHeading: 'Add a family',
  addLead:
    'Enter the email address they will sign in with. Nothing is sent now; they simply become able to ask for a sign-in link.',
  createdNotice: 'Added. They can sign in with that email address now.',
};

export const userForm = {
  emailLabel: 'Email address',
  emailHint: 'The address they will sign in with. It must be unique.',
  familyNameLabel: 'Family name',
  familyNameHint: 'How the family appears in the portal — usually a last name, e.g. “Anderson”.',
  roleLabel: 'Role',
  roleHint: 'Directors can see this admin area; families see only their own portal.',
  submitAdd: 'Add family',
  submitSave: 'Save changes',
  pendingAdd: 'Adding…',
  pendingSave: 'Saving…',
  invalid: 'Check the fields below.',
  emailTaken: 'Someone with that email address is already on the list.',
  saved: 'Saved.',
  notFound: 'That account no longer exists.',
};

export const userDetailPage = {
  eyebrow: 'Users',
  back: 'All users',
  addedOn: 'Added',
  addedBy: 'by',
  editHeading: 'Details',
  accountHeading: 'Account',
  formsHeading: 'Forms',
  paymentsHeading: 'Payments',
  formsEmpty: 'No forms have been assigned to this family.',
  paymentsEmpty: 'No charges have been added for this family.',
  formsColumns: {
    title: 'Form',
    version: 'Version',
    assigned: 'Assigned',
    due: 'Due',
    signed: 'Signed',
  },
  paymentsColumns: {
    description: 'Charge',
    amount: 'Amount',
    due: 'Due',
    status: 'Status',
    paid: 'Paid',
  },
  formStatus: {
    signed: 'Signed',
    unsigned: 'Awaiting signature',
    superseded: 'Superseded',
    retired: 'Retired',
  },
  paymentStatus: { due: 'Due', paid: 'Paid', waived: 'Waived' } as const,
  summary: {
    unsigned: (n: number) =>
      n === 0 ? 'Nothing awaiting signature.' : n === 1 ? '1 form awaiting signature.' : `${n} forms awaiting signature.`,
    due: (amount: string, n: number) =>
      n === 0 ? 'Nothing due.' : `${amount} due across ${n === 1 ? '1 charge' : `${n} charges`}.`,
  },
  manageForms: 'Manage forms',
  managePayments: 'Manage payments',
};

export const accountSwitch = {
  activeNote: 'This account is open. They can sign in and see the portal.',
  inactiveNote:
    'This account is closed. Their sign-in links stop working, and any session they still hold ends at their next request. Nothing is deleted.',
  deactivate: 'Close this account',
  reactivate: 'Reopen this account',
  confirmPrompt: 'Close this account? They will no longer be able to sign in.',
  confirm: 'Yes, close it',
  cancel: 'Keep it open',
  pending: 'Working…',
  notConfirmed: 'Confirm before closing an account.',
  isSelf: 'You cannot close your own account. Ask another director.',
  lastAdmin: 'This is the last open director account. Make someone else a director first.',
  selfDemote: 'You cannot take away your own director role. Ask another director.',
  lastAdminDemote: 'This is the last open director account. Make someone else a director first.',
  closed: 'Account closed.',
  reopened: 'Account reopened.',
};
