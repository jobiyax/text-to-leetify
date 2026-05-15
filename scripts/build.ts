#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";
import plugin from "bun-plugin-tailwind";

// Types des valeurs possibles pour le parsing CLI
type BuildValue =
	| string
	| number
	| boolean
	| string[]
	| Record<string, unknown>;

// Type de configuration final du build
type BuildConfig = Partial<Bun.BuildConfig> & {
	[key: string]: BuildValue | undefined;
};

// Affiche l’aide
if (process.argv.includes("--help")) {
	console.log(`
Bun Build Script

Utilisation : bun run scripts/build.ts [options]

Options :
  --outdir <path>     Dossier de sortie (par défaut : dist)
  --minify            Active la minification
  --sourcemap <type>  none|linked|inline|external
  --target <target>   browser|bun|node
  --external <list>   Packages externes (séparés par des virgules)
  --help, -h          Affiche l’aide
`);
	process.exit(0);
}

// Convertit du kebab-case en camelCase
const toCamelCase = (str: string): string =>
	str.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

// Transforme une valeur CLI en type correct
const parseValue = (value: string): BuildValue => {
	if (value === "true") return true;
	if (value === "false") return false;

	if (/^\d+$/.test(value)) return Number.parseInt(value, 10);
	if (/^\d*\.\d+$/.test(value)) return Number.parseFloat(value);

	if (value.includes(",")) {
		return value.split(",").map((v) => v.trim());
	}

	return value;
};

// Définit des valeurs imbriquées
function setNestedValue(
	obj: Record<string, unknown>,
	key: string,
	value: BuildValue,
) {
	const parts = key.split(".");

	// Cas simple
	if (parts.length === 1) {
		obj[key] = value;
		return;
	}

	const parent = parts[0];
	const child = parts[1];

	if (!parent || !child) return;

	// Crée l'objet parent si nécessaire
	if (
		typeof obj[parent] !== "object" ||
		obj[parent] === null ||
		Array.isArray(obj[parent])
	) {
		obj[parent] = {};
	}

	(obj[parent] as Record<string, unknown>)[child] = value;
}

// Analyse les arguments CLI pour créer la config
function parseArgs(): BuildConfig {
	const config: Record<string, unknown> = {};
	const args = process.argv.slice(2);

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (!arg?.startsWith("--")) continue;

		// Gère les options --no-*
		if (arg.startsWith("--no-")) {
			const key = toCamelCase(arg.slice(5));
			config[key] = false;
			continue;
		}

		// Gère les flags booléens
		if (
			!arg.includes("=") &&
			(i === args.length - 1 || args[i + 1]?.startsWith("--"))
		) {
			const key = toCamelCase(arg.slice(2));
			config[key] = true;
			continue;
		}

		let key = "";
		let value = "";

		// Gère --key=value ou --key value
		if (arg.includes("=")) {
			const split = arg.slice(2).split("=");
			key = split[0] ?? "";
			value = split[1] ?? "";
		} else {
			key = arg.slice(2);
			value = args[++i] ?? "";
		}

		key = toCamelCase(key);
		const parsed = parseValue(value);

		setNestedValue(config, key, parsed);
	}

	return config as BuildConfig;
}

// Formate la taille d’un fichier pour l’affichage
const formatFileSize = (bytes: number): string => {
	const units = ["B", "KB", "MB", "GB"];
	let size = bytes;
	let i = 0;

	while (size >= 1024 && i < units.length - 1) {
		size /= 1024;
		i++;
	}

	return `${size.toFixed(2)} ${units[i]}`;
};

// Démarre le processus de build
console.log("\nDémarrage du build...\n");

// Lecture de la configuration CLI
const cliConfig = parseArgs();

// Définition du dossier de sortie
const outdir =
	(typeof cliConfig.outdir === "string" && cliConfig.outdir) ||
	path.join(process.cwd(), "dist");

// Nettoie l’ancien build si existant
if (existsSync(outdir)) {
	console.log(`Nettoyage du dossier de sortie : ${outdir}`);
	await rm(outdir, { recursive: true, force: true });
}

// Démarrage du timer
const start = performance.now();

// Recherche des fichiers HTML d’entrée
const entrypoints = [...new Bun.Glob("**.html").scanSync("public")]
	.map((file) => path.resolve("public", file))
	.filter((file) => !file.includes("node_modules"));

console.log(`${entrypoints.length} fichier(s) HTML trouvé(s)`);

// Exécution du build Bun
const result = await Bun.build({
	entrypoints,
	outdir,
	plugins: [plugin],
	minify: true,
	target: "browser",
	sourcemap: "linked",
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	...cliConfig,
});

// Fin du timer
const end = performance.now();

// Affichage des résultats
const outputTable = result.outputs.map((output) => ({
	File: path.relative(process.cwd(), output.path),
	Type: output.kind,
	Size: formatFileSize(output.size),
}));

console.table(outputTable);

// Affiche le temps de build
console.log(`\nBuild terminé en ${(end - start).toFixed(2)}ms\n`);
