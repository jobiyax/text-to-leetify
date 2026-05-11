import { serve } from "bun";
import homepage from "../public/index.html";
import { addTeam } from "./routes/v1/add-team";
import { getTeams } from "./routes/v1/get-teams";

const server = serve({
	routes: {
		"/api/v1/add-team": addTeam,
		"/api/v1/teams": getTeams,

		// Sert le frontend pour toutes les autres routes
		"/*": homepage,
	},

	// Configuration pour le mode développement
	development: process.env.NODE_ENV !== "production" && {
		hmr: true, // rechargement automatique
		console: true,
	},
});

console.log(`Serveur fonctionnant sur ${server.url}`);
