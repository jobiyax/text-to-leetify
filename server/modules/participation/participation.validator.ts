import { z } from "zod";

// Validation des données de participation
export const addTeamsToCompetitionSchema = z.object({
	competitionId: z
		.number({
			message: "L'identifiant de la compétition est requis",
		})
		.int("L'identifiant de la compétition doit être un entier")
		.positive("L'identifiant de la compétition doit être positif"),

	teamIds: z
		.array(
			z
				.number({
					message: "L'identifiant de l'équipe est requis",
				})
				.int("L'identifiant de l'équipe doit être un entier")
				.positive("L'identifiant de l'équipe doit être positif"),
		)
		.min(1, {
			message: "Au moins une équipe est requise",
		}),
});

// Type TypeScript automatique
export type AddTeamsToCompetitionInput = z.infer<
	typeof addTeamsToCompetitionSchema
>;
