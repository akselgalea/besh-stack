import { sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").unique().notNull(),
  emailVerifiedAt: integer("email_verified_at", { mode: 'timestamp' }),
  password: text("password").notNull(),
  profilePicture: text("profile_picture").default('/public/images/profile-pictures/default.svg'),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  deletedAt: integer("deleted_at", { mode: 'timestamp' })
})

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status", { enum: ['pending', 'done'] }).notNull().default('pending'),
  repeat: text("repeat", { enum: ['no', 'daily', 'weekly', 'monthly'] }),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: 'timestamp' }),
  deletedAt: integer("updated_at", { mode: 'timestamp' })
})

export const taskRecords = sqliteTable("task_records", {
  id: integer("id").primaryKey(),
  status: text("status", { enum: ['pending', 'done'] }).notNull(),
  date: integer("date", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  taskId: integer("taskId").references(() => tasks.id)
})