import { z } from "zod";

// Validation des données de création
export const createCompetitionSchema = z.object({
	name: z
		.string()
		.min(3, "Le nom doit contenir au moins 3 caractères")
		.max(50, "Le nom ne doit pas dépasser 50 caractères"),

	logoUrl: z.string().url("Logo invalide").optional(),
});

// Type TypeScript automatique
export type CreateCompetitionInput = z.infer<typeof createCompetitionSchema>;
