/**
 * Copy for the Forms module: the directors' forms pages and the family
 * signing page. Chrome copy lives in portal.ts.
 */

export const adminFormsPage = {
  eyebrow: 'Admin',
  heading: 'Forms.',
  listLabel: 'All forms',
  lead: 'Agreements families sign in the portal. Write one here, then send it to the families it applies to.',
  columns: {
    title: 'Form',
    version: 'Version',
    status: 'Status',
    assigned: 'Sent to',
    signed: 'Signed',
    updated: 'Updated',
  },
  status: { active: 'Active', retired: 'Retired' },
  empty: 'No forms yet. Write the first one below.',
  newHeading: 'New form',
  newLead:
    'Plain text. Leave a blank line between paragraphs; the portal sets them as paragraphs for the family to read.',
};

export const adminFormPage = {
  eyebrow: 'Forms',
  back: 'All forms',
  versionLabel: (version: number) => `Version ${version}`,
  retired: 'This form is retired. Families cannot sign it until it is restored.',
  editHeading: 'Text of the form',
  editNote:
    'Once a form has been sent to anyone, saving a change makes a new version. Families who signed the old version keep their signature; anyone who has not yet signed is sent the new version straight away, with the same due date.',
  assignHeading: 'Send to families',
  assignLead: 'Families who already have this version are not listed.',
  assignAllLabel: 'Send to every active family',
  assignSelectLabel: 'Or choose families',
  dueLabel: 'Due date (optional)',
  assignButton: 'Send form',
  assignPending: 'Sending…',
  assignEmpty: 'Every active family already has this version.',
  noFamilies: 'There are no active family accounts yet. Add families under Users first.',
  signaturesHeading: 'Signatures',
  signaturesEmpty: 'This form has not been sent to anyone yet.',
  actionsColumn: 'Actions',
  columns: {
    family: 'Family',
    version: 'Version',
    sent: 'Sent',
    due: 'Due',
    status: 'Status',
    signed: 'Signed',
  },
  rowStatus: {
    signed: 'Signed',
    waiting: 'Waiting',
    superseded: 'Superseded',
  },
  signedBy: (name: string) => `by ${name}`,
  remove: 'Remove',
  removeConfirm: 'Remove this family from the form?',
  retire: 'Retire this form',
  retireConfirm: 'Retire it? Families will no longer be asked to sign.',
  restore: 'Restore this form',
  restoreConfirm: 'Restore it so families can sign again?',
  confirmYes: 'Yes, go ahead',
  confirmNo: 'Cancel',
};

export const formEditor = {
  titleLabel: 'Title',
  bodyLabel: 'Text',
  bodyHint: 'Blank lines separate paragraphs.',
  create: 'Create form',
  creating: 'Creating…',
  save: 'Save changes',
  saving: 'Saving…',
  savedSame: 'Saved.',
  savedNewVersion: (version: number) => `Saved as version ${version}.`,
  created: 'Form created.',
};

export const adminFormsMessages = {
  notFound: 'That form no longer exists.',
  invalid: 'Check the highlighted fields.',
  chooseFamilies: 'Choose at least one family, or send to every active family.',
  assigned: (count: number) =>
    count === 0
      ? 'Nobody new to send to; every family chosen already has this version.'
      : count === 1
        ? 'Sent to 1 family.'
        : `Sent to ${count} families.`,
  removed: 'Removed.',
  removeSigned: 'A signed form cannot be removed.',
  retired: 'Form retired.',
  restored: 'Form restored.',
};

export const familyFormPage = {
  eyebrow: 'Form',
  back: 'Back to home',
  due: (date: string) => `Please sign by ${date}.`,
  notFound: {
    heading: 'We could not find that form.',
    body: 'It may have been withdrawn, or the link may have a small error in it. Your open forms are listed on the home page.',
  },
  signed: (name: string, date: string) => `Signed by ${name} on ${date}.`,
  signedNote: 'The text below is the form exactly as it was signed.',
  retired: 'This form has been withdrawn by the directors; there is nothing to sign.',
  superseded:
    'The directors have updated this form since this copy was sent to you. The current version is listed on the home page.',
  signHeading: 'Sign this form',
  nameLabel: 'Your full name',
  nameHint: 'Typed as a signature, exactly as you would sign on paper.',
  agreeLabel: 'I have read this form and agree to it.',
  button: 'Sign',
  pending: 'Signing…',
  record: 'We record the date, your name and the text of the form as shown here.',
};

export const familyFormMessages = {
  nameRequired: 'Type your full name.',
  nameTooLong: 'Keep your name under 120 characters.',
  agreeRequired: 'Tick the box to confirm you agree.',
  notYours: 'That form is not assigned to you.',
  alreadySigned: 'This form has already been signed.',
  retired: 'This form has been withdrawn and cannot be signed.',
  superseded: 'This form was updated after you opened it. Reload the page to read and sign the current version.',
};
