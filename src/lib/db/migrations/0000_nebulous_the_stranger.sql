CREATE TABLE `active_sessions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`is_active` boolean DEFAULT true,
	`last_active_at` timestamp DEFAULT (now()),
	CONSTRAINT `active_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trivia_questions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`question` varchar(500),
	`answer` varchar(500),
	`wrong_answers` json,
	`category` varchar(120),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `trivia_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_scores` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`score` int,
	`played_at` timestamp DEFAULT (now()),
	CONSTRAINT `user_scores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`first_name` varchar(120),
	`last_name` varchar(120),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_first_name_last_name_unique` UNIQUE(`first_name`,`last_name`)
);
