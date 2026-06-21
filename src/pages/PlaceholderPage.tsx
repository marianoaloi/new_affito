interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="page">
      <h1>{title}</h1>
      <p>In arrivo — questa funzionalità sarà disponibile prossimamente.</p>
    </main>
  );
}
