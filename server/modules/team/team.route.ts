import { createTeamHandler, getTeamsHandler } from "./team.handler";

// Routes du module team
export const teamRoutes = {
	"/api/teams": {
		GET: getTeamsHandler,
		POST: createTeamHandler,
	},
};
