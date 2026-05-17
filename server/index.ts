import { serve } from "bun";
import homepage from "../public/index.html";
import { getTeam, postTeam } from "./routes/team";

const server = serve({
	routes: {
		"/*": homepage, // sert le frontend

		"/api/team": { POST: postTeam, GET: getTeam },
	},

	// Configuration pour le mode développement
	development: process.env.NODE_ENV !== "production" && {
		hmr: true, // rechargement automatique
		console: true,
	},
});

console.log(`Serveur fonctionnant sur ${server.url}`);
