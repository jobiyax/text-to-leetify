import { getTeams } from "../controllers/teams";

export async function teamsRoute() {
	return getTeams();
}
