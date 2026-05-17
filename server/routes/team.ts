import { createTeam, getTeams } from "../controllers/team";

// Route POST /api/team
export async function postTeam(request: Request): Promise<Response> {
	return createTeam(request);
}

// Route GET /api/team
export async function getTeam(): Promise<Response> {
	return getTeams();
}
