import { serve } from "bun";
import homepage from "../public/index.html";
import { teamRoutes } from "./modules/team/team.route";

const server = serve({
	routes: {
		"/*": homepage, // sert le frontend
		...teamRoutes, // ajoute les routes de l'API
	},

	// Configuration pour le mode développement
	development: process.env.NODE_ENV !== "production" && {
		hmr: true, // rechargement automatique
		console: true,
	},
});

console.log(`Serveur fonctionnant sur ${server.url}`);
