import { useState } from 'react';
import type { MapListingPhoto } from '../../types';

interface PhotoGalleryProps {
  photos: MapListingPhoto[];
}

const PER_PAGE = 9;

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [page, setPage] = useState(0);

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
          <a key={start + i} href={photo.large} target="_blank" rel="noreferrer">
            <img src={photo.small} alt="" />
          </a>
        ))}
      </div>
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
