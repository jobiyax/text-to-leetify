import { createCompetitionHandler } from "./competition.handler";

// Routes du module competition
export const competitionRoutes = {
	"/api/competitions": {
		POST: createCompetitionHandler,
	},
};
