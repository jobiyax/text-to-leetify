import { createTeam } from "../controllers/team";

// Route POST /api/team
export async function postTeam(request: Request): Promise<Response> {
	return createTeam(request);
}
