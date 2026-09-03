import { adminDocumentsPage as copy } from '@/content/portal-documents';

/** A category input with the existing categories as suggestions. Plain markup, so it serves both client and server forms. */
export default function CategoryField({
  id,
  categories,
  defaultValue = 'General',
  error,
}: {
  id: string;
  categories: string[];
  defaultValue?: string;
  error?: string;
}) {
  const listId = `${id}-list`;
  const options = categories.includes('General') ? categories : ['General', ...categories];

  return (
    <div className="portal-field">
      <label htmlFor={id}>{copy.fields.category}</label>
      <input
        id={id}
        name="category"
        type="text"
        list={listId}
        defaultValue={defaultValue}
        maxLength={40}
        autoComplete="off"
        required
      />
      <datalist id={listId}>
        {options.map((category) => (
          <option key={category} value={category} />
        ))}
      </datalist>
      {error ? (
        <p className="portal-field__error" role="alert">
          {error}
        </p>
      ) : (
        <p className="portal-field__hint">{copy.fields.categoryHint}</p>
      )}
    </div>
  );
}
