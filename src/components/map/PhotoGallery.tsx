import { useState, useCallback } from 'react';
import type { MapListingPhoto } from '../../types';

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
const SIZE_MENU = 300;
const MENU_NAV = 64;

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [page, setPage] = useState(0);
  const [hover, setHover] = useState<HoverState | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent, src: string) => {
    let x = e.clientX + OFFSET;
     x -= SIZE_MENU;
    let y = e.clientY + OFFSET;
    y -= MENU_NAV;
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
        <div
          style={{
            position: 'fixed',
            left: hover.x,
            top: hover.y,
            width: PREVIEW_W,
            height: PREVIEW_H,
            zIndex: 9999,
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            border: '2px solid #fff',
            pointerEvents: 'none',
            background: '#1a1a1a',
          }}
        >
          <img
            src={hover.src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
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
