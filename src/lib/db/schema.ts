import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  status: text('status', { enum: ['draft', 'creating', 'active', 'error'] }).notNull().default('draft'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const projectServices = sqliteTable('project_services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  serviceId: text('service_id').notNull(), // ID from Codesphere API
  providerName: text('provider_name').notNull(),
  providerVersion: text('provider_version').notNull(),
  createdAt: text('created_at').notNull(),
});

// Types
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectService = typeof projectServices.$inferSelect;
export type NewProjectService = typeof projectServices.$inferInsert;
