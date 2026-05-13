import { serve } from "bun";
import homepage from "../public/index.html";
import { addTeam } from "./routes/add-team";
import { getTeams } from "./routes/get-team";

const server = serve({
	routes: {
		"/api/add-team": {
			POST: addTeam,
		},
		"/api/get-teams": {
			GET: getTeams,
		},

		"/*": homepage, // sert le frontend
	},

	// Configuration pour le mode développement
	development: process.env.NODE_ENV !== "production" && {
		hmr: true, // rechargement automatique
		console: true,
	},
});

console.log(`Serveur fonctionnant sur ${server.url}`);
