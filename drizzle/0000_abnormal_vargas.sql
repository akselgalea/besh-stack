CREATE TABLE `task_records` (
	`id` integer PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`date` integer DEFAULT (unixepoch()) NOT NULL,
	`taskId` integer,
	FOREIGN KEY (`taskId`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`repeat` text,
	`user_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`lastname` text NOT NULL,
	`email` text,
	`email_verified_at` integer,
	`password` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);