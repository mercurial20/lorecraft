import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const worlds = pgTable("world", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  genreIds: uuid("genre_ids").array().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
