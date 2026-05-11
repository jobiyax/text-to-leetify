CREATE TABLE "team" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo_url" text,
	"created_at" timestamp DEFAULT now()
);
