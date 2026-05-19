import { createEditionHandler } from "./edition.handler";

// Routes du module edition
export const editionRoutes = {
	"/api/editions": {
		POST: createEditionHandler,
	},
};
