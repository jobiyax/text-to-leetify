import {
	addTeamsToEditionService,
	getEditionTeamsService,
} from "./participation.service";

import {
	type AddTeamsToEditionInput,
	addTeamsToEditionSchema,
} from "./participation.validator";

// Ajoute des équipes dans une édition
export const addTeamsToEditionHandler = async (
	req: Request,
): Promise<Response> => {
	try {
		// Body request
		const body = await req.json();

		// Validation Zod
		const result = addTeamsToEditionSchema.safeParse(body);

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

		const data: AddTeamsToEditionInput = result.data;

		// Appel du service
		const insertedParticipations = await addTeamsToEditionService(data);

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

// Affiche les équipes d'une édition
export const getEditionTeamsHandler = async (
	req: Request,
): Promise<Response> => {
	try {
		// Récupère l'id depuis l'URL
		const url = new URL(req.url);

		const editionId = Number(url.searchParams.get("editionId"));

		// Vérifie l'id
		if (!editionId || Number.isNaN(editionId)) {
			return Response.json(
				{
					success: false,
					message: "editionId invalide",
				},
				{
					status: 400,
				},
			);
		}

		// Appel du service
		const teams = await getEditionTeamsService(editionId);

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
