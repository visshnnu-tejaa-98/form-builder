CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"password" text,
	"profile_image_url" text,
	"verification_token" text,
	"refresh_token" text,
	"reset_token" text,
	"reset_token_expires" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
