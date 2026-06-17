import { boolean } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const worlds = pgTable("world", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  genreIds: uuid("genre_ids").array().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const llmCredentials = pgTable("llm_credential", {
  id: uuid("id").primaryKey().defaultRandom(),
  provider: text("provider").notNull(),
  label: text("label").notNull(),
  baseUrl: text("base_url"),
  encryptedToken: text("encrypted_token").notNull(),
  iv: text("iv").notNull(),
  authTag: text("auth_tag").notNull(),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  lastVerifiedAt: timestamp("last_verified_at"),
});
