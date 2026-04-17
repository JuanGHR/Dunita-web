import { useEffect, useMemo, useState } from 'react';
import { INSTALACIONES, ESTRUCTURAS_DEFENSA, OBJETOS, RAREZA_CONFIG } from '@/lib/data';
import type { Rareza, TipoInstalacion } from '@/lib/data';
import ItemCard from '@/components/ItemCard';
import {
  BESTIARY_CATEGORIES,
  BESTIARY_CREATURES,
  CREATURE_IMAGE_MAP,
  type BestiaryCategory,
  type BestiaryCreature,
} from '@/lib/creatureBestiary';

type TabType = 'instalaciones' | 'criaturas' | 'defensa' | 'objetos' | 'manual';
type SortType = 'nombre' | 'coste_asc' | 'coste_desc' | 'rareza';

const TOTAL_BESTIARY_CREATURES = Object.values(BESTIARY_CREATURES).reduce((total, creatures) => total + creatures.length, 0);

function BestiaryCreatureCard({
  creature,
  isActive,
  onSelect,
}: {
  creature: BestiaryCreature;
  isActive: boolean;
  onSelect: () => void;
}) {
  const imageUrl = CREATURE_IMAGE_MAP[creature.id] || CREATURE_IMAGE_MAP.shai_hulud;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded border p-4 transition-all ${
        isActive
          ? 'border-orange-400 bg-orange-950/50 shadow-[0_0_0_1px_rgba(251,146,60,0.3)]'
          : 'border-orange-900/60 bg-black/30 hover:border-orange-700 hover:bg-orange-950/20'
      }`}
    >
      <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded border border-orange-900/60 bg-gradient-to-b from-[#050302] to-[#0a0604] p-4">
        <img
          src={imageUrl}
          alt={creature.name}
          className="h-full w-full object-contain pixel-image-wrapper"
          style={{ filter: 'drop-shadow(0 0 18px rgba(251, 146, 60, 0.45))' }}
        />
      </div>
      <h3 className="mb-1 text-lg font-cinzel font-bold text-amber-300">{creature.name}</h3>
      <p className="mb-3 text-xs font-space-mono uppercase tracking-[0.18em] text-orange-400">[{creature.nombreFremen}]</p>
      <p className="mb-3 text-xs font-space-mono uppercase tracking-[0.18em] text-orange-700">{creature.tipo}</p>
      <p className="line-clamp-3 text-sm text-gray-300">{creature.descripcion}</p>
    </button>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('instalaciones');
  const [filterRareza, setFilterRareza] = useState<Rareza | 'all'>('all');
  const [filterTipo, setFilterTipo] = useState<TipoInstalacion | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortType>('rareza');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState<BestiaryCategory>('arrakis');
  const [currentCreatureIndex, setCurrentCreatureIndex] = useState(0);

  const filteredInstalaciones = useMemo(() => {
    let items = [...INSTALACIONES];
    if (filterRareza !== 'all') items = items.filter(i => i.rareza === filterRareza);
    if (filterTipo !== 'all') items = items.filter(i => i.tipo === filterTipo);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => i.nombre.toLowerCase().includes(q) || i.descripcion.toLowerCase().includes(q));
    }
    items.sort((a, b) => {
      if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (sortBy === 'coste_asc') return a.coste - b.coste;
      if (sortBy === 'coste_desc') return b.coste - a.coste;
      if (sortBy === 'rareza') return RAREZA_CONFIG[b.rareza].order - RAREZA_CONFIG[a.rareza].order;
      return 0;
    });
    return items;
  }, [filterRareza, filterTipo, sortBy, searchQuery]);

  const filteredEstructuras = useMemo(() => {
    let items = [...ESTRUCTURAS_DEFENSA];
    if (filterRareza !== 'all') items = items.filter(i => i.rareza === filterRareza);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => i.nombre.toLowerCase().includes(q) || i.descripcion.toLowerCase().includes(q));
    }
    items.sort((a, b) => {
      if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (sortBy === 'coste_asc') return a.coste - b.coste;
      if (sortBy === 'coste_desc') return b.coste - a.coste;
      if (sortBy === 'rareza') return RAREZA_CONFIG[b.rareza].order - RAREZA_CONFIG[a.rareza].order;
      return 0;
    });
    return items;
  }, [filterRareza, sortBy, searchQuery]);

  const filteredObjetos = useMemo(() => {
    let items = [...OBJETOS];
    if (filterRareza !== 'all') items = items.filter(i => i.rareza === filterRareza);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => i.nombre.toLowerCase().includes(q) || i.descripcion.toLowerCase().includes(q));
    }
    items.sort((a, b) => {
      if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (sortBy === 'coste_asc') return a.coste - b.coste;
      if (sortBy === 'coste_desc') return b.coste - a.coste;
      if (sortBy === 'rareza') return RAREZA_CONFIG[b.rareza].order - RAREZA_CONFIG[a.rareza].order;
      return 0;
    });
    return items;
  }, [filterRareza, sortBy, searchQuery]);

  const visibleBestiaryCreatures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const creatures = [...BESTIARY_CREATURES[currentCategory]];

    if (!q) return creatures;

    return creatures.filter(creature =>
      creature.name.toLowerCase().includes(q) ||
      creature.nombreFremen.toLowerCase().includes(q) ||
      creature.tipo.toLowerCase().includes(q) ||
      creature.descripcion.toLowerCase().includes(q) ||
      creature.habitat.toLowerCase().includes(q) ||
      creature.significancia.toLowerCase().includes(q),
    );
  }, [currentCategory, searchQuery]);

  useEffect(() => {
    setCurrentCreatureIndex(0);
  }, [currentCategory]);

  useEffect(() => {
    if (currentCreatureIndex >= visibleBestiaryCreatures.length) {
      setCurrentCreatureIndex(0);
    }
  }, [currentCreatureIndex, visibleBestiaryCreatures.length]);

  const currentCreature = visibleBestiaryCreatures[currentCreatureIndex] ?? null;
  const currentCreatureImage = currentCreature
    ? CREATURE_IMAGE_MAP[currentCreature.id] || CREATURE_IMAGE_MAP.shai_hulud
    : CREATURE_IMAGE_MAP.shai_hulud;

  const handlePrevCreature = () => {
    if (visibleBestiaryCreatures.length === 0) return;
    setCurrentCreatureIndex(prev => (prev - 1 + visibleBestiaryCreatures.length) % visibleBestiaryCreatures.length);
  };

  const handleNextCreature = () => {
    if (visibleBestiaryCreatures.length === 0) return;
    setCurrentCreatureIndex(prev => (prev + 1) % visibleBestiaryCreatures.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b-2 border-orange-600/50 bg-gradient-to-r from-black via-slate-900 to-black">
        <div className="container py-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br from-amber-400 to-orange-600">
                <span className="text-lg font-bold">DUNE</span>
              </div>
              <div>
                <h1 className="font-cinzel text-3xl font-bold text-amber-300">DUNE DOMINION</h1>
                <p className="font-space-mono text-xs text-orange-400">CATALOGO DE ITEMS - ARRAKIS</p>
              </div>
            </div>
            <button className="rounded border-2 border-orange-400 bg-orange-600 px-6 py-2 font-space-mono text-sm font-bold text-black transition-all hover:bg-orange-500">
              JUGAR AHORA
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder={activeTab === 'criaturas' ? 'Buscar criaturas del bestiario...' : 'Buscar items...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-orange-600/50 bg-slate-900 px-4 py-2 font-space-mono text-sm text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
            />
          </div>
        </div>
        <div className="border-t border-orange-600/30 bg-black/50">
          <div className="container flex gap-1 overflow-x-auto py-3">
            <button onClick={() => setActiveTab('instalaciones')} className={`rounded border px-4 py-2 font-space-mono text-sm whitespace-nowrap transition-all ${activeTab === 'instalaciones' ? 'border-orange-400 bg-orange-600 font-bold text-black' : 'border-orange-600/30 bg-slate-900 text-orange-300 hover:border-orange-400'}`}>INSTALACIONES ({INSTALACIONES.length})</button>
            <button onClick={() => setActiveTab('defensa')} className={`rounded border px-4 py-2 font-space-mono text-sm whitespace-nowrap transition-all ${activeTab === 'defensa' ? 'border-orange-400 bg-orange-600 font-bold text-black' : 'border-orange-600/30 bg-slate-900 text-orange-300 hover:border-orange-400'}`}>DEFENSA ({ESTRUCTURAS_DEFENSA.length})</button>
            <button onClick={() => setActiveTab('objetos')} className={`rounded border px-4 py-2 font-space-mono text-sm whitespace-nowrap transition-all ${activeTab === 'objetos' ? 'border-orange-400 bg-orange-600 font-bold text-black' : 'border-orange-600/30 bg-slate-900 text-orange-300 hover:border-orange-400'}`}>OBJETOS ({OBJETOS.length})</button>
            <button onClick={() => setActiveTab('criaturas')} className={`rounded border px-4 py-2 font-space-mono text-sm whitespace-nowrap transition-all ${activeTab === 'criaturas' ? 'border-orange-400 bg-orange-600 font-bold text-black' : 'border-orange-600/30 bg-slate-900 text-orange-300 hover:border-orange-400'}`}>Criaturas</button>
            <button onClick={() => setActiveTab('manual')} className={`rounded border px-4 py-2 font-space-mono text-sm whitespace-nowrap transition-all ${activeTab === 'manual' ? 'border-orange-400 bg-orange-600 font-bold text-black' : 'border-orange-600/30 bg-slate-900 text-orange-300 hover:border-orange-400'}`}>📖 MANUAL</button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {activeTab === 'manual' && (
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border-2 border-orange-600 bg-gradient-to-b from-slate-900 to-slate-950 p-8 text-center">
              <h2 className="mb-4 font-cinzel text-4xl font-bold text-amber-300">MANUAL DEL JUGADOR</h2>
              <p className="mb-8 text-lg text-gray-300">Guía completa de DUNE DOMINION con 10 capítulos detallados</p>
              <div className="mb-8 rounded border border-orange-600/50 bg-black/50 p-6">
                <h3 className="mb-4 text-xl font-cinzel text-amber-300">📖 Contenido del Manual</h3>
                <ul className="mb-6 space-y-2 text-left text-gray-300">
                  <li>✓ Introducción al Universo de Dune</li>
                  <li>✓ Inicio Rápido y Primeros Pasos</li>
                  <li>✓ Descripción de Todas las Instalaciones</li>
                  <li>✓ Estructuras de Defensa y Estrategias</li>
                  <li>✓ Objetos y Recursos Disponibles</li>
                  <li>✓ Bestiario Completo de Criaturas</li>
                  <li>✓ Mecánicas de Juego Avanzadas</li>
                  <li>✓ Estrategias y Consejos Tácticos</li>
                  <li>✓ Glosario de Términos</li>
                  <li>✓ Preguntas Frecuentes</li>
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a href="/MANUAL_DEL_JUGADOR.pdf" target="_blank" rel="noopener noreferrer" className="inline-block rounded border-2 border-orange-400 bg-orange-600 px-8 py-4 text-lg font-bold text-black transition-all hover:bg-orange-500">
                  📥 Descargar PDF
                </a>
                <a href="/MANUAL_DEL_JUGADOR.md" target="_blank" rel="noopener noreferrer" className="inline-block rounded border-2 border-orange-600/50 bg-slate-700 px-8 py-4 text-lg font-bold text-amber-300 transition-all hover:bg-slate-600">
                  📄 Ver en Markdown
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'manual' && activeTab !== 'criaturas' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeTab === 'instalaciones' && filteredInstalaciones.map((item) => (<ItemCard key={item.id} item={item} index={0} />))}
            {activeTab === 'defensa' && filteredEstructuras.map((e) => (
              <div key={e.id} className="rounded border-l-4 border-orange-600 bg-gradient-to-b from-slate-900 to-slate-950 p-4">
                <img src={e.imageUrl} alt={e.nombre} className="mb-3 h-40 w-full rounded object-cover" />
                <h3 className="font-cinzel text-lg font-bold text-amber-300">{e.nombre}</h3>
                <p className="mb-2 font-space-mono text-xs text-orange-400">{e.codigo}</p>
                <p className="mb-3 line-clamp-2 text-sm text-gray-300">{e.descripcion}</p>
                <div className="grid grid-cols-3 gap-2 border-t border-orange-600/30 pt-2 text-center text-xs">
                  <div><span className="text-orange-400">DEF</span><br /><span className="font-bold text-amber-300">{e.stats.defensa}</span></div>
                  <div><span className="text-orange-400">DUR</span><br /><span className="font-bold text-amber-300">{e.stats.durabilidad}</span></div>
                  <div><span className="text-orange-400">COSTE</span><br /><span className="font-bold text-amber-300">{e.coste}</span></div>
                </div>
              </div>
            ))}
            {activeTab === 'objetos' && filteredObjetos.map((o) => (
              <div key={o.id} className="rounded border-l-4 border-amber-600 bg-gradient-to-b from-slate-900 to-slate-950 p-4">
                <img src={o.imageUrl} alt={o.nombre} className="mb-3 h-40 w-full rounded object-cover" />
                <h3 className="font-cinzel text-lg font-bold text-amber-300">{o.nombre}</h3>
                <p className="mb-2 font-space-mono text-xs text-amber-400">{o.tipo}</p>
                <p className="mb-3 line-clamp-2 text-sm text-gray-300">{o.descripcion}</p>
                <div className="grid grid-cols-2 gap-2 border-t border-amber-600/30 pt-2 text-center text-xs">
                  <div><span className="text-amber-400">COSTE</span><br /><span className="font-bold text-amber-300">{o.coste}</span></div>
                  <div><span className="text-amber-400">CANT</span><br /><span className="font-bold text-amber-300">{o.cantidad}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'criaturas' && (
          <section id="criaturas" className="space-y-6">
            <div className="rounded-xl border border-orange-600/40 bg-gradient-to-b from-[#090503] via-black to-[#090503] p-6">
              <div className="mb-6 border-b border-orange-900/60 pb-4 text-center">
                <h2 className="font-space-mono text-xl tracking-[0.35em] text-amber-300">✦ DUNE: CRIATURAS ✦</h2>
                <p className="mt-2 font-space-mono text-xs tracking-[0.28em] text-orange-400">SISTEMA DE DIAGNÓSTICO BESTIARIO v1.0</p>
                <p className="mt-2 font-space-mono text-xs tracking-[0.22em] text-orange-900">[ARRAKIS • DOMINION • DISTRIBUIR]</p>
              </div>

              <div className="mb-6 grid gap-3 md:grid-cols-3">
                {BESTIARY_CATEGORIES.map((category) => {
                  const count = BESTIARY_CREATURES[category.id].length;
                  const isActive = currentCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setCurrentCategory(category.id)}
                      className={`rounded border px-4 py-4 text-left transition-all ${
                        isActive
                          ? 'border-orange-400 bg-orange-950/60 shadow-[0_0_0_1px_rgba(251,146,60,0.25)]'
                          : 'border-orange-900/70 bg-black/30 hover:border-orange-700 hover:bg-orange-950/20'
                      }`}
                    >
                      <div className="mb-1 font-space-mono text-xs font-bold tracking-[0.2em] text-amber-300">▶ {category.label}</div>
                      <div className="text-xs text-orange-400">{category.description}</div>
                      <div className="mt-2 font-space-mono text-[11px] uppercase tracking-[0.18em] text-orange-800">{count} criaturas</div>
                    </button>
                  );
                })}
              </div>

              {currentCreature ? (
                <>
                  <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
                    <div className="rounded border border-orange-900/70 bg-black/40 p-4">
                      <div className="flex min-h-[360px] items-center justify-center rounded border border-orange-900/50 bg-gradient-to-b from-[#050302] to-[#0a0604] p-8">
                        <img
                          src={currentCreatureImage}
                          alt={currentCreature.name}
                          className="pixel-image-wrapper h-72 w-full object-contain md:h-80"
                          style={{ filter: 'drop-shadow(0 0 20px rgba(255, 170, 32, 0.5))' }}
                        />
                      </div>
                      <div className="mt-4 text-center font-space-mono text-xs tracking-[0.2em] text-cyan-300">
                        [CRIATURA {currentCreatureIndex + 1}/{visibleBestiaryCreatures.length}]
                      </div>
                    </div>

                    <div className="flex flex-col rounded border border-orange-900/70 bg-black/40 p-4">
                      <div className="border-b border-orange-900/60 pb-4">
                        <h3 className="font-space-mono text-2xl text-cyan-300">{currentCreature.name}</h3>
                        <p className="mt-1 font-space-mono text-xs tracking-[0.18em] text-orange-400">[{currentCreature.nombreFremen}]</p>
                      </div>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="mb-1 font-space-mono text-[11px] tracking-[0.2em] text-orange-800">ESPECIE</p>
                          <p className="text-sm font-bold text-amber-300">{currentCreature.tipo}</p>
                        </div>
                        <div>
                          <p className="mb-1 font-space-mono text-[11px] tracking-[0.2em] text-orange-800">TAMAÑO</p>
                          <p className="text-sm font-bold text-amber-300">{currentCreature.tamaño}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="mb-1 font-space-mono text-[11px] tracking-[0.2em] text-orange-800">HÁBITAT</p>
                        <p className="text-sm text-amber-200">{currentCreature.habitat}</p>
                      </div>

                      <div className="mt-4 flex-1">
                        <p className="mb-1 font-space-mono text-[11px] tracking-[0.2em] text-orange-800">DESCRIPCIÓN</p>
                        <p className="text-sm leading-relaxed text-gray-300">{currentCreature.descripcion}</p>
                      </div>

                      <div className="mt-4 border-t border-orange-900/60 pt-4">
                        <p className="mb-1 font-space-mono text-[11px] tracking-[0.2em] text-orange-800">SIGNIFICANCIA</p>
                        <p className="font-bold text-orange-400">▶ {currentCreature.significancia}</p>
                      </div>

                      <div className="mt-4 flex items-center gap-2 font-space-mono text-xs text-green-400">
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        <span>FLUJO DE DATOS ACTIVO</span>
                      </div>

                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <button
                          type="button"
                          onClick={handlePrevCreature}
                          disabled={visibleBestiaryCreatures.length === 0}
                          className="rounded border border-orange-700 bg-black/50 px-5 py-2 font-space-mono text-xs font-bold tracking-[0.18em] text-amber-300 transition-all hover:border-orange-400 hover:bg-orange-950/30 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          ◄ ANTERIOR
                        </button>
                        <button
                          type="button"
                          onClick={handleNextCreature}
                          disabled={visibleBestiaryCreatures.length === 0}
                          className="rounded border border-orange-700 bg-black/50 px-5 py-2 font-space-mono text-xs font-bold tracking-[0.18em] text-amber-300 transition-all hover:border-orange-400 hover:bg-orange-950/30 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          SIGUIENTE ►
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded border border-orange-900/70 bg-black/30 p-4">
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <span className="flex items-center gap-2 font-space-mono text-xs tracking-[0.16em] text-green-400">
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        SISTEMA EN LÍNEA
                      </span>
                      <span className="font-space-mono text-xs tracking-[0.18em] text-amber-300">CATEGORÍA: {BESTIARY_CATEGORIES.find(category => category.id === currentCategory)?.label}</span>
                      <span className="font-space-mono text-xs tracking-[0.18em] text-orange-400">CRIATURAS VISIBLES: {visibleBestiaryCreatures.length}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {visibleBestiaryCreatures.map((creature, index) => (
                        <BestiaryCreatureCard
                          key={creature.id}
                          creature={creature}
                          isActive={index === currentCreatureIndex}
                          onSelect={() => setCurrentCreatureIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded border border-orange-900/70 bg-black/30 p-8 text-center">
                  <p className="font-space-mono text-sm tracking-[0.18em] text-orange-400">No hay criaturas que coincidan con la búsqueda en esta categoría.</p>
                </div>
              )}
            </div>

            <div className="rounded border border-orange-900/60 bg-black/30 p-4 text-center font-space-mono text-xs tracking-[0.18em] text-orange-500">
              UNIVERSO DUNE DE FRANK HERBERT | BASE DE DATOS DE CRIATURAS | TOTAL CARGADO: {TOTAL_BESTIARY_CREATURES}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
