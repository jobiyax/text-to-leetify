import {
	addTeamsToCompetitionService,
	getCompetitionTeamsService,
} from "./participation.service";

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

// Affiche les équipes d'une compétition
export const getCompetitionTeamsHandler = async (
	req: Request,
): Promise<Response> => {
	try {
		// Récupère l'id depuis l'URL
		const url = new URL(req.url);

		const competitionId = Number(url.searchParams.get("competitionId"));

		// Vérifie l'id
		if (!competitionId || Number.isNaN(competitionId)) {
			return Response.json(
				{
					success: false,
					message: "competitionId invalide",
				},
				{
					status: 400,
				},
			);
		}

		// Appel du service
		const teams = await getCompetitionTeamsService(competitionId);

		// Succès
		return Response.json(
			{
				success: true,
				data: teams,
			},
			{
				status: 200,
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
