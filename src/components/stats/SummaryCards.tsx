import styled from '@emotion/styled';
import type { SummaryResponse } from '../../types';

interface SummaryCardsProps {
  data: SummaryResponse;
}

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

const SummaryCard = styled.div`
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Value = styled.span`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 32px;
  color: #181b22;
  line-height: 1.1;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: #181b22;
`;

const Sub = styled.span`
  color: #9097a2;
  font-size: 13px;
`;

export default function SummaryCards({ data }: SummaryCardsProps) {
  const totals = data?.totals;

  const cards = [
    { value: totals?.total ?? 0, label: 'Totale', sub: 'Annunci totali' },
    { value: totals?.accept ?? 0, label: 'Buoni', sub: 'Accettati' },
    { value: totals?.deny ?? 0, label: 'Non buoni', sub: 'Rifiutati' },
    { value: totals?.wait ?? 0, label: 'Così così', sub: 'In attesa' },
    { value: totals?.emptyChoise ?? 0, label: 'Senza scelta', sub: 'Da valutare' },
  ];

  return (
    <CardsGrid>
      {cards.map((c) => (
        <SummaryCard key={c.label}>
          <Value>{c.value.toLocaleString('it-IT')}</Value>
          <Label>{c.label}</Label>
          <Sub>{c.sub}</Sub>
        </SummaryCard>
      ))}
    </CardsGrid>
  );
}
