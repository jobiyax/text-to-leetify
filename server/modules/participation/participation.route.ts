import { addTeamsToCompetitionHandler } from "./participation.handler";

// Routes du module participation
export const participationRoutes = {
	"/api/participations": {
		POST: addTeamsToCompetitionHandler,
	},
};
