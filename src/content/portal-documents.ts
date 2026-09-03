/**
 * Copy for the Documents module: the directors' Documents page and the
 * families' Resources page. Chrome copy lives in portal.ts.
 */

export const adminDocumentsPage = {
  eyebrow: 'Admin',
  heading: 'Documents',
  lead: 'Everything on the families’ Resources page: handbooks, calendars, forms to print, and links out to the places the co-op uses.',
  sections: {
    list: 'On the Resources page',
    upload: 'Upload a file',
    link: 'Add a link',
    edit: 'Edit',
    confirm: 'Delete',
  },
  table: {
    title: 'Title',
    category: 'Category',
    kind: 'Kind',
    status: 'Status',
    added: 'Added',
    actions: 'Actions',
  },
  kinds: { file: 'File', link: 'Link' },
  status: { visible: 'Visible', hidden: 'Hidden' },
  actions: {
    open: 'Open',
    edit: 'Edit',
    hide: 'Hide',
    show: 'Show',
    delete: 'Delete…',
    cancel: 'Cancel',
    confirmDelete: 'Delete it',
  },
  confirm: {
    heading: (title: string) => `Delete “${title}”?`,
    link: 'Families will no longer see it on the Resources page. This cannot be undone.',
    file: 'Families will no longer see it, and the file itself is removed from storage. This cannot be undone.',
  },
  notices: {
    uploaded: 'The file is up and on the Resources page.',
    saved: 'The link is saved and on the Resources page.',
    updated: 'Saved.',
    deleted: 'Deleted.',
    missing: 'That document no longer exists.',
  },
  empty: 'Nothing here yet. Upload a file or add a link below and it appears on the families’ Resources page.',
  fields: {
    title: 'Title',
    description: 'Description',
    descriptionHint: 'Optional. One line under the title on the Resources page.',
    category: 'Category',
    categoryHint: 'Groups the Resources page. Reuse an existing one or type a new one.',
    sortOrder: 'Order',
    sortOrderHint: 'Lower numbers come first within a category; ties sort by title.',
    visible: 'Visible to families',
    url: 'Address',
    urlHint: 'A full https:// address.',
    file: 'File',
    fileHint: 'PDF, image, Word document or plain text, up to 25 MB.',
  },
  buttons: {
    upload: 'Upload',
    uploading: 'Uploading…',
    saving: 'Saving…',
    addLink: 'Add link',
    save: 'Save changes',
  },
  errors: {
    invalid: 'Check the highlighted fields.',
    noFile: 'Choose a file to upload.',
    fileType: 'That kind of file is not allowed. Choose a PDF, image, Word document or plain-text file.',
    fileSize: 'That file is over 25 MB. Shrink it or split it up.',
    uploadFailed: 'The upload did not finish. Try again in a minute.',
    notPrivate: 'The file was not stored privately, so it was discarded. Try again.',
    badPathname: 'The upload did not land where it should have, so it was discarded. Try again.',
    unauthorized: 'Sign in as a director to upload files.',
    missing: 'That document no longer exists.',
  },
  progress: (percent: number) => `Uploading — ${percent}%`,
};

export const resourcesPage = {
  eyebrow: 'Family Portal',
  heading: 'Resources',
  lead: 'Handbooks, calendars, printable forms and links from the directors. Files open in a new tab.',
  empty: 'Nothing has been shared yet. Check back once the directors have posted this year’s documents.',
  open: 'Open',
  download: 'Download',
};
