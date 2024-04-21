CREATE TABLE `ads` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`type` text DEFAULT 'plain_ad' NOT NULL,
	`position` text DEFAULT 'home_below_header' NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `article_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`reply_to_id` text,
	`article_id` text NOT NULL,
	`author_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `_article_authors` (
	`article_id` text NOT NULL,
	`user_id` text NOT NULL,
	PRIMARY KEY(`article_id`, `user_id`),
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `_article_editors` (
	`article_id` text NOT NULL,
	`user_id` text NOT NULL,
	PRIMARY KEY(`article_id`, `user_id`),
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `_article_topics` (
	`article_id` text NOT NULL,
	`topic_id` text NOT NULL,
	PRIMARY KEY(`article_id`, `topic_id`),
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `article_translations` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`language` text DEFAULT 'id' NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text NOT NULL,
	`meta_title` text,
	`meta_description` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`visibility` text DEFAULT 'public' NOT NULL,
	`article_translation_id` text NOT NULL,
	`featured_image_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`article_translation_id`) REFERENCES `article_translations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`featured_image_id`) REFERENCES `medias`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `download_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`reply_to_id` text,
	`download_id` text NOT NULL,
	`author_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`download_id`) REFERENCES `downloads`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `_download_file_authors` (
	`download_file_id` text NOT NULL,
	`user_id` text NOT NULL,
	PRIMARY KEY(`download_file_id`, `user_id`),
	FOREIGN KEY (`download_file_id`) REFERENCES `download_files`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `download_files` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`meta_title` text,
	`meta_description` text,
	`version` text NOT NULL,
	`download_link` text NOT NULL,
	`file_size` text NOT NULL,
	`currency` text NOT NULL,
	`price` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`featured_image_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`featured_image_id`) REFERENCES `medias`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `_download_authors` (
	`download_id` text NOT NULL,
	`user_id` text NOT NULL,
	PRIMARY KEY(`download_id`, `user_id`),
	FOREIGN KEY (`download_id`) REFERENCES `downloads`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `_download_download_files` (
	`download_id` text NOT NULL,
	`download_file_id` text NOT NULL,
	PRIMARY KEY(`download_file_id`, `download_id`),
	FOREIGN KEY (`download_id`) REFERENCES `downloads`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`download_file_id`) REFERENCES `download_files`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `_download_topics` (
	`download_id` text NOT NULL,
	`topic_id` text NOT NULL,
	PRIMARY KEY(`download_id`, `topic_id`),
	FOREIGN KEY (`download_id`) REFERENCES `downloads`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `download_translations` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `downloads` (
	`id` text PRIMARY KEY NOT NULL,
	`language` text DEFAULT 'id' NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text NOT NULL,
	`meta_title` text,
	`meta_description` text,
	`developer` text NOT NULL,
	`operating_system` text NOT NULL,
	`license` text NOT NULL,
	`official_website` text NOT NULL,
	`schema_type` text NOT NULL,
	`type` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`download_translation_id` text NOT NULL,
	`featured_image_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`download_translation_id`) REFERENCES `download_translations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`featured_image_id`) REFERENCES `medias`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `gadgets` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`wp_tag_slug` text,
	`wp_category_slug` text,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`network_technology` text,
	`launch_announced` text,
	`launch_status` text,
	`body_dimensions` text,
	`body_weight` text,
	`body_sim_card` text,
	`display_type` text,
	`display_size` text,
	`display_resolution` text,
	`platform_os` text,
	`platform_chipset` text,
	`platform_cpu` text,
	`platform_gpu` text,
	`memory_card_slot` text,
	`memory_internal` text,
	`main_camera` text,
	`main_camera_features` text,
	`main_camera_video` text,
	`selfie_camera` text,
	`selfie_camera_video` text,
	`sound_loudspeaker` text,
	`sound_35mm_jack` integer,
	`comms_wlan` text,
	`coms_bluetooth` text,
	`coms_positioning` text,
	`comms_nfc` text,
	`comms_radio` integer,
	`comms_usb` text,
	`features_sensors` text,
	`battery_type` text,
	`battery_charging` text,
	`misc_colors` text,
	`misc_models` text,
	`misc_sar` text,
	`misc_sar_eu` text,
	`misc_price` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`meta_title` text,
	`meta_description` text,
	`featured_image_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`featured_image_id`) REFERENCES `medias`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medias` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`author_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `menus` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`link` text,
	`position` text DEFAULT 'sidebar_all' NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`icon` text,
	`icon_dark` text,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `top_up_order_counters` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `top_up_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`invoice_id` text NOT NULL,
	`amount` integer NOT NULL,
	`sku` text NOT NULL,
	`account_id` text NOT NULL,
	`customer_name` text,
	`customer_email` text,
	`customer_phone` text NOT NULL,
	`voucher_code` text,
	`discount_amount` integer DEFAULT 0,
	`fee_amount` integer NOT NULL,
	`total_amount` integer NOT NULL,
	`note` text,
	`payment_method` text NOT NULL,
	`payment_status` text DEFAULT 'unpaid' NOT NULL,
	`status` text DEFAULT 'processing' NOT NULL,
	`top_up_provider` text NOT NULL,
	`payment_provider` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `topic_translations` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` text PRIMARY KEY NOT NULL,
	`language` text DEFAULT 'id' NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`type` text DEFAULT 'all' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`visibility` text DEFAULT 'public' NOT NULL,
	`meta_title` text,
	`meta_description` text,
	`topic_translation_id` text NOT NULL,
	`featured_image_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`topic_translation_id`) REFERENCES `topic_translations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`featured_image_id`) REFERENCES `medias`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_links` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`provider` text NOT NULL,
	`provider_account_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text,
	`name` text,
	`username` text,
	`image` text,
	`phone_number` text,
	`about` text,
	`role` text DEFAULT 'user',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `video_embed_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`reply_to_id` text,
	`video_embed_id` text NOT NULL,
	`author_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`video_embed_id`) REFERENCES `video_embeds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `_video_embed_authors` (
	`video_embed_id` text NOT NULL,
	`user_id` text NOT NULL,
	PRIMARY KEY(`user_id`, `video_embed_id`),
	FOREIGN KEY (`video_embed_id`) REFERENCES `video_embeds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `_video_embed_topics` (
	`video_embed_id` text NOT NULL,
	`topic_id` text NOT NULL,
	PRIMARY KEY(`topic_id`, `video_embed_id`),
	FOREIGN KEY (`video_embed_id`) REFERENCES `video_embeds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `video_embeds` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`embed_link` text NOT NULL,
	`meta_title` text,
	`meta_description` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`featured_image_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`featured_image_id`) REFERENCES `medias`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `vouchers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`voucher_code` text NOT NULL,
	`discount_percentage` integer NOT NULL,
	`discount_max` integer NOT NULL,
	`voucher_amount` integer NOT NULL,
	`description` text,
	`expiration_date` text,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `wp_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`wp_post_slug` text NOT NULL,
	`reply_to_id` text,
	`author_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wp_popular_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text NOT NULL,
	`language` text DEFAULT 'id' NOT NULL,
	`published_time` text NOT NULL,
	`thumbail` text NOT NULL,
	`primary_category` text NOT NULL,
	`primary_category_slug` text NOT NULL,
	`author_name` text NOT NULL,
	`author_slug` text NOT NULL,
	`author_image` text NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ads_title_unique` ON `ads` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `articles_slug_unique` ON `articles` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `download_files_title_unique` ON `download_files` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `download_files_slug_unique` ON `download_files` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `downloads_slug_unique` ON `downloads` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `gadgets_title_unique` ON `gadgets` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `gadgets_slug_unique` ON `gadgets` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `menus_title_unique` ON `menus` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `settings_key_unique` ON `settings` (`key`);--> statement-breakpoint
CREATE UNIQUE INDEX `top_up_order_counters_key_unique` ON `top_up_order_counters` (`key`);--> statement-breakpoint
CREATE UNIQUE INDEX `top_up_orders_invoice_id_unique` ON `top_up_orders` (`invoice_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `topics_slug_unique` ON `topics` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_provider_account_id_unique` ON `accounts` (`provider_account_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `video_embeds_slug_unique` ON `video_embeds` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `vouchers_name_unique` ON `vouchers` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `vouchers_voucher_code_unique` ON `vouchers` (`voucher_code`);--> statement-breakpoint
CREATE UNIQUE INDEX `wp_popular_posts_title_unique` ON `wp_popular_posts` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `wp_popular_posts_slug_unique` ON `wp_popular_posts` (`slug`);