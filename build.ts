#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";
import plugin from "bun-plugin-tailwind";

const outdir = path.join(process.cwd(), "dist");

console.log("Build en cours...\n");

// Nettoyage du dossier dist
if (existsSync(outdir)) {
	console.log("Suppression de l'ancien build...");
	await rm(outdir, { recursive: true, force: true });
}

// Fichier d'entrée principal
const entrypoints = ["./public/index.html"];

// Lancement du build
const result = await Bun.build({
	entrypoints,
	outdir,
	target: "browser",

	plugins: [plugin], // plugin

	minify: true, // réduit la taille du code
	sourcemap: "linked",
	splitting: true,

	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
});

// Vérifie si le build a échoué
if (!result.success) {
	console.error("Build échoué");
	process.exit(1);
}

// Affiche les fichiers générés
console.log("\nFichiers générés :\n");

for (const file of result.outputs) {
	console.log(file.path);
}

console.log("\nBuild terminé avec succès\n");
