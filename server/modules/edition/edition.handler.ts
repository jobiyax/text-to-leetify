import { createEditionService } from "./edition.service";

import {
	type CreateEditionInput,
	createEditionSchema,
} from "./edition.validator";

// Création d'une édition
export const createEditionHandler = async (req: Request): Promise<Response> => {
	try {
		// Body request
		const body = await req.json();

		// Validation Zod
		const result = createEditionSchema.safeParse(body);

		if (!result.success) {
			return Response.json(
				{
					success: false,
					errors: result.error.issues,
				},
				{ status: 400 },
			);
		}

		const data: CreateEditionInput = result.data;

		// Service
		const insertedEdition = await createEditionService(data);

		// Succès
		return Response.json(
			{
				success: true,
				data: insertedEdition[0],
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error(error);

		return Response.json(
			{
				success: false,
				message: "Erreur serveur",
			},
			{ status: 500 },
		);
	}
};
