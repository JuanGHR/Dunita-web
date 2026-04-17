// ============================================================
// DUNE DOMINION — CriaturaCard Component
// Design: Desert Brutalism — creature display card
// ============================================================

import { useState } from 'react';
import type { Criatura } from '@/lib/data';
import { RAREZA_CONFIG } from '@/lib/data';
import CriaturaModal from './CriaturaModal';

interface CriaturaCardProps {
  criatura: Criatura;
  index: number;
}

const PELIGROSIDAD_COLOR: Record<string, string> = {
  'Extrema': 'oklch(0.6 0.22 25)',
  'Alta': 'oklch(0.6 0.18 35)',
  'Moderada': 'oklch(0.65 0.14 65)',
  'Baja': 'oklch(0.55 0.15 140)',
  'Muy Baja': 'oklch(0.5 0.12 160)',
};

export default function CriaturaCard({ criatura, index }: CriaturaCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const rareza = RAREZA_CONFIG[criatura.rareza];
  const animDelay = `${index * 60}ms`;
  const peligroColor = PELIGROSIDAD_COLOR[criatura.peligrosidad] || 'oklch(0.5 0.02 60)';

  return (
    <>
      <div
        className={`dune-card cursor-pointer animate-fade-in-up ${criatura.rareza === 'legendary' ? 'dune-card-legendary' : criatura.rareza === 'epic' ? 'dune-card-epic' : criatura.rareza === 'rare' ? 'dune-card-rare' : ''}`}
        style={{ animationDelay: animDelay, animationFillMode: 'both' }}
        onClick={() => setModalOpen(true)}
      >
        {/* Image section */}
        <div className="scan-lines relative overflow-hidden" style={{ background: 'oklch(0.08 0.015 58)', height: '200px' }}>
          {criatura.imageUrl ? (
            <img
              src={criatura.imageUrl}
              alt={criatura.nombre}
              className="pixel-image-wrapper w-full h-full object-contain p-2"
              style={{ imageRendering: 'pixelated' }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <span style={{ fontSize: '2rem' }}>🦂</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'oklch(0.35 0.02 60)' }}>
                IMAGEN NO DISPONIBLE
              </span>
            </div>
          )}

          {/* Rarity badge */}
          <div className="absolute top-2 left-2">
            <span className={`badge-rareza ${rareza.bgClass}`}>{rareza.label}</span>
          </div>

          {/* Peligrosidad badge */}
          <div className="absolute top-2 right-2">
            <span
              className="badge-rareza"
              style={{
                background: `${peligroColor.replace(')', ' / 0.15)')}`,
                color: peligroColor,
                border: `1px solid ${peligroColor.replace(')', ' / 0.4)')}`,
              }}
            >
              {criatura.peligrosidad}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'oklch(0.88 0.035 75)',
                  lineHeight: 1.3,
                }}
              >
                {criatura.nombre}
              </h3>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'oklch(0.5 0.02 65)', fontStyle: 'italic' }}>
              "{criatura.nombreComun}"
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'oklch(0.45 0.02 60)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {criatura.especie}
            </div>
          </div>

          <div className="dune-divider" />

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              color: 'oklch(0.6 0.02 65)',
              lineHeight: 1.5,
              marginBottom: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {criatura.descripcion}
          </p>

          <div className="dune-divider" />

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <MiniStat label="Coste" value={`${criatura.costeCompra.toLocaleString()} ₴`} />
            <MiniStat label="Apetito" value={`${criatura.apetitoBase}/día`} />
            <MiniStat label="Madurez" value={`${criatura.edadAdulta} meses`} />
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'oklch(0.45 0.02 60)' }}>
              🏜️ {criatura.habitat.split(' ').slice(0, 3).join(' ')}...
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <CriaturaModal criatura={criatura} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'oklch(0.1 0.015 58)', padding: '6px 8px', border: '1px solid oklch(0.2 0.03 58)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'oklch(0.4 0.02 60)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'oklch(0.65 0.14 65)', fontWeight: 700 }}>
        {value}
      </div>
    </div>
  );
}
