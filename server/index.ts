import { serve } from "bun";
import homepage from "../public/index.html";
import { competitionRoutes } from "./modules/competition/competition.route";
import { teamRoutes } from "./modules/team/team.route";

const server = serve({
	routes: {
		// Route pour servir le frontend
		"/*": homepage,

		// Routes API
		...teamRoutes,
		...competitionRoutes,
	},

	// Configuration pour le mode développement
	development: process.env.NODE_ENV !== "production" && {
		hmr: true, // rechargement automatique
		console: true,
	},
});

console.log(`Serveur fonctionnant sur ${server.url}`);
