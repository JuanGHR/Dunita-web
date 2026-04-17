// ============================================================
// DUNE DOMINION — Catálogo de Ítems
// Datos oficiales del juego extraídos del repositorio GitHub
// ============================================================

export type Rareza = 'common' | 'rare' | 'epic' | 'legendary';
export type Faccion = 'atreides' | 'harkonnen' | 'fremen' | 'neutral';
export type TipoInstalacion = 'Aclimatacion' | 'Exhibicion';
export type MedioSoportado = 'Desierto' | 'Aereo' | 'Subterraneo';
export type Alimentacion = 'Recolector' | 'Depredador';

export interface Stats {
  seguridad: number;
  capacidad: number;
  costeMantenimiento: number;
  ingresos: number;
}

export interface Instalacion {
  id: string;
  nombre: string;
  codigo: string;
  tipo: TipoInstalacion;
  categoria: string;
  coste: number;
  hectareas: number;
  capacidadCriaturas: number;
  medioSoportado: MedioSoportado;
  alimentacionSoportada: Alimentacion;
  descripcion: string;
  rareza: Rareza;
  faccion: Faccion;
  efectos: string[];
  stats: Stats;
  tags: string[];
  imageUrl: string;
}

export interface Estructura {
  id: string;
  nombre: string;
  codigo: string;
  categoria: string;
  coste: number;
  descripcion: string;
  rareza: Rareza;
  efectos: string[];
  stats: { defensa: number; durabilidad: number; costeMantenimiento: number };
  imageUrl: string;
}

export interface Objeto {
  id: string;
  nombre: string;
  tipo: string;
  categoria: string;
  coste: number;
  cantidad: number;
  descripcion: string;
  rareza: Rareza;
  efectos: string[];
  imageUrl: string;
}

export interface Criatura {
  id: string;
  nombre: string;
  nombreComun: string;
  categoria: string;
  especie: string;
  tamano: string;
  habitat: string;
  descripcion: string;
  significancia: string;
  peligrosidad: string;
  velocidad: string;
  dieta: string;
  inteligencia: string;
  rareza: Rareza;
  costeCompra: number;
  apetitoBase: number;
  edadAdulta: number;
  imageUrl: string | null;
}

export const INSTALACIONES: Instalacion[] = [
  {
    id: 'bunker',
    nombre: 'Búnker',
    codigo: 'BUNKER',
    tipo: 'Aclimatacion',
    categoria: 'Defensa',
    coste: 8000,
    hectareas: 3,
    capacidadCriaturas: 4,
    medioSoportado: 'Subterraneo',
    alimentacionSoportada: 'Depredador',
    descripcion: 'Instalación subterránea blindada para albergar criaturas depredadoras peligrosas. Proporciona un entorno seguro y controlado para las especies más agresivas de Arrakis. Sus muros reforzados resisten incluso los ataques de los gusanos de arena menores.',
    rareza: 'epic',
    faccion: 'harkonnen',
    efectos: ['Defensa', 'Depredadores', 'Subterráneo'],
    stats: { seguridad: 95, capacidad: 40, costeMantenimiento: 70, ingresos: 20 },
    tags: ['defensive', 'harkonnen'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/bunker_652a353e.png'
  },
  {
    id: 'centro_investigacion',
    nombre: 'Centro de Investigación',
    codigo: 'CENTRO_INV',
    tipo: 'Aclimatacion',
    categoria: 'Ciencia',
    coste: 12000,
    hectareas: 5,
    capacidadCriaturas: 3,
    medioSoportado: 'Aereo',
    alimentacionSoportada: 'Recolector',
    descripcion: 'Laboratorio avanzado para el estudio científico de las criaturas de Arrakis. Permite investigar las propiedades biológicas únicas de la fauna del desierto y desarrollar nuevas tecnologías basadas en la especia melange.',
    rareza: 'legendary',
    faccion: 'atreides',
    efectos: ['Investigación', 'Tecnología', 'Especia'],
    stats: { seguridad: 60, capacidad: 30, costeMantenimiento: 90, ingresos: 50 },
    tags: ['utility', 'atreides', 'spice'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/centro_investigacion_ac1a9108.png'
  },
  {
    id: 'centro_mantenimiento',
    nombre: 'Centro de Mantenimiento',
    codigo: 'CENTRO_MANT',
    tipo: 'Aclimatacion',
    categoria: 'Soporte',
    coste: 6000,
    hectareas: 4,
    capacidadCriaturas: 6,
    medioSoportado: 'Desierto',
    alimentacionSoportada: 'Recolector',
    descripcion: 'Instalación de soporte vital para el cuidado y mantenimiento de las criaturas del desierto. Proporciona atención veterinaria y recursos de subsistencia para mantener la salud de la fauna de Arrakis.',
    rareza: 'common',
    faccion: 'fremen',
    efectos: ['Sanación', 'Mantenimiento', 'Soporte'],
    stats: { seguridad: 50, capacidad: 60, costeMantenimiento: 40, ingresos: 30 },
    tags: ['utility', 'fremen'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/centro_mantenimiento_446d00d2.png'
  },
  {
    id: 'invernadero',
    nombre: 'Invernadero',
    codigo: 'INVERNADERO',
    tipo: 'Aclimatacion',
    categoria: 'Botánica',
    coste: 9000,
    hectareas: 6,
    capacidadCriaturas: 8,
    medioSoportado: 'Aereo',
    alimentacionSoportada: 'Recolector',
    descripcion: 'Estructura de cultivo controlada que recrea ecosistemas naturales para criaturas herbívoras y recolectoras. Permite mantener especies de múltiples mundos en un entorno artificial con clima regulado.',
    rareza: 'rare',
    faccion: 'atreides',
    efectos: ['Botánica', 'Ecosistema', 'Aéreo'],
    stats: { seguridad: 40, capacidad: 80, costeMantenimiento: 55, ingresos: 45 },
    tags: ['utility', 'atreides'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/invernadero_99c7b19e.png'
  },
  {
    id: 'mercado',
    nombre: 'Mercado',
    codigo: 'MERCADO',
    tipo: 'Exhibicion',
    categoria: 'Comercio',
    coste: 15000,
    hectareas: 8,
    capacidadCriaturas: 10,
    medioSoportado: 'Desierto',
    alimentacionSoportada: 'Recolector',
    descripcion: 'Gran plaza comercial donde los visitantes pueden observar y adquirir criaturas exóticas de Arrakis. El corazón económico del enclave, atrae a comerciantes de toda la galaxia con sus mercancías únicas.',
    rareza: 'legendary',
    faccion: 'harkonnen',
    efectos: ['Comercio', 'Visitantes', 'Solaris'],
    stats: { seguridad: 30, capacidad: 100, costeMantenimiento: 60, ingresos: 95 },
    tags: ['utility', 'spice', 'harkonnen'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/mercado_79f7a1d7.png'
  },
  {
    id: 'oficina_especia',
    nombre: 'Oficina de Especia',
    codigo: 'OFICINA_ESP',
    tipo: 'Exhibicion',
    categoria: 'Especia',
    coste: 20000,
    hectareas: 4,
    capacidadCriaturas: 2,
    medioSoportado: 'Desierto',
    alimentacionSoportada: 'Depredador',
    descripcion: 'Centro de procesamiento y comercio de la preciada Melange. Gestiona la extracción y distribución de la especia más valiosa del universo conocido, fuente de todo poder político y económico en Arrakis.',
    rareza: 'legendary',
    faccion: 'harkonnen',
    efectos: ['Especia', 'Solaris', 'Poder'],
    stats: { seguridad: 85, capacidad: 20, costeMantenimiento: 80, ingresos: 100 },
    tags: ['spice', 'harkonnen', 'offensive'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/oficina_especia_1a610bed.png'
  },
  {
    id: 'recinto_grande',
    nombre: 'Recinto Grande',
    codigo: 'RECINTO_G',
    tipo: 'Exhibicion',
    categoria: 'Exhibición',
    coste: 18000,
    hectareas: 12,
    capacidadCriaturas: 15,
    medioSoportado: 'Desierto',
    alimentacionSoportada: 'Depredador',
    descripcion: 'Vasto recinto de exhibición para las criaturas más imponentes de Arrakis. Diseñado para albergar gusanos de arena y otras bestias colosales, atrae a miles de visitantes de toda la galaxia.',
    rareza: 'epic',
    faccion: 'fremen',
    efectos: ['Exhibición', 'Visitantes', 'Gusanos'],
    stats: { seguridad: 70, capacidad: 100, costeMantenimiento: 75, ingresos: 85 },
    tags: ['fremen', 'spice', 'defensive'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/recinto_grande_ace37e36.png'
  },
  {
    id: 'recinto_pequeno',
    nombre: 'Recinto Pequeño',
    codigo: 'RECINTO_P',
    tipo: 'Exhibicion',
    categoria: 'Exhibición',
    coste: 5000,
    hectareas: 3,
    capacidadCriaturas: 5,
    medioSoportado: 'Aereo',
    alimentacionSoportada: 'Recolector',
    descripcion: 'Recinto compacto para criaturas pequeñas y medianas. Ideal para aves del desierto, roedores canguro y otras especies menos peligrosas que atraen a visitantes familiares y estudiantes.',
    rareza: 'common',
    faccion: 'fremen',
    efectos: ['Exhibición', 'Visitantes', 'Familiar'],
    stats: { seguridad: 45, capacidad: 50, costeMantenimiento: 30, ingresos: 55 },
    tags: ['fremen', 'utility'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/recinto_pequeno_5c34e088.png'
  }
];

export const ESTRUCTURAS_DEFENSA: Estructura[] = [
  {
    id: 'torre_defensa',
    nombre: 'Torre de Defensa',
    codigo: 'TORRE_DEF',
    categoria: 'Defensa',
    coste: 10000,
    descripcion: 'Torre defensiva elevada con sistemas de armas láser de largo alcance. Proporciona cobertura defensiva sobre un área amplia del enclave. Equipada con radar de seguimiento automático y turrets rotativos.',
    rareza: 'epic',
    efectos: ['Defensa Aérea', 'Largo Alcance', 'Automatizado'],
    stats: { defensa: 85, durabilidad: 70, costeMantenimiento: 50 },
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/torre_defensa-hzMGrApXhqeZ4teVkVPZ3z.webp'
  },
  {
    id: 'muro_defensa',
    nombre: 'Muro de Defensa',
    codigo: 'MURO_DEF',
    categoria: 'Defensa',
    coste: 8000,
    descripcion: 'Muro fortificado con emplazamientos de armas y placas de blindaje reforzado. Crea una barrera defensiva perimetral alrededor del enclave. Incluye sistemas de detección de intrusiones.',
    rareza: 'rare',
    efectos: ['Barrera Defensiva', 'Detección', 'Reforzado'],
    stats: { defensa: 75, durabilidad: 90, costeMantenimiento: 35 },
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/muro_defensa-dVfn78CPqFsd89UApmD8kZ.webp'
  },
  {
    id: 'puesto_vigilancia',
    nombre: 'Puesto de Vigilancia',
    codigo: 'PUESTO_VIG',
    categoria: 'Defensa',
    coste: 5000,
    descripcion: 'Torre de observación elevada con faro de búsqueda y sistema de comunicaciones. Proporciona visibilidad táctica del territorio circundante. Ideal para detección temprana de amenazas.',
    rareza: 'common',
    efectos: ['Visibilidad', 'Comunicaciones', 'Detección Temprana'],
    stats: { defensa: 40, durabilidad: 50, costeMantenimiento: 20 },
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/puesto_vigilancia-WRsZdP2m9bECpDfjYYdro5.webp'
  },
  {
    id: 'artilleria_pesada',
    nombre: 'Artillería Pesada',
    codigo: 'ARTILLERIA',
    categoria: 'Defensa',
    coste: 15000,
    descripcion: 'Cañón de artillería de largo alcance con sistema de orientación automático. Capaz de destruir objetivos a gran distancia. Requiere suministro constante de munición de energía.',
    rareza: 'legendary',
    efectos: ['Ataque Devastador', 'Largo Alcance', 'Alto Poder'],
    stats: { defensa: 95, durabilidad: 60, costeMantenimiento: 80 },
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/artilleria_pesada-2y5TgSBTBtt8SdBRVTfMZb.webp'
  },
  {
    id: 'escudo_generador',
    nombre: 'Generador de Escudo',
    codigo: 'ESCUDO_GEN',
    categoria: 'Defensa',
    coste: 20000,
    descripcion: 'Generador de campo de energía defensivo que cubre todo el enclave. Proporciona protección contra ataques energéticos y proyectiles. Requiere gran cantidad de energía para mantener activo.',
    rareza: 'legendary',
    efectos: ['Campo Defensivo', 'Protección Total', 'Anti-Energía'],
    stats: { defensa: 100, durabilidad: 80, costeMantenimiento: 100 },
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/escudo_generador-UCyJwNDu2oQgSh32oj9v7f.webp'
  }
];

export const OBJETOS: Objeto[] = [
  {
    id: 'pocion_curacion',
    nombre: 'Poción de Curación',
    tipo: 'Consumible',
    categoria: 'Pociones',
    coste: 500,
    cantidad: 1,
    descripcion: 'Vial de líquido azul luminiscente que restaura la salud de las criaturas. Efecto inmediato al consumir. Fabricada con extractos de plantas del desierto de Arrakis.',
    rareza: 'common',
    efectos: ['Restaura Salud', 'Efecto Inmediato'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/pocion_curacion-Exge54aXmqhxWKukayBvs6.webp'
  },
  {
    id: 'pocion_escudo',
    nombre: 'Poción de Escudo',
    tipo: 'Consumible',
    categoria: 'Pociones',
    coste: 750,
    cantidad: 1,
    descripcion: 'Vial de líquido dorado que otorga protección defensiva temporal. Aumenta la resistencia a daño durante 30 minutos. Altamente valorada en combate.',
    rareza: 'rare',
    efectos: ['Aumenta Defensa', 'Duración 30 min', 'Resistencia'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/pocion_escudo-2b7ye8WGykd9nEeF68rRc6.webp'
  },
  {
    id: 'pocion_velocidad',
    nombre: 'Poción de Velocidad',
    tipo: 'Consumible',
    categoria: 'Pociones',
    coste: 600,
    cantidad: 1,
    descripcion: 'Vial de líquido verde brillante que aumenta la velocidad de movimiento. Efecto dura 20 minutos. Permite reaccionar más rápido en combate.',
    rareza: 'rare',
    efectos: ['Aumenta Velocidad', 'Duración 20 min', 'Agilidad'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/pocion_velocidad-TtAFuLUtFPBaskWMvUS9TT.webp'
  },
  {
    id: 'recluta_soldado',
    nombre: 'Recluta Soldado',
    tipo: 'Unidad',
    categoria: 'Reclutas',
    coste: 2000,
    cantidad: 1,
    descripcion: 'Soldado de infantería entrenado en combate desértico. Equipado con rifle láser y armadura ligera. Unidad básica pero versátil para defensa del enclave.',
    rareza: 'common',
    efectos: ['Combate Básico', 'Armadura Ligera', 'Versátil'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/recluta_soldado-6hDHzKUt9ggJyybtnJrrzp.webp'
  },
  {
    id: 'mercenario_elite',
    nombre: 'Mercenario Élite',
    tipo: 'Unidad',
    categoria: 'Mercenarios',
    coste: 5000,
    cantidad: 1,
    descripcion: 'Guerrero experimentado con armadura de combate avanzada y armas pesadas. Especialista en operaciones tácticas. Altamente efectivo en combate cuerpo a cuerpo y a distancia.',
    rareza: 'epic',
    efectos: ['Combate Avanzado', 'Armas Pesadas', 'Táctico'],
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663551339379/mLtpe2ngJKbyWLrCkxYywe/mercenario_elite-jY7HhFMkBmazDbWV9QpEQF.webp'
  }
];

export const CRIATURAS: Criatura[] = [
  {
    id: 'shai_hulud',
    nombre: "Shai-Hulud",
    nombreComun: "Gusano de Arena",
    categoria: 'arrakis',
    especie: "Sandworm",
    tamano: "Hasta 400+ metros de largo",
    habitat: "Arenas profundas de Arrakis",
    descripcion: "Gusanos de arena masivos e inteligentes que dominan Arrakis. Los Fremen los veneran como seres divinos. Producen la especia melange a través de su ciclo de vida.",
    significancia: "Sagrado para los Fremen, fuente de la especia melange",
    peligrosidad: "Extrema",
    velocidad: "Muy rápida bajo tierra",
    dieta: "Materia orgánica, plancton de arena",
    inteligencia: "Alta",
    rareza: 'legendary',
    costeCompra: 50000,
    apetitoBase: 100,
    edadAdulta: 24,
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663452877580/Tj6E9GfbunnYfScJdesLtv/shai-hulud-pixel-5WJwH8wzQJfM9s9kdgdPas.webp'
  },
  {
    id: 'muad_dib',
    nombre: "Muad'Dib",
    nombreComun: "Ratón Canguro del Desierto",
    categoria: 'arrakis',
    especie: "Kangaroo Mouse",
    tamano: "Pequeño roedor, ~15cm",
    habitat: "Superficie del desierto de Arrakis",
    descripcion: "Pequeño roedor del desierto que salta y sobrevive creando su propia agua viajando de noche. Símbolo de supervivencia y adaptación al entorno más hostil.",
    significancia: "Símbolo de Paul Atreides, representa la supervivencia del desierto",
    peligrosidad: "Muy Baja",
    velocidad: "Rápida en saltos",
    dieta: "Semillas, plantas del desierto",
    inteligencia: "Moderada",
    rareza: 'common',
    costeCompra: 500,
    apetitoBase: 5,
    edadAdulta: 3,
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663452877580/Tj6E9GfbunnYfScJdesLtv/muad-dib-pixel-d3Nn6Rwya6WSAwDgEm5fKB.webp'
  },
  {
    id: 'cielago',
    nombre: "Ciélago",
    nombreComun: "Murciélago del Desierto",
    categoria: 'arrakis',
    especie: "Desert Bat",
    tamano: "Pequeño, ~20cm envergadura",
    habitat: "Cuevas y grietas del desierto de Arrakis",
    descripcion: "Murciélagos que habitan las cavernas desérticas de Arrakis. Utilizan ecolocalización para navegar en la oscuridad absoluta de las cuevas subterráneas.",
    significancia: "Adaptación a la vida subterránea del desierto",
    peligrosidad: "Baja",
    velocidad: "Rápida en vuelo",
    dieta: "Insectos del desierto",
    inteligencia: "Moderada",
    rareza: 'common',
    costeCompra: 300,
    apetitoBase: 3,
    edadAdulta: 2,
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663452877580/Tj6E9GfbunnYfScJdesLtv/cielago-pixel-TJ7yfjzUWGwhuAixCqsNNk.webp'
  },
  {
    id: 'desert_hawk',
    nombre: "Águila del Desierto",
    nombreComun: "Señor del Cielo",
    categoria: 'arrakis',
    especie: "Desert Hawk",
    tamano: "Ave grande, ~80cm",
    habitat: "Cielos y acantilados de Arrakis",
    descripcion: "Majestuosa ave rapaz encontrada en los cielos de Arrakis. Símbolo de nobleza y destreza entre las facciones del planeta. Sus plumas son utilizadas en rituales Fremen.",
    significancia: "Símbolo de destreza y nobleza entre las facciones",
    peligrosidad: "Moderada",
    velocidad: "Muy rápida en vuelo",
    dieta: "Pequeños animales del desierto",
    inteligencia: "Alta",
    rareza: 'rare',
    costeCompra: 2000,
    apetitoBase: 20,
    edadAdulta: 5,
    imageUrl: null
  },
  {
    id: 'sand_scorpion',
    nombre: "Escorpión de Arena",
    nombreComun: "Guardián del Desierto",
    categoria: 'arrakis',
    especie: "Sand Scorpion",
    tamano: "Mediano, ~30cm",
    habitat: "Dunas y rocas del desierto de Arrakis",
    descripcion: "Escorpión venenoso nativo de Arrakis. Su veneno es utilizado por los Fremen para múltiples propósitos medicinales y rituales. Guardián natural de las entradas a los sietch.",
    significancia: "Guardián natural del desierto, respetado por los Fremen",
    peligrosidad: "Alta",
    velocidad: "Moderada",
    dieta: "Insectos, pequeños roedores",
    inteligencia: "Baja",
    rareza: 'rare',
    costeCompra: 1500,
    apetitoBase: 15,
    edadAdulta: 4,
    imageUrl: null
  },
  {
    id: 'sand_trout',
    nombre: "Trucha de Arena",
    nombreComun: "Larva de Gusano",
    categoria: 'arrakis',
    especie: "Sand Trout",
    tamano: "Pequeño, ~10cm",
    habitat: "Arenas húmedas de Arrakis",
    descripcion: "Fase larvaria del Shai-Hulud. Las truchas de arena se agrupan para absorber agua y eventualmente fusionarse en un gusano de arena adulto. Extremadamente raras.",
    significancia: "Fase juvenil del sagrado Shai-Hulud, clave en el ciclo de la especia",
    peligrosidad: "Baja",
    velocidad: "Lenta",
    dieta: "Agua, minerales del subsuelo",
    inteligencia: "Muy Baja",
    rareza: 'epic',
    costeCompra: 8000,
    apetitoBase: 50,
    edadAdulta: 12,
    imageUrl: null
  }
];

export const RAREZA_CONFIG = {
  legendary: { label: 'Legendario', color: 'text-yellow-400', bgClass: 'badge-legendary', order: 4 },
  epic: { label: 'Épico', color: 'text-orange-400', bgClass: 'badge-epic', order: 3 },
  rare: { label: 'Raro', color: 'text-blue-400', bgClass: 'badge-rare', order: 2 },
  common: { label: 'Común', color: 'text-gray-400', bgClass: 'badge-common', order: 1 },
};

export const FACCION_CONFIG = {
  atreides: { label: 'Casa Atreides', color: '#4a90d9', icon: '🦅' },
  harkonnen: { label: 'Casa Harkonnen', color: '#c0392b', icon: '⚔️' },
  fremen: { label: 'Fremen', color: '#c8860a', icon: '🌙' },
  neutral: { label: 'Neutral', color: '#7a6a4f', icon: '⚖️' },
};

export const MEDIO_CONFIG = {
  Desierto: { label: 'Desierto', icon: '🏜️', color: '#c8860a' },
  Aereo: { label: 'Aéreo', icon: '🌬️', color: '#4a90d9' },
  Subterraneo: { label: 'Subterráneo', icon: '⛏️', color: '#8b4513' },
};

export const ALIMENTACION_CONFIG = {
  Recolector: { label: 'Recolector', icon: '🌿', color: '#4a9d4a' },
  Depredador: { label: 'Depredador', icon: '🦷', color: '#c0392b' },
};

export const CATEGORIA_ESTRUCTURA = {
  Defensa: { label: 'Defensa', icon: '🛡️', color: '#ff4500' },
};

export const TIPO_OBJETO = {
  Consumible: { label: 'Consumible', icon: '🧪', color: '#4a90d9' },
  Unidad: { label: 'Unidad', icon: '👤', color: '#c8860a' },
};

export const CATEGORIA_OBJETO = {
  Pociones: { label: 'Pociones', icon: '🧫', color: '#4a9d4a' },
  Reclutas: { label: 'Reclutas', icon: '⚔️', color: '#c8860a' },
  Mercenarios: { label: 'Mercenarios', icon: '🗡️', color: '#ff4500' },
};
