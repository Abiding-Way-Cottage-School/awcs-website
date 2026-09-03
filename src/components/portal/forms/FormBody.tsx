import { paragraphs } from '@/lib/format';

/** A form's text set as paragraphs, line breaks within a paragraph kept. */
export default function FormBody({ body }: { body: string }) {
  return (
    <div className="prose portal-form-body">
      {paragraphs(body).map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
}
