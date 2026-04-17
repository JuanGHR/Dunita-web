import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const INSTALACIONES = [
  {
    id: 'bunker-001',
    nombre: 'Búnker',
    descripcion: 'Instalación subterránea blindada para albergar tropas y recursos.',
    categoria: 'DEFENSA',
    tipo: 'Aclimatación',
    rareza: 'legendario',
    coste: 5000,
    imageUrl: 'https://cdn.example.com/bunker.png',
    codigo: 'BUNKER',
    faccion: 'Casa Harkonnen',
    stats: JSON.stringify({ seguridad: 95, capacidad: 40, ingresos: 20, mantenimiento: 50 }),
    efectos: JSON.stringify(['Protección máxima', 'Blindaje especial'])
  },
  {
    id: 'centro-investigacion-001',
    nombre: 'Centro de Investigación',
    descripcion: 'Laboratorio avanzado para el estudio científico de las criaturas de Arrakis.',
    categoria: 'INVESTIGACION',
    tipo: 'Exhibición',
    rareza: 'legendario',
    coste: 4500,
    imageUrl: 'https://cdn.example.com/centro-investigacion.png',
    codigo: 'CENTRO_INV',
    faccion: 'Casa Atreides',
    stats: JSON.stringify({ seguridad: 60, capacidad: 30, ingresos: 50, mantenimiento: 40 }),
    efectos: JSON.stringify(['Investigación +30%', 'Descubrimientos únicos'])
  },
];

const ESTRUCTURAS_DEFENSA = [
  {
    id: 'torre-defensa-001',
    nombre: 'Torre de Defensa',
    descripcion: 'Torre armada con cañones de energía para defender el enclave.',
    codigo: 'TORRE_DEF',
    rareza: 'epico',
    coste: 2500,
    imageUrl: 'https://cdn.example.com/torre-defensa.png',
    stats: JSON.stringify({ defensa: 85, durabilidad: 100 }),
    efectos: JSON.stringify(['Disparo automático', 'Cobertura 360°'])
  },
  {
    id: 'muro-defensa-001',
    nombre: 'Muro de Defensa',
    descripcion: 'Muro reforzado que rodea el perímetro del enclave.',
    codigo: 'MURO_DEF',
    rareza: 'raro',
    coste: 1500,
    imageUrl: 'https://cdn.example.com/muro-defensa.png',
    stats: JSON.stringify({ defensa: 70, durabilidad: 150 }),
    efectos: JSON.stringify(['Barrera física', 'Ralentiza enemigos'])
  },
];

const OBJETOS = [
  {
    id: 'pocion-curacion-001',
    nombre: 'Poción de Curación',
    descripcion: 'Restaura 50 puntos de salud al usuario.',
    tipo: 'POCION',
    categoria: 'Consumible',
    rareza: 'comun',
    coste: 100,
    cantidad: 5,
    imageUrl: 'https://cdn.example.com/pocion-curacion.png',
    efectos: JSON.stringify(['Curación +50 HP', 'Duración 10 turnos'])
  },
  {
    id: 'recluta-soldado-001',
    nombre: 'Recluta Soldado',
    descripcion: 'Soldado entrenado listo para el combate.',
    tipo: 'RECLUTA',
    categoria: 'Unidad',
    rareza: 'comun',
    coste: 500,
    cantidad: 1,
    imageUrl: 'https://cdn.example.com/recluta-soldado.png',
    efectos: JSON.stringify(['Ataque +20', 'Defensa +10'])
  },
];

const CRIATURAS = [
  {
    id: 'shai-hulud-001',
    nombre: 'Shai-Hulud',
    nombreComun: 'Gusano de Arena',
    descripcion: 'La criatura más poderosa de Arrakis, productora de la especia melange.',
    especie: 'Gusano de Arena',
    rareza: 'legendario',
    costeCompra: 50000,
    costeVenta: 25000,
    imageUrl: 'https://cdn.example.com/shai-hulud.png',
    stats: JSON.stringify({ ataque: 95, defensa: 85, velocidad: 60, resistencia: 100 }),
    habilidades: JSON.stringify(['Terremoto', 'Absorción de especia', 'Regeneración'])
  },
  {
    id: 'muad-dib-001',
    nombre: 'Muad\'Dib',
    nombreComun: 'Águila del Desierto',
    descripcion: 'Águila legendaria de Arrakis, símbolo de poder y libertad.',
    especie: 'Águila',
    rareza: 'epico',
    costeCompra: 10000,
    costeVenta: 5000,
    imageUrl: 'https://cdn.example.com/muad-dib.png',
    stats: JSON.stringify({ ataque: 75, defensa: 60, velocidad: 95, resistencia: 70 }),
    habilidades: JSON.stringify(['Vuelo rápido', 'Visión nocturna', 'Ataque aéreo'])
  },
];

async function seedDatabase() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    console.log('🌱 Iniciando carga de datos...');

    // Limpiar tablas existentes
    await connection.execute('DELETE FROM instalaciones');
    await connection.execute('DELETE FROM estructuras_defensa');
    await connection.execute('DELETE FROM objetos');
    await connection.execute('DELETE FROM criaturas');

    // Insertar instalaciones
    console.log('📦 Cargando instalaciones...');
    for (const item of INSTALACIONES) {
      await connection.execute(
        'INSERT INTO instalaciones (id, nombre, descripcion, categoria, tipo, rareza, coste, imageUrl, codigo, faccion, stats, efectos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [item.id, item.nombre, item.descripcion, item.categoria, item.tipo, item.rareza, item.coste, item.imageUrl, item.codigo, item.faccion, item.stats, item.efectos]
      );
    }
    console.log(`✅ ${INSTALACIONES.length} instalaciones cargadas`);

    // Insertar estructuras de defensa
    console.log('🛡️ Cargando estructuras de defensa...');
    for (const item of ESTRUCTURAS_DEFENSA) {
      await connection.execute(
        'INSERT INTO estructuras_defensa (id, nombre, descripcion, codigo, rareza, coste, imageUrl, stats, efectos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [item.id, item.nombre, item.descripcion, item.codigo, item.rareza, item.coste, item.imageUrl, item.stats, item.efectos]
      );
    }
    console.log(`✅ ${ESTRUCTURAS_DEFENSA.length} estructuras de defensa cargadas`);

    // Insertar objetos
    console.log('🎁 Cargando objetos...');
    for (const item of OBJETOS) {
      await connection.execute(
        'INSERT INTO objetos (id, nombre, descripcion, tipo, categoria, rareza, coste, cantidad, imageUrl, efectos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [item.id, item.nombre, item.descripcion, item.tipo, item.categoria, item.rareza, item.coste, item.cantidad, item.imageUrl, item.efectos]
      );
    }
    console.log(`✅ ${OBJETOS.length} objetos cargados`);

    // Insertar criaturas
    console.log('🐉 Cargando criaturas...');
    for (const item of CRIATURAS) {
      await connection.execute(
        'INSERT INTO criaturas (id, nombre, nombreComun, descripcion, especie, rareza, costeCompra, costeVenta, imageUrl, stats, habilidades) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [item.id, item.nombre, item.nombreComun, item.descripcion, item.especie, item.rareza, item.costeCompra, item.costeVenta, item.imageUrl, item.stats, item.habilidades]
      );
    }
    console.log(`✅ ${CRIATURAS.length} criaturas cargadas`);

    console.log('\n🎉 ¡Base de datos cargada exitosamente!');
    console.log(`📊 Total de ítems: ${INSTALACIONES.length + ESTRUCTURAS_DEFENSA.length + OBJETOS.length + CRIATURAS.length}`);

  } catch (error) {
    console.error('❌ Error al cargar datos:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedDatabase();
