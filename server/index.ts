import { serve } from "bun";
import homepage from "../public/index.html";

const server = serve({
	routes: {
		"/*": homepage, // sert le frontend
	},

	// Configuration pour le mode développement
	development: process.env.NODE_ENV !== "production" && {
		hmr: true, // rechargement automatique
		console: true,
	},
});

console.log(`Serveur fonctionnant sur ${server.url}`);
