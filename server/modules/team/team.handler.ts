import { createTeamService, getTeamsService } from "./team.service";
import { type CreateTeamInput, createTeamSchema } from "./team.validator";

export const createTeamHandler = async (req: Request): Promise<Response> => {
	try {
		// Body request
		const body = await req.json();

		// Validation Zod
		const result = createTeamSchema.safeParse(body);

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

		const data: CreateTeamInput = result.data;

		// Appel du service
		const insertedTeam = await createTeamService(data);

		// Vérifie si déjà existante
		if (insertedTeam.length === 0) {
			return Response.json(
				{
					success: false,
					message: "Cette équipe existe déjà",
				},
				{
					status: 409,
				},
			);
		}

		// Succès
		return Response.json(
			{
				success: true,
				data: insertedTeam[0],
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

// Récupère toutes les équipes
export const getTeamsHandler = async (): Promise<Response> => {
	try {
		// Appel du service
		const teams = await getTeamsService();

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
