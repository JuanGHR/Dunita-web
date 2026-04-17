// ============================================================
// DUNE DOMINION — ItemModal Component
// Design: Desert Brutalism — full detail overlay
// Shows complete stats, description, effects, faction info
// ============================================================

import { useEffect } from 'react';
import type { Instalacion } from '@/lib/data';
import { RAREZA_CONFIG, FACCION_CONFIG, MEDIO_CONFIG, ALIMENTACION_CONFIG } from '@/lib/data';

interface ItemModalProps {
  item: Instalacion;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const rareza = RAREZA_CONFIG[item.rareza];
  const faccion = FACCION_CONFIG[item.faccion];
  const medio = MEDIO_CONFIG[item.medioSoportado];
  const alimentacion = ALIMENTACION_CONFIG[item.alimentacionSoportada];

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
      style={{ animation: 'fadeIn 0.2s ease' }}
    >
      <div
        className={`dune-card w-full max-w-2xl max-h-[90vh] overflow-y-auto ${item.rareza === 'legendary' ? 'dune-card-legendary' : item.rareza === 'epic' ? 'dune-card-epic' : ''}`}
        style={{ animation: 'fadeInUp 0.3s ease' }}
      >
        {/* Modal Header */}
        <div className="flex items-start gap-4 p-6 pb-0">
          {/* Image */}
          <div
            className="scan-lines flex-shrink-0 rounded"
            style={{ width: 140, height: 140, background: 'oklch(0.08 0.015 58)', overflow: 'hidden' }}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.nombre}
                className="w-full h-full object-contain p-2"
                style={{ imageRendering: 'pixelated' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'oklch(0.4 0.02 60)' }}>SIN IMAGEN</span>
              </div>
            )}
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge-rareza ${rareza.bgClass}`}>{rareza.label}</span>
                  <span
                    className="badge-rareza"
                    style={{
                      background: item.tipo === 'Exhibicion' ? 'oklch(0.5 0.12 250 / 0.2)' : 'oklch(0.45 0.12 140 / 0.2)',
                      color: item.tipo === 'Exhibicion' ? 'oklch(0.65 0.12 250)' : 'oklch(0.6 0.12 140)',
                      border: `1px solid ${item.tipo === 'Exhibicion' ? 'oklch(0.5 0.12 250 / 0.4)' : 'oklch(0.45 0.12 140 / 0.4)'}`,
                    }}
                  >
                    {item.tipo}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'oklch(0.88 0.035 75)',
                    lineHeight: 1.2,
                    marginBottom: '4px',
                  }}
                >
                  {item.nombre}
                </h2>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'oklch(0.4 0.02 60)', letterSpacing: '0.1em' }}>
                  ID: {item.codigo}
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

            {/* Faction */}
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '1rem' }}>{faccion.icon}</span>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.8rem', color: faccion.color }}>
                {faccion.label}
              </span>
              <span style={{ color: 'oklch(0.3 0.02 60)', fontSize: '0.7rem' }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'oklch(0.5 0.02 65)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {item.categoria}
              </span>
            </div>

            {/* Cost */}
            <div className="mt-3">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'oklch(0.65 0.14 65)',
                }}
              >
                {item.coste.toLocaleString()} ₴
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'oklch(0.4 0.02 60)', marginLeft: '6px' }}>
                SOLARIS
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 pt-4 space-y-5">
          <div className="dune-divider" />

          {/* Description */}
          <div>
            <SectionLabel>Descripción</SectionLabel>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'oklch(0.72 0.025 68)', lineHeight: 1.7 }}>
              {item.descripcion}
            </p>
          </div>

          <div className="dune-divider" />

          {/* Stats grid */}
          <div>
            <SectionLabel>Estadísticas</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              <StatDetail label="Seguridad" value={item.stats.seguridad} max={100} color="oklch(0.6 0.18 25)" />
              <StatDetail label="Capacidad" value={item.stats.capacidad} max={100} color="oklch(0.65 0.14 65)" />
              <StatDetail label="Ingresos" value={item.stats.ingresos} max={100} color="oklch(0.55 0.15 140)" />
              <StatDetail label="Mantenimiento" value={item.stats.costeMantenimiento} max={100} color="oklch(0.55 0.18 40)" />
            </div>
          </div>

          <div className="dune-divider" />

          {/* Properties grid */}
          <div>
            <SectionLabel>Propiedades</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <PropRow label="Hectáreas" value={`${item.hectareas} ha`} />
              <PropRow label="Cap. Criaturas" value={`${item.capacidadCriaturas} unidades`} />
              <PropRow label="Medio" value={`${medio.icon} ${medio.label}`} />
              <PropRow label="Alimentación" value={`${alimentacion.icon} ${alimentacion.label}`} />
            </div>
          </div>

          <div className="dune-divider" />

          {/* Effects */}
          <div>
            <SectionLabel>Efectos</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {item.efectos.map((efecto) => (
                <span
                  key={efecto}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    background: 'oklch(0.65 0.14 65 / 0.1)',
                    color: 'oklch(0.65 0.14 65)',
                    border: '1px solid oklch(0.65 0.14 65 / 0.3)',
                    clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
                  }}
                >
                  {efecto}
                </span>
              ))}
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

function StatDetail({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'oklch(0.45 0.02 60)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'oklch(0.75 0.02 65)', fontWeight: 700 }}>
          {value}
        </span>
      </div>
      <div className="stat-bar">
        <div
          className="stat-bar-fill"
          style={{
            width: `${(value / max) * 100}%`,
            background: `linear-gradient(90deg, oklch(0.4 0.08 60), ${color})`,
          }}
        />
      </div>
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
