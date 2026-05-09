import { serve } from "bun";
import homepage from "../public/index.html";

const server = serve({
	routes: {
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
