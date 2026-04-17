import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================
// DUNE DOMINION GAME ITEMS SCHEMA
// ============================================================

/**
 * Instalaciones (Buildings/Structures)
 */
export const instalaciones = mysqlTable("instalaciones", {
  id: varchar("id", { length: 64 }).primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  descripcion: text("descripcion").notNull(),
  categoria: varchar("categoria", { length: 64 }).notNull(), // ACLIMATACION, EXHIBICION
  tipo: varchar("tipo", { length: 64 }).notNull(),
  rareza: mysqlEnum("rareza", ["legendario", "epico", "raro", "comun"]).notNull(),
  coste: int("coste").notNull(),
  imageUrl: text("imageUrl").notNull(),
  codigo: varchar("codigo", { length: 64 }).notNull().unique(),
  faccion: varchar("faccion", { length: 64 }),
  medio: varchar("medio", { length: 64 }),
  alimentacion: varchar("alimentacion", { length: 64 }),
  stats: json("stats").$type<{
    seguridad: number;
    capacidad: number;
    ingresos: number;
    mantenimiento: number;
  }>().notNull(),
  efectos: json("efectos").$type<string[]>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Instalacion = typeof instalaciones.$inferSelect;
export type InsertInstalacion = typeof instalaciones.$inferInsert;

/**
 * Estructuras de Defensa (Defense Structures)
 */
export const estructurasDefensa = mysqlTable("estructuras_defensa", {
  id: varchar("id", { length: 64 }).primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  descripcion: text("descripcion").notNull(),
  codigo: varchar("codigo", { length: 64 }).notNull().unique(),
  rareza: mysqlEnum("rareza", ["legendario", "epico", "raro", "comun"]).notNull(),
  coste: int("coste").notNull(),
  imageUrl: text("imageUrl").notNull(),
  stats: json("stats").$type<{
    defensa: number;
    durabilidad: number;
  }>().notNull(),
  efectos: json("efectos").$type<string[]>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EstructuraDefensa = typeof estructurasDefensa.$inferSelect;
export type InsertEstructuraDefensa = typeof estructurasDefensa.$inferInsert;

/**
 * Objetos (Items: Potions, Units, Equipment)
 */
export const objetos = mysqlTable("objetos", {
  id: varchar("id", { length: 64 }).primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  descripcion: text("descripcion").notNull(),
  tipo: varchar("tipo", { length: 64 }).notNull(), // POCION, RECLUTA, MERCENARIO
  categoria: varchar("categoria", { length: 64 }).notNull(),
  rareza: mysqlEnum("rareza", ["legendario", "epico", "raro", "comun"]).notNull(),
  coste: int("coste").notNull(),
  cantidad: int("cantidad").notNull().default(1),
  imageUrl: text("imageUrl").notNull(),
  efectos: json("efectos").$type<string[]>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Objeto = typeof objetos.$inferSelect;
export type InsertObjeto = typeof objetos.$inferInsert;

/**
 * Criaturas (Creatures/Beasts)
 */
export const criaturas = mysqlTable("criaturas", {
  id: varchar("id", { length: 64 }).primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  nombreComun: varchar("nombreComun", { length: 255 }).notNull(),
  descripcion: text("descripcion").notNull(),
  especie: varchar("especie", { length: 255 }).notNull(),
  rareza: mysqlEnum("rareza", ["legendario", "epico", "raro", "comun"]).notNull(),
  costeCompra: int("costeCompra").notNull(),
  costeVenta: int("costeVenta").notNull(),
  imageUrl: text("imageUrl").notNull(),
  stats: json("stats").$type<{
    ataque: number;
    defensa: number;
    velocidad: number;
    resistencia: number;
  }>().notNull(),
  habilidades: json("habilidades").$type<string[]>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Criatura = typeof criaturas.$inferSelect;
export type InsertCriatura = typeof criaturas.$inferInsert;
