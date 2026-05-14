import { createTeam } from "../controllers/team";

export async function teamRoute(req: Request) {
	return createTeam(req);
}
