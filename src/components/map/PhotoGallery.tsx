import { useState, useCallback } from 'react';
import type { MapListingPhoto } from '../../types';
import { PreviewContainer, PreviewImage } from './PhotoGallery.styled';

interface PhotoGalleryProps {
  photos: MapListingPhoto[];
}

interface HoverState {
  src: string;
  x: number;
  y: number;
}

const PER_PAGE = 9;
const PREVIEW_W = 320;
const PREVIEW_H = 240;
const OFFSET = 14;
const MENU_NAV = 64;

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [page, setPage] = useState(0);
  const [hover, setHover] = useState<HoverState | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent, src: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const leafletPopup = e.currentTarget.closest('.leaflet-popup');
    const leafletRect = leafletPopup ? leafletPopup.getBoundingClientRect() : { left: 0, top: 0 };
    const popupWrapper = e.currentTarget.closest('.leaflet-popup-content-wrapper');
    const wrapperRect = popupWrapper ? popupWrapper.getBoundingClientRect() : rect;
    const targetX = Math.min(wrapperRect.right + OFFSET, window.innerWidth - PREVIEW_W - OFFSET);
    const targetY = Math.max(MENU_NAV, Math.min(Math.max(0, wrapperRect.top), window.innerHeight - PREVIEW_H - OFFSET));
    const x = targetX - leafletRect.left;
    const y = targetY - leafletRect.top;
    setHover({ src, x, y });
  }, []);

  const handleMouseLeave = useCallback(() => setHover(null), []);

  if (!photos || photos.length === 0) {
    return <div className="photo-pagination">Nessuna foto</div>;
  }

  const totalPages = Math.ceil(photos.length / PER_PAGE);
  const start = page * PER_PAGE;
  const visible = photos.slice(start, start + PER_PAGE);

  return (
    <div>
      <div className="photo-grid">
        {visible.map((photo, i) => (
          <a
            key={start + i}
            href={photo.large}
            target="_blank"
            rel="noreferrer"
            onMouseMove={(e) => handleMouseMove(e, photo.large)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={photo.small} alt="" />
          </a>
        ))}
      </div>

      {hover && (
        <PreviewContainer $x={hover.x} $y={hover.y}>
          <PreviewImage src={hover.src} alt="" />
        </PreviewContainer>
      )}

      {photos.length > PER_PAGE && (
        <div className="photo-pagination">
          <button
            className="btn-sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            ‹
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            className="btn-sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
