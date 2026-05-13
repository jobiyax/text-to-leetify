#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";

const outdir = path.join(process.cwd(), "dist");

console.log("Build en cours...\n");

// Supprime l'ancien build si existe
if (existsSync(outdir)) {
	console.log("Suppression de l'ancien build...");
	await rm(outdir, { recursive: true, force: true });
}

// Point d'entrée du build
const entrypoints = ["./public/index.html"];

console.log("Compilation avec Bun...\n");

// Build Bun
const result = await Bun.build({
	entrypoints,
	outdir,
	target: "browser",

	minify: true,
	sourcemap: "linked",
	splitting: true,

	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
});

// Erreur build
if (!result.success) {
	console.error("Build échoué");

	for (const msg of result.logs) {
		console.error(msg);
	}

	process.exit(1);
}

// Tableau des fichiers générés
const filesTable = result.outputs.map((file) => ({
	file: file.path,
	type: file.kind ?? "unknown",
}));

console.log("\nFichiers générés :\n");
console.table(filesTable);

console.log("\nBuild terminé avec succès\n");
