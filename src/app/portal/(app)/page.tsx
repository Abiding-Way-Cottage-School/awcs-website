import { homeStub } from '@/content/portal';
import { requireUser } from '@/lib/dal';

export const dynamic = 'force-dynamic';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/** Phase 1 stand-in; the family home (tasks and payments) replaces it. */
export default async function PortalHomePage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireUser();
  const { denied } = await searchParams;

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">{homeStub.eyebrow}</p>
        <h1>{homeStub.heading}</h1>
      </header>

      {denied ? (
        <p className="portal-notice" role="status">
          {homeStub.denied}
        </p>
      ) : null}

      <p className="portal-empty">
        {homeStub.body} Signed in as {user.familyName ?? user.email}.
      </p>
    </>
  );
}
