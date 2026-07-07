import styled from '@emotion/styled';
import { useGetListingByIdQuery } from '../../features/listings/listingsApi';

// ── Styled ─────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,.48);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 16px;
`;
const Sheet = styled.div`
  background: #fff; border-radius: 20px;
  width: min(96vw, 860px); max-height: 92vh;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,.2);
`;
const SheetHeader = styled.div`
  display: flex; align-items: flex-start; gap: 10px;
  padding: 20px 24px 14px; flex-shrink: 0;
  border-bottom: 1px solid #F1F2EE;
`;
const SheetTitle = styled.h2`
  margin: 0; font-size: 17px; font-weight: 700;
  letter-spacing: -.015em; color: #181B22; flex: 1;
`;
const PhotoCount = styled.span`
  font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #9097A2;
  align-self: center;
`;
const CloseBtn = styled.button`
  border: none; background: #F1F2EE; border-radius: 50%;
  width: 32px; height: 32px; font-size: 18px; line-height: 1;
  color: #5E6573; cursor: pointer; flex-shrink: 0;
`;
const Body = styled.div`
  overflow-y: auto; flex: 1; padding: 18px 24px 24px;
`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
`;
const Thumb = styled.a`
  display: block; border-radius: 10px; overflow: hidden; background: #ECECE6;
  aspect-ratio: 4 / 3;
  img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform .15s;
  }
  &:hover img { transform: scale(1.04); }
`;
const LoadingBox = styled.div`padding: 60px 0; text-align: center; color: #9097A2; font-size: 14px;`;
const ErrorBox = styled.div`
  padding: 16px; background: #FEF2F2; border: 1px solid #FECACA;
  border-radius: 10px; color: #dc2626; font-size: 14px;
`;
const EmptyBox = styled.div`
  padding: 60px 0; text-align: center; color: #9097A2; font-size: 14px; font-style: italic;
`;

// ── Component ──────────────────────────────────────────────────────────────

interface Props {
  listingId: number;
  onClose: () => void;
}

export default function PhotoGridModal({ listingId, onClose }: Props) {
  const { data, isLoading, isError } = useGetListingByIdQuery(listingId);
  const photos = data?.photos ?? [];

  return (
    <Overlay onMouseDown={onClose}>
      <Sheet onMouseDown={(e) => e.stopPropagation()}>
        <SheetHeader>
          <SheetTitle>{data?.title ?? (isLoading ? 'Caricamento…' : 'Foto')}</SheetTitle>
          {photos.length > 0 && <PhotoCount>{photos.length} foto</PhotoCount>}
          <CloseBtn onClick={onClose} aria-label="Chiudi">×</CloseBtn>
        </SheetHeader>

        <Body>
          {isLoading && <LoadingBox>Caricamento foto…</LoadingBox>}
          {isError && <ErrorBox>Errore nel caricamento. Riprova.</ErrorBox>}

          {data && (
            photos.length > 0 ? (
              <Grid>
                {photos.map((photo) => (
                  <Thumb
                    key={photo.id}
                    href={photo.urls.large}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={photo.caption ?? ''}
                  >
                    <img src={photo.urls.small} alt={photo.caption ?? ''} loading="lazy" />
                  </Thumb>
                ))}
              </Grid>
            ) : (
              <EmptyBox>Nessuna foto disponibile</EmptyBox>
            )
          )}
        </Body>
      </Sheet>
    </Overlay>
  );
}
