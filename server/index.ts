import { serve } from "bun";
import homepage from "../public/index.html";
import { teamRoute } from "./routes/team";
import { teamsRoute } from "./routes/teams";

const server = serve({
	routes: {
		"/api/teams": {
			POST: teamRoute,
			GET: teamsRoute,
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
