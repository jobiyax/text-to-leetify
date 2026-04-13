#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT_DIR="$SCRIPT_DIR/vault"

mkdir -p "$VAULT_DIR"

# Lister les fichiers
list_vault() {
	echo "📁 Contenu du coffre :"
	ls -1 "$VAULT_DIR"
}

# Rechercher un fichier
search_vault() {
	read -r -p "🔎 Rechercher un fichier ? (nom) : " search

	if [[ -n "${search:-}" ]]; then
		echo "🔍 Résultat :"
		find "$VAULT_DIR" -type f -name "*$search*"
	fi
}

# Lire un fichier
read_vault() {
	read -r -p "📖 Nom du fichier à lire : " file

	FILE_PATH="$VAULT_DIR/$file"

	if [[ -f "$FILE_PATH" ]]; then
		echo "📄 Contenu de $file :"
		cat "$FILE_PATH"
	else
		echo "❌ Fichier introuvable"
	fi
}
