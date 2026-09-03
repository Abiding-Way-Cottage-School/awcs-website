import { signOutAction } from '@/app/portal/actions';

/** A form, not a link, so signing out is a POST and works without JavaScript. */
export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button type="submit" className="portal-nav__link">
        Sign out
      </button>
    </form>
  );
}
