import { serve } from "bun";
import homepage from "../public/index.html";
import { addTeam } from "./routes/add-team";

const server = serve({
	routes: {
		"/api/add-team": {
			POST: addTeam,
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
