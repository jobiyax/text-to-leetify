import { serve } from "bun";
import homepage from "../public/index.html";
import { postTeam } from "./routes/team";

const server = serve({
	routes: {
		"/*": homepage, // sert le frontend

		"/api/team": {
			POST: postTeam,
		},
	},

	// Configuration pour le mode développement
	development: process.env.NODE_ENV !== "production" && {
		hmr: true, // rechargement automatique
		console: true,
	},
});

console.log(`Serveur fonctionnant sur ${server.url}`);
