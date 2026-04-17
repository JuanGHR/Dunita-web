// ============================================================
// DUNE DOMINION — CriaturaModal Component
// Design: Desert Brutalism — creature detail overlay
// ============================================================

import { useEffect } from 'react';
import type { Criatura } from '@/lib/data';
import { RAREZA_CONFIG } from '@/lib/data';

interface CriaturaModalProps {
  criatura: Criatura;
  onClose: () => void;
}

const PELIGROSIDAD_COLOR: Record<string, string> = {
  'Extrema': 'oklch(0.6 0.22 25)',
  'Alta': 'oklch(0.6 0.18 35)',
  'Moderada': 'oklch(0.65 0.14 65)',
  'Baja': 'oklch(0.55 0.15 140)',
  'Muy Baja': 'oklch(0.5 0.12 160)',
};

export default function CriaturaModal({ criatura, onClose }: CriaturaModalProps) {
  const rareza = RAREZA_CONFIG[criatura.rareza];
  const peligroColor = PELIGROSIDAD_COLOR[criatura.peligrosidad] || 'oklch(0.5 0.02 60)';

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`dune-card w-full max-w-2xl max-h-[90vh] overflow-y-auto ${criatura.rareza === 'legendary' ? 'dune-card-legendary' : criatura.rareza === 'epic' ? 'dune-card-epic' : ''}`}
        style={{ animation: 'fadeInUp 0.3s ease' }}
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-6 pb-0">
          <div
            className="scan-lines flex-shrink-0"
            style={{ width: 140, height: 140, background: 'oklch(0.08 0.015 58)', overflow: 'hidden' }}
          >
            {criatura.imageUrl ? (
              <img
                src={criatura.imageUrl}
                alt={criatura.nombre}
                className="w-full h-full object-contain p-2"
                style={{ imageRendering: 'pixelated' }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <span style={{ fontSize: '2.5rem' }}>🦂</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'oklch(0.35 0.02 60)' }}>SIN IMAGEN</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge-rareza ${rareza.bgClass}`}>{rareza.label}</span>
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
                <h2
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'oklch(0.88 0.035 75)',
                    lineHeight: 1.2,
                    marginBottom: '2px',
                  }}
                >
                  {criatura.nombre}
                </h2>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'oklch(0.5 0.02 65)', fontStyle: 'italic', marginBottom: '2px' }}>
                  "{criatura.nombreComun}"
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'oklch(0.4 0.02 60)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {criatura.especie}
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'oklch(0.5 0.02 60)',
                  background: 'oklch(0.18 0.025 58)',
                  border: '1px solid oklch(0.28 0.05 62)',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                [ESC]
              </button>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: 'oklch(0.65 0.14 65)', marginTop: '8px' }}>
              {criatura.costeCompra.toLocaleString()} ₴
              <span style={{ fontSize: '0.6rem', color: 'oklch(0.4 0.02 60)', marginLeft: '6px' }}>SOLARIS</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 pt-4 space-y-5">
          <div className="dune-divider" />

          <div>
            <SectionLabel>Descripción</SectionLabel>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'oklch(0.72 0.025 68)', lineHeight: 1.7 }}>
              {criatura.descripcion}
            </p>
          </div>

          <div className="dune-divider" />

          <div>
            <SectionLabel>Significancia</SectionLabel>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'oklch(0.65 0.02 65)', lineHeight: 1.6, fontStyle: 'italic' }}>
              {criatura.significancia}
            </p>
          </div>

          <div className="dune-divider" />

          <div>
            <SectionLabel>Datos Biológicos</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <PropRow label="Tamaño" value={criatura.tamano} />
              <PropRow label="Hábitat" value={criatura.habitat} />
              <PropRow label="Velocidad" value={criatura.velocidad} />
              <PropRow label="Dieta" value={criatura.dieta} />
              <PropRow label="Inteligencia" value={criatura.inteligencia} />
              <PropRow label="Peligrosidad" value={criatura.peligrosidad} />
            </div>
          </div>

          <div className="dune-divider" />

          <div>
            <SectionLabel>Estadísticas de Juego</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              <PropRow label="Coste de Compra" value={`${criatura.costeCompra.toLocaleString()} ₴`} />
              <PropRow label="Apetito Base" value={`${criatura.apetitoBase} / día`} />
              <PropRow label="Edad Adulta" value={`${criatura.edadAdulta} meses`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'oklch(0.45 0.02 60)',
        marginBottom: '10px',
      }}
    >
      ▸ {children}
    </div>
  );
}

function PropRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'oklch(0.1 0.015 58)', padding: '8px 12px', border: '1px solid oklch(0.2 0.03 58)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'oklch(0.4 0.02 60)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'oklch(0.75 0.025 68)' }}>
        {value}
      </div>
    </div>
  );
}
