#!/bin/bash

set -euo pipefail

clear

echo "======================================="
echo "             🔐 PASSFORGE"
echo "======================================="
echo ""

# Chargement de la config
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/charset.conf"

if [[ ! -f "$CONFIG_FILE" ]]; then
	echo "❌ Fichier de configuration introuvable : $CONFIG_FILE"
	exit 1
fi

# shellcheck source=./charset.conf
# shellcheck disable=SC1091
source "$CONFIG_FILE"

# Vérification des variables importées
: "${LOWERCASE:?}"
: "${UPPERCASE:?}"
: "${NUMBERS:?}"
: "${SYMBOLS:?}"

# Longueur du mot de passe
read -r -p "👉 Nombre de caractères (8-64) : " length

if [[ ! "$length" =~ ^[0-9]+$ ]]; then
	echo "❌ Veuillez entrer un nombre valide"
	exit 1
fi

if ((length < 8 || length > 64)); then
	echo "❌ Longueur invalide (8-64 seulement)"
	exit 1
fi

# Options
read -r -p "👉 Inclure MAJUSCULES ? (y/n) : " upper
read -r -p "👉 Inclure CHIFFRES ? (y/n) : " numbers
read -r -p "👉 Inclure SYMBOLES ? (y/n) : " symbols

# Construction du charset
charset="$LOWERCASE"

[[ "$upper" == "y" ]] && charset+="$UPPERCASE"
[[ "$numbers" == "y" ]] && charset+="$NUMBERS"
[[ "$symbols" == "y" ]] && charset+="$SYMBOLS"

# Eviter charset vide
if [[ -z "$charset" ]]; then
	echo "❌ Aucun jeu de caractères sélectionné"
	exit 1
fi

# Génération
password="$(LC_ALL=C tr -dc "$charset" </dev/urandom | head -c "$length" || true)"

echo ""
echo "🔑 Mot de passe généré : $password"

# Analyse de force
strength="FAIBLE"

if [[ "$length" -ge 12 ]]; then
	strength="MOYEN"
fi

if [[ "$length" -ge 16 && "$upper" == "y" && "$numbers" == "y" && "$symbols" == "y" ]]; then
	strength="FORT"
fi

echo "📊 Niveau de sécurité : $strength"
echo ""

read -r -p "💾 Sauvegarder dans le coffre ? (y/n) : " save

if [[ "$save" == "y" ]]; then

	# Dossier de stockage sécurisé
	VAULT_DIR="${VAULT_DIR:-$SCRIPT_DIR/vault}"
	mkdir -p "$VAULT_DIR"

	# Nom de fichier par défaut
	FILE_NAME="passwords.txt"

	read -r -p "👉 Nom du fichier (default: passwords.txt) : " custom_file

	# Si l'utilisateur donne un nom
	if [[ -n "${custom_file:-}" ]]; then
		FILE_NAME="$custom_file"
	fi

	# Eviter nom vide + espaces
	FILE_NAME="${FILE_NAME// /_}"
	FILE_NAME="${FILE_NAME:-passwords.txt}"

	# Chemin final
	FILE_PATH="$VAULT_DIR/$FILE_NAME"

	# Sauvegarde
	echo "$password" >>"$FILE_PATH"

	echo "✅ Mot de passe sauvegardé dans : $FILE_PATH"
fi

echo ""
