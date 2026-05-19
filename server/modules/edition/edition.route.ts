import { createEditionHandler, getEditionsHandler } from "./edition.handler";

// Routes du module edition
export const editionRoutes = {
	"/api/editions": {
		GET: getEditionsHandler,
		POST: createEditionHandler,
	},
};
