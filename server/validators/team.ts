import { z } from "zod";

// Validation création équipe
export const createTeamSchema = z.object({
	name: z.string().min(2, "Nom trop court").max(255),

	logoUrl: z.string().url("URL invalide").optional(),
});

// Type inféré automatiquement
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
