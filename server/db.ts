import { eq, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, instalaciones, estructurasDefensa, objetos, criaturas, InsertInstalacion, InsertEstructuraDefensa, InsertObjeto, InsertCriatura } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================
// INSTALACIONES (Buildings)
// ============================================================

export async function getAllInstalaciones() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(instalaciones);
}

export async function getInstalacionById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(instalaciones).where(eq(instalaciones.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createInstalacion(data: InsertInstalacion) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(instalaciones).values(data);
  return getInstalacionById(data.id);
}

export async function updateInstalacion(id: string, data: Partial<InsertInstalacion>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(instalaciones).set(data).where(eq(instalaciones.id, id));
  return getInstalacionById(id);
}

export async function deleteInstalacion(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(instalaciones).where(eq(instalaciones.id, id));
}

// ============================================================
// ESTRUCTURAS DE DEFENSA (Defense Structures)
// ============================================================

export async function getAllEstructurasDefensa() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(estructurasDefensa);
}

export async function getEstructuraDefensaById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(estructurasDefensa).where(eq(estructurasDefensa.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createEstructuraDefensa(data: InsertEstructuraDefensa) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(estructurasDefensa).values(data);
  return getEstructuraDefensaById(data.id);
}

export async function updateEstructuraDefensa(id: string, data: Partial<InsertEstructuraDefensa>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(estructurasDefensa).set(data).where(eq(estructurasDefensa.id, id));
  return getEstructuraDefensaById(id);
}

export async function deleteEstructuraDefensa(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(estructurasDefensa).where(eq(estructurasDefensa.id, id));
}

// ============================================================
// OBJETOS (Items)
// ============================================================

export async function getAllObjetos() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(objetos);
}

export async function getObjetoById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(objetos).where(eq(objetos.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createObjeto(data: InsertObjeto) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(objetos).values(data);
  return getObjetoById(data.id);
}

export async function updateObjeto(id: string, data: Partial<InsertObjeto>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(objetos).set(data).where(eq(objetos.id, id));
  return getObjetoById(id);
}

export async function deleteObjeto(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(objetos).where(eq(objetos.id, id));
}

// ============================================================
// CRIATURAS (Creatures)
// ============================================================

export async function getAllCriaturas() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(criaturas);
}

export async function getCriaturaById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(criaturas).where(eq(criaturas.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCriatura(data: InsertCriatura) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(criaturas).values(data);
  return getCriaturaById(data.id);
}

export async function updateCriatura(id: string, data: Partial<InsertCriatura>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(criaturas).set(data).where(eq(criaturas.id, id));
  return getCriaturaById(id);
}

export async function deleteCriatura(id: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(criaturas).where(eq(criaturas.id, id));
}
