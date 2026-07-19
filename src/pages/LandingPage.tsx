import { useAuth } from '../features/auth/useAuth';
import { useGetSummaryQuery, useGetFeaturedQuery } from '../features/stats/statsApi';
import {
  LandingWrapper,
  TopBar,
  LogoArea,
  LogoIcon,
  LogoText,
  AccediBtn,
  HeroWrap,
  HeroEyebrow,
  HeroTitle,
  HeroSub,
  HeroDecoration,
  CtaBtn,
  SectionWrap,
  SectionTitle,
  SectionSub,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatSub,
  SkeletonCard,
  FeaturedGrid,
  FeaturedCard,
  CardImg,
  CardBody,
  CardTitle,
  CardSub,
  CardPrice,
  CardMeta,
  DealBadge,
} from './LandingPage.styled';
import type { SummaryResponse, FeaturedListingDTO } from '../types';

interface Stat {
  value: string;
  label: string;
  sub: string;
}

function buildStats(data: SummaryResponse): Stat[] {
  const provinces = new Set(data.groups.map((g) => g.province));
  const udineCount = data.groups
    .filter((g) => g.province.toLowerCase() === 'udine')
    .reduce((acc, g) => acc + g.total, 0);

  return [
    {
      value: data.totals.total.toLocaleString('it-IT'),
      label: 'Annunci totali',
      sub: 'Listings tracked',
    },
    {
      value: provinces.size.toLocaleString('it-IT'),
      label: 'Province attive',
      sub: 'Active provinces',
    },
    {
      value: udineCount.toLocaleString('it-IT'),
      label: 'Annunci a Udine',
      sub: 'Udine listings',
    },
    {
      value: data.totals.accept.toLocaleString('it-IT'),
      label: 'Buoni affari',
      sub: 'Good deals',
    },
  ];
}

function featuredMeta(f: FeaturedListingDTO): string[] {
  const parts: string[] = [];
  if (f.surfaceValue) parts.push(`${f.surfaceValue}`);
  if (f.floor?.abbreviation) parts.push(f.floor.abbreviation);
  return parts;
}

export default function LandingPage() {
  const { isAuthenticated, signIn } = useAuth();
  const { data, isLoading, isError } = useGetSummaryQuery();
  const { data: featured, isLoading: featuredLoading, isError: featuredError } = useGetFeaturedQuery();

  const stats = data ? buildStats(data) : [];

  return (
    <LandingWrapper>
      {!isAuthenticated && (
        <TopBar>
          <LogoArea>
            <LogoIcon>A</LogoIcon>
            <LogoText>Affitto Udine</LogoText>
          </LogoArea>
          <AccediBtn onClick={() => void signIn()}>Accedi</AccediBtn>
        </TopBar>
      )}

      <HeroWrap>
        <HeroDecoration />
        <HeroEyebrow>Udine · Trieste · Padova</HeroEyebrow>
        <HeroTitle>Il mercato immobiliare, finalmente leggibile</HeroTitle>
        <HeroSub>
          Affitto Udine raccoglie e analizza migliaia di annunci nel Triveneto
          per aiutarti a trovare il buon affare prima degli altri.
        </HeroSub>
        <CtaBtn onClick={() => void signIn()}>Inizia ora</CtaBtn>
      </HeroWrap>

      <SectionWrap>
        <SectionTitle>
          Il mercato in sintesi <SectionSub>/ Market snapshot</SectionSub>
        </SectionTitle>

        {isLoading && (
          <StatsGrid>
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </StatsGrid>
        )}

        {!isLoading && !isError && data && (
          <StatsGrid>
            {stats.map((s) => (
              <StatCard key={s.label}>
                <StatValue>{s.value}</StatValue>
                <StatLabel>{s.label}</StatLabel>
                <StatSub>{s.sub}</StatSub>
              </StatCard>
            ))}
          </StatsGrid>
        )}
      </SectionWrap>

      <SectionWrap>
        <SectionTitle>
          In evidenza <SectionSub>/ Featured</SectionSub>
        </SectionTitle>

        {featuredLoading && (
          <FeaturedGrid>
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </FeaturedGrid>
        )}

        {!featuredLoading && !featuredError && featured && featured.length > 0 && (
          <FeaturedGrid>
            {featured.map((f) => (
              <FeaturedCard key={f.id}>
                <CardImg $url={f.photo?.urls.small}>
                  <DealBadge $sale={f.type === 'Compra'}>
                    {f.type === 'Compra' ? 'Vendita' : 'Affitto'}
                  </DealBadge>
                </CardImg>
                <CardBody>
                  <CardTitle>{f.title || '—'}</CardTitle>
                  <CardSub>
                    {f.province}
                    {f.contractValue ? ` · ${f.contractValue}` : ''}
                  </CardSub>
                  <CardPrice>{f.priceFormatted || '—'}</CardPrice>
                  <CardMeta>
                    {featuredMeta(f).map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </CardMeta>
                </CardBody>
              </FeaturedCard>
            ))}
          </FeaturedGrid>
        )}
      </SectionWrap>
    </LandingWrapper>
  );
}
