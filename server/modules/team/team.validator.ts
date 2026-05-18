import { z } from "zod";

// Validation des données de création
export const createTeamSchema = z.object({
	name: z
		.string()
		.min(3, "Le nom doit contenir au moins 3 caractères")
		.max(30, "Le nom ne doit pas dépasser 30 caractères"),

	logoUrl: z.string().url("Logo invalide").optional(),
});

// Type TypeScript automatique
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
