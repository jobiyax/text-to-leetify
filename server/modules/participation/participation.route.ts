import {
	addTeamsToCompetitionHandler,
	getCompetitionTeamsHandler,
} from "./participation.handler";

// Routes du module participation
export const participationRoutes = {
	"/api/participations": {
		POST: addTeamsToCompetitionHandler,
	},

	// Route pour récupérer les équipes d'une compétition
	"/api/participations/teams": {
		GET: getCompetitionTeamsHandler,
	},
};
