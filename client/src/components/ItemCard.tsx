// ============================================================
// DUNE DOMINION — ItemCard Component
// Design: Desert Brutalism — dune-card with clip-path corners
// Shows pixel art image, stats bars, rarity badge, faction
// ============================================================

import { useState } from 'react';
import type { Instalacion } from '@/lib/data';
import { RAREZA_CONFIG, FACCION_CONFIG, MEDIO_CONFIG, ALIMENTACION_CONFIG } from '@/lib/data';
import ItemModal from './ItemModal';

interface ItemCardProps {
  item: Instalacion;
  index: number;
}

export default function ItemCard({ item, index }: ItemCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const rareza = RAREZA_CONFIG[item.rareza];
  const faccion = FACCION_CONFIG[item.faccion];
  const medio = MEDIO_CONFIG[item.medioSoportado];
  const alimentacion = ALIMENTACION_CONFIG[item.alimentacionSoportada];

  const animDelay = `${index * 60}ms`;

  return (
    <>
      <div
        className={`dune-card cursor-pointer animate-fade-in-up ${item.rareza === 'legendary' ? 'dune-card-legendary' : item.rareza === 'epic' ? 'dune-card-epic' : item.rareza === 'rare' ? 'dune-card-rare' : ''}`}
        style={{ animationDelay: animDelay, animationFillMode: 'both' }}
        onClick={() => setModalOpen(true)}
      >
        {/* Image section */}
        <div className="scan-lines relative overflow-hidden" style={{ background: 'oklch(0.08 0.015 58)', height: '200px' }}>
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.nombre}
              className="pixel-image-wrapper w-full h-full object-contain p-2"
              style={{ imageRendering: 'pixelated' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'oklch(0.4 0.02 60)' }}>
                SIN IMAGEN
              </span>
            </div>
          )}

          {/* Rarity badge overlay */}
          <div className="absolute top-2 left-2">
            <span className={`badge-rareza ${rareza.bgClass}`}>
              {rareza.label}
            </span>
          </div>

          {/* Tipo badge */}
          <div className="absolute top-2 right-2">
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
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Header */}
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
                {item.nombre}
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'oklch(0.45 0.02 60)',
                  whiteSpace: 'nowrap',
                  paddingTop: '2px',
                }}
              >
                {item.codigo}
              </span>
            </div>

            {/* Faction + Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <span style={{ fontSize: '0.75rem', color: faccion.color }}>
                {faccion.icon} {faccion.label}
              </span>
              <span style={{ color: 'oklch(0.3 0.02 60)', fontSize: '0.7rem' }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'oklch(0.5 0.02 65)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {item.categoria}
              </span>
            </div>
          </div>

          <div className="dune-divider" />

          {/* Description */}
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
            {item.descripcion}
          </p>

          {/* Stats */}
          <div className="space-y-2 mb-3">
            <StatBar label="Seguridad" value={item.stats.seguridad} color="oklch(0.6 0.18 25)" />
            <StatBar label="Capacidad" value={item.stats.capacidad} color="oklch(0.65 0.14 65)" />
            <StatBar label="Ingresos" value={item.stats.ingresos} color="oklch(0.55 0.15 140)" />
          </div>

          <div className="dune-divider" />

          {/* Footer info */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <InfoChip icon={medio.icon} label={medio.label} color={medio.color} />
              <InfoChip icon={alimentacion.icon} label={alimentacion.label} color={alimentacion.color} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'oklch(0.65 0.14 65)', fontWeight: 700 }}>
                {item.coste.toLocaleString()} ₴
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'oklch(0.4 0.02 60)', textTransform: 'uppercase' }}>
                Solaris
              </div>
            </div>
          </div>

          {/* Hectáreas + Capacidad */}
          <div className="flex items-center gap-4 mt-2">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'oklch(0.45 0.02 60)' }}>
              📐 {item.hectareas} ha
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'oklch(0.45 0.02 60)' }}>
              🐾 Cap. {item.capacidadCriaturas} criaturas
            </span>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ItemModal item={item} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'oklch(0.45 0.02 60)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'oklch(0.65 0.02 65)' }}>
          {value}
        </span>
      </div>
      <div className="stat-bar">
        <div
          className="stat-bar-fill"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, oklch(0.4 0.08 60), ${color})`,
          }}
        />
      </div>
    </div>
  );
}

function InfoChip({ icon, label, color }: { icon: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <span style={{ fontSize: '0.7rem' }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
    </div>
  );
}
