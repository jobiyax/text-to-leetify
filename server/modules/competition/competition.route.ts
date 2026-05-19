import {
	createCompetitionHandler,
	getCompetitionsHandler,
} from "./competition.handler";

// Routes du module competition
export const competitionRoutes = {
	"/api/competitions": {
		GET: getCompetitionsHandler,
		POST: createCompetitionHandler,
	},
};
