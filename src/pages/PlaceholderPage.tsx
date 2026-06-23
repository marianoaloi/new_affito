import { PageWrapper } from './PlaceholderPage.styled';

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <PageWrapper>
      <h1>{title}</h1>
      <p>In arrivo — questa funzionalità sarà disponibile prossimamente.</p>
    </PageWrapper>
  );
}
