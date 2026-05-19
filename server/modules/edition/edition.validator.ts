import { z } from "zod";

// Validation création édition
export const createEditionSchema = z.object({
	competitionId: z
		.number({ message: "L'id de la compétition est requis" })
		.int()
		.positive(),

	number: z
		.number({ message: "Le numéro d'édition est requis" })
		.int()
		.positive(),
});

// Type TypeScript
export type CreateEditionInput = z.infer<typeof createEditionSchema>;
