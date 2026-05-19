import {
	addTeamsToEditionHandler,
	getEditionTeamsHandler,
} from "./participation.handler";

// Routes du module participation
export const participationRoutes = {
	"/api/participations": {
		POST: addTeamsToEditionHandler,
	},

	// Route pour récupérer les équipes d'une édition
	"/api/participations/teams": {
		GET: getEditionTeamsHandler,
	},
};
