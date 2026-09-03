import { school } from './site';

/**
 * Copy for the Family Portal's chrome and its public sign-in pages. Page
 * content for the modules lives beside it: portal-users, portal-documents,
 * portal-forms and portal-payments (which also holds the family home).
 */

export type NavItem = { label: string; href: string };

export const portalNav: { family: NavItem[]; admin: NavItem[] } = {
  family: [
    { label: 'Home', href: '/portal/' },
    { label: 'Resources', href: '/portal/resources/' },
  ],
  admin: [
    { label: 'Users', href: '/admin/users/' },
    { label: 'Documents', href: '/admin/documents/' },
    { label: 'Forms', href: '/admin/forms/' },
    { label: 'Payments', href: '/admin/payments/' },
    { label: 'Family view', href: '/portal/' },
  ],
};

export const signInPage = {
  eyebrow: 'Family Portal',
  heading: 'Sign in.',
  lead: 'No password to remember. We email you a link, and the link signs you in.',
  emailLabel: 'Your email address',
  button: 'Email me a link',
  pending: 'Sending…',
  invalid: 'Enter a valid email address.',
  notListed: 'That email is not on our list yet. Ask a director to add you.',
  failed: 'We could not send a sign-in link just now. Try again in a minute, or write to the directors.',
  inactive: 'This account has been closed. Write to the directors if that is a mistake.',
  again: 'Please sign in again to continue.',
  help: `The portal is for enrolled families. If you are not sure which address a director added, write to ${school.email}.`,
};

export const verifyPage = {
  eyebrow: 'Family Portal',
  heading: 'Check your email.',
  lead: 'A sign-in link is on its way.',
  body: [
    `Open the email from ${school.name} and follow the link. It works once and expires after a day.`,
    'Nothing arrived? Look in the spam folder, then ask for another link.',
  ],
  again: 'Ask for another link',
};

export const errorPage = {
  eyebrow: 'Family Portal',
  messages: {
    AccessDenied: {
      heading: 'Not on our list yet.',
      body: 'The portal is for enrolled families, and a director adds each family by email address. If you have enrolled, ask a director to add the address you used — or try the address they have for you.',
    },
    Verification: {
      heading: 'That link has expired.',
      body: 'Sign-in links work once and expire after a day. Ask for a new one.',
    },
    Configuration: {
      heading: 'Something is wrong on our side.',
      body: 'The portal is not set up correctly. Tell a director; nothing you did caused this.',
    },
    Default: {
      heading: 'Something went wrong.',
      body: 'Try signing in again. If it keeps happening, write to the directors.',
    },
  },
  retry: 'Back to sign in',
};
