import { createTeamHandler } from "./team.handler";

// Routes du module team
export const teamRoutes = {
	"/api/teams": {
		POST: createTeamHandler,
	},
};
