import {
  integer,
  numeric,
  pgTable,
  text,
  varchar,
} from "npm:drizzle-orm/pg-core";

export const friendTable = pgTable("friend", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  image: varchar("image").notNull(),
});

export type SelectFriend = typeof friendTable.$inferSelect;

export const itemTable = pgTable("item", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  price: numeric("price").notNull(),
  description: varchar("description").notNull(),
  rating: numeric("rating").notNull(),
  image: varchar("image").notNull(),
  about: text("about").array().notNull(),
  categories: text("categories").array().notNull(),
});

export type SelectItem = typeof itemTable.$inferSelect;