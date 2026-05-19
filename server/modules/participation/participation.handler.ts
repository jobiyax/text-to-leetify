import { addTeamsToCompetitionService } from "./participation.service";

import {
	type AddTeamsToCompetitionInput,
	addTeamsToCompetitionSchema,
} from "./participation.validator";

// Ajoute des équipes dans une compétition
export const addTeamsToCompetitionHandler = async (
	req: Request,
): Promise<Response> => {
	try {
		// Body request
		const body = await req.json();

		// Validation Zod
		const result = addTeamsToCompetitionSchema.safeParse(body);

		// Vérifie les erreurs
		if (!result.success) {
			return Response.json(
				{
					success: false,
					errors: result.error.issues,
				},
				{
					status: 400,
				},
			);
		}

		const data: AddTeamsToCompetitionInput = result.data;

		// Appel du service
		const insertedParticipations = await addTeamsToCompetitionService(data);

		// Succès
		return Response.json(
			{
				success: true,
				data: insertedParticipations,
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		console.error(error);

		return Response.json(
			{
				success: false,
				message: "Erreur serveur",
			},
			{
				status: 500,
			},
		);
	}
};
