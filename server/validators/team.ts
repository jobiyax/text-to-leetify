import { z } from "zod";

// Validation création équipe
export const createTeamSchema = z.object({
	name: z.string().trim().min(1, "Le nom est requis").max(255),

	logoUrl: z.string().trim().url("URL invalide").optional(),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
