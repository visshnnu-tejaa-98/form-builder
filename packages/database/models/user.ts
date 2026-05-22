import { date } from "drizzle-orm/pg-core";
import { pgTable, uuid, varchar, timestamp, boolean, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }),

  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),

  password: text("password"),

  profileImageUrl: text("profile_image_url"),

  verificationToken: text("verification_token"),
  refreshToken: text("refresh_token"),
  resetToken: text("reset_token"),
  resetTokenExpires: date("reset_token_expires"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
